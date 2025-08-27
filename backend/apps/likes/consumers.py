import json
import sys
from urllib.parse import parse_qs

from asgiref.sync import sync_to_async
from channels.generic.websocket import (
    AsyncJsonWebsocketConsumer,
    AsyncWebsocketConsumer,
)
from django.contrib.auth.models import AnonymousUser
from django.db.models import Count, Q
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Like


def counts_for_sync(slug: str):
    agg = Like.objects.filter(page_slug=slug).aggregate(
        likes=Count("id", filter=Q(is_like=True)),
        dislikes=Count("id", filter=Q(is_like=False)),
    )
    return {"likes": agg["likes"] or 0, "dislikes": agg["dislikes"] or 0}


class LikeConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.page_slug = self.scope["url_route"]["kwargs"]["page_slug"]
        self.group_name = f"likes-{self.page_slug}"

        user = self.scope["user"]
        print(
            f"[DEBUG] WebSocket connect: page_slug={self.page_slug}, user={user} (authenticated: {user.is_authenticated})"
        )

        if not user.is_authenticated:
            print("[DEBUG] Closing WebSocket: user not authenticated")
            await self.close(code=4401)
            return

        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

        counts = await sync_to_async(counts_for_sync)(self.page_slug)
        await self.send_json({"type": "init", "page_slug": self.page_slug, **counts})

    async def disconnect(self, code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)
        print(f"[DEBUG] WebSocket disconnect: code={code}")

    async def receive_json(self, content, **kwargs):
        action = content.get("action")
        if action not in ("like", "dislike"):
            await self.send_json(
                {"type": "error", "detail": "action must be like|dislike"}
            )
            return

        user = self.scope.get("user")
        if not getattr(user, "is_authenticated", False):
            await self.send_json({"type": "error", "detail": "auth required"})
            return

        from django.db import transaction

        is_like = action == "like"

        @sync_to_async
        def toggle():
            with transaction.atomic():
                obj, created = Like.objects.select_for_update().get_or_create(
                    user=user, page_slug=self.page_slug, defaults={"is_like": is_like}
                )
                if not created:
                    if obj.is_like == is_like:
                        obj.delete()
                    else:
                        obj.is_like = is_like
                        obj.save()
            return counts_for_sync(self.page_slug)

        counts = await toggle()
        await self.channel_layer.group_send(
            self.group_name, {"type": "likes.update", **counts}
        )

    async def likes_update(self, event):
        await self.send_json(
            {"type": "update", "likes": event["likes"], "dislikes": event["dislikes"]}
        )

    @sync_to_async
    def _authenticate(self, token):
        try:
            from django.contrib.auth import get_user_model
            from django.contrib.auth.models import AnonymousUser
            from rest_framework_simplejwt.tokens import AccessToken

            User = get_user_model()

            access_token = AccessToken(token)
            user_id = access_token["user_id"]

            try:
                user = User.objects.get(id=user_id)
                return user
            except User.DoesNotExist:
                print(f"[DEBUG] User with id {user_id} does not exist")
                return AnonymousUser()

        except Exception as e:
            print(f"[DEBUG] JWT authentication failed: {e}")
            return AnonymousUser()
