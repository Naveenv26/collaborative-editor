from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('editor.urls')),
    path('api/', include('editor.urls')),
]
