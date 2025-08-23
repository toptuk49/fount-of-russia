from django.urls import path
from .views import LikeDetailView
urlpatterns = [ path("likes/<slug:page_slug>/", LikeDetailView.as_view(), name="likes-detail") ]