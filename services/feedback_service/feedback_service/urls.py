from django.http import JsonResponse
from django.urls import include, path


def health(_):
    return JsonResponse({"ok": True})


urlpatterns = [
    path("health/", health),
    path("api/contacts/", include("apps.feedback.urls")),
]
