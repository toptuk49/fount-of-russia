from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r"ws/likes/(?P<page_slug>[-\w]+)/$", consumers.LikeConsumer.as_asgi()),
]
