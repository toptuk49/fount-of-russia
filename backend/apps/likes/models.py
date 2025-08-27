from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    page_slug = models.SlugField(max_length=100)
    is_like = models.BooleanField()  # True = like, False = dislike
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("user", "page_slug")
        indexes = [models.Index(fields=["page_slug"])]

    def __str__(self):
        return (
            f"{self.user_id}:{self.page_slug}={'like' if self.is_like else 'dislike'}"
        )
