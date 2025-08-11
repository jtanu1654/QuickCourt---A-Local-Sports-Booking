
# Create your models here.
from django.db import models

class UserProfile(models.Model):
    profile_image = models.ImageField(upload_to='profile_images/', null=True, blank=True)
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    # Add other fields as needed