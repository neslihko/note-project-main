import logging
from django.shortcuts import render
from noteapp.models import Note
from noteapp.serializers import NoteSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db.models import Q
from rest_framework import status

# Configure logger
logger = logging.getLogger(__name__)

import requests
from django.conf import settings

def fetch_notes():
    url = f"{settings.VITE_API_BASE_URL}/api/notes/"
    response = requests.get(url)

    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "Unable to fetch notes"}



@api_view(['GET'])
def search_notes(request):
    query = request.query_params.get("search")
    try:
        notes = Note.objects.all()  # Retrieve all notes
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"Error in search_notes: {e}")
        return Response({'error': 'An error occurred while searching notes.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["GET", "POST"])
def notes(request):
    if request.method == "GET":
        try:
            notes = Note.objects.all()
            serializer = NoteSerializer(notes, many=True)
            return Response(serializer.data)
        except Exception as e:
            logger.error(f"Error in GET notes: {e}")
            return Response({'error': 'An error occurred while fetching notes.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'POST':
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def note_detail(request, slug):
    try:
        note = Note.objects.get(slug=slug)
    except Note.DoesNotExist:
        logger.warning(f"Note with slug '{slug}' does not exist.")
        return Response(status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error(f"Error in note_detail: {e}")
        return Response({'error': 'An error occurred while retrieving the note.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    if request.method == 'GET':
        serializer = NoteSerializer(note)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = NoteSerializer(note, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
