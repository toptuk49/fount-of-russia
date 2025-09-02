from django.db import transaction
from django.db.models import Count, Q
from rest_framework import permissions, status, views
from rest_framework.response import Response

from .models import Like
from .serializers import LikeStateSerializer


def counts_for(slug: str):
    agg = Like.objects.filter(page_slug=slug).aggregate(
        likes=Count("id", filter=Q(is_like=True)),
        dislikes=Count("id", filter=Q(is_like=False)),
    )
    return {"likes": agg["likes"] or 0, "dislikes": agg["dislikes"] or 0}


class LikeDetailView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, page_slug: str):
        c = counts_for(page_slug)
        my_vote = None
        if request.user.is_authenticated:
            vote = Like.objects.filter(user=request.user, page_slug=page_slug).first()
            if vote is not None:
                my_vote = "like" if vote.is_like else "dislike"
        data = {"page_slug": page_slug, **c, "my_vote": my_vote}
        return Response(data)

    def post(self, request, page_slug: str):
        if not request.user.is_authenticated:
            return Response(
                {"detail": "Authentication required"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        action = (request.data or {}).get("action")
        if action not in ("like", "dislike"):
            return Response(
                {"detail": "action must be like|dislike"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        is_like = action == "like"
        with transaction.atomic():
            obj, created = Like.objects.select_for_update().get_or_create(
                user=request.user, page_slug=page_slug, defaults={"is_like": is_like}
            )
            if not created:
                if obj.is_like == is_like:
                    obj.delete()
                else:
                    obj.is_like = is_like
                    obj.save()
        c = counts_for(page_slug)
        my_vote = None
        vote = Like.objects.filter(user=request.user, page_slug=page_slug).first()
        if vote is not None:
            my_vote = "like" if vote.is_like else "dislike"
        from asgiref.sync import async_to_sync
        from channels.layers import get_channel_layer

        async_to_sync(get_channel_layer().group_send)(
            f"likes-{page_slug}", {"type": "likes.update", **c}
        )
        return Response({"page_slug": page_slug, **c, "my_vote": my_vote})
