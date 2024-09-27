from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
   class Meta:
        model = Note
        fields = '__all__'  # or specify the fields explicitly