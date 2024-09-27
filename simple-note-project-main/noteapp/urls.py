# noteapp/urls.py
from django.urls import path
from .views import notes, note_detail, search_notes

urlpatterns = [
    path('api/notes/', notes, name='notes'),  # Ensure this matches your API call
    path('api/notes/<slug:slug>/', note_detail, name='note_detail'),
    path('api/search/', search_notes, name='search_notes'),  # Add 'api/' prefix if needed
]
