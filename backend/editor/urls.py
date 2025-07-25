from django.urls import path
from . import views
from .views import  delete_document


urlpatterns = [
    path('api/save-document/', views.save_document),
    path('api/documents/', views.list_documents),
    path('delete-document/', delete_document, name='delete-document'),
    path('api/documents/<str:doc_id>/', views.get_document),
]
