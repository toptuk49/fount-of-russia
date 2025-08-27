from rest_framework import serializers


class LikeStateSerializer(serializers.Serializer):
    page_slug = serializers.CharField()
    likes = serializers.IntegerField()
    dislikes = serializers.IntegerField()
    my_vote = serializers.ChoiceField(
        choices=["like", "dislike", None], allow_null=True
    )
