from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from .models import Document
from .serializers import DocumentSerializer

@api_view(['GET'])
def list_documents(request):
    documents = Document.objects.all().order_by('-id')
    serializer = DocumentSerializer(documents, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_document(request, doc_id):
    try:
        document = Document.objects.get(doc_id=doc_id)
        serializer = DocumentSerializer(document)
        return Response(serializer.data)
    except Document.DoesNotExist:
        return Response({'error': 'Document not found'}, status=404)

@api_view(['POST'])
def save_document(request):
    doc_id = request.data.get('doc_id')
    title = request.data.get('title')
    content = request.data.get('content')

    if not doc_id or not title:
        return Response({'error': 'doc_id and title required'}, status=400)

    document, created = Document.objects.update_or_create(
        doc_id=doc_id,
        defaults={'title': title, 'content': content}
    )
    return Response({'message': 'Document saved successfully'})


@csrf_exempt
def delete_document(request):
    if request.method == 'POST':
        import json
        data = json.loads(request.body)
        title = data.get('title')
        try:
            doc = Document.objects.get(title=title)
            doc.delete()
            return JsonResponse({'status': 'success'})
        except Document.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Document not found'}, status=404)