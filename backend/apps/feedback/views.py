import requests
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import ContactSerializer


class ContactView(APIView):
    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        data = serializer.validated_data
        token = settings.TELEGRAM_BOT_TOKEN
        chat_id = settings.TELEGRAM_CHAT_ID
        if not token or not chat_id:
            return Response(
                {"detail": "Telegram is not configured on server (.env)."}, status=500
            )
        text = f"✉️ Новое сообщение с сайта\n\nИмя: {data['name']}\nEmail: {data['email']}\n\n{data['message']}"
        try:
            resp = requests.post(
                f"https://api.telegram.org/bot{token}/sendMessage",
                json={"chat_id": chat_id, "text": text},
                timeout=10,
            )
            resp.raise_for_status()
        except Exception as e:
            return Response({"detail": f"Telegram error: {e}"}, status=502)
        return Response({"ok": True})
