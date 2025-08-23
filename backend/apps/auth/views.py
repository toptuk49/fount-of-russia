from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken


class RegisterView(APIView):
    def post(self, request):
        name = request.data.get("name")
        email = request.data.get("email")
        password = request.data.get("password")
        password2 = request.data.get("password2")

        if not name or not email or not password or not password2:
            return Response(
                {"detail": "Заполните все поля"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if password != password2:
            return Response(
                {"detail": "Пароли не совпадают"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if User.objects.filter(email=email).exists():
            return Response(
                {"detail": "Пользователь с таким email уже существует"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # username используем как email, чтобы поддерживать вход по email
        user = User.objects.create_user(
            username=email, first_name=name, email=email, password=password
        )

        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": {"id": user.id, "name": user.first_name, "email": user.email},
            }
        )


class LoginView(APIView):
    """Логин по email (или username, если он совпадает с email)."""
    def post(self, request):
        # Принимаем либо email, либо username для совместимости
        email = request.data.get("email")
        username = request.data.get("username")  # на случай старого фронта
        password = request.data.get("password")

        if not (email or username) or not password:
            return Response(
                {"detail": "Введите email и пароль"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Если пришёл email — используем его как username (мы его так и сохраняем при регистрации)
        login_name = email or username

        user = authenticate(username=login_name, password=password)

        if not user:
            return Response(
                {"detail": "Неверные учетные данные"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": {"id": user.id, "name": user.first_name, "email": user.email},
            }
        )
