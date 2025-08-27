from django.contrib.auth.models import User
from rest_framework import generics, permissions, response

from .serializers import RegisterSerializer, UserSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class MeView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return response.Response(UserSerializer(request.user).data)
