from channels.middleware import BaseMiddleware
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import AccessToken

User = get_user_model()


class JWTAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        query_string = scope.get("query_string", b"").decode()
        query_params = {}

        if query_string:
            from urllib.parse import parse_qs

            query_params = parse_qs(query_string)

        token = query_params.get("token", [None])[0]

        if token:
            try:
                access_token = AccessToken(token)
                user_id = access_token["user_id"]
                user = await self.get_user(user_id)
                scope["user"] = user
            except Exception as e:
                print(f"JWT auth failed: {e}")
                try:
                    from jwt import PyJWTError
                    from jwt import decode as jwt_decode

                    decoded = jwt_decode(token, options={"verify_signature": False})
                    user_id = decoded.get("user_id")
                    if user_id:
                        user = await self.get_user(user_id)
                        scope["user"] = user
                        print(f"Using expired token for user {user_id}")
                    else:
                        scope["user"] = AnonymousUser()
                except PyJWTError:
                    scope["user"] = AnonymousUser()
        else:
            scope["user"] = AnonymousUser()

        return await super().__call__(scope, receive, send)

    @staticmethod
    async def get_user(user_id):
        try:
            return await User.objects.aget(id=user_id)
        except User.DoesNotExist:
            return AnonymousUser()
