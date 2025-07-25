from django.db import models

class Document(models.Model):
    doc_id = models.CharField(max_length=100, unique=True)
    title = models.CharField(max_length=255, unique=True)
    content = models.TextField(blank=True)
