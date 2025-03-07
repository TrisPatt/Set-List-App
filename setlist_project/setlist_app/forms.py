from django import forms
from .models import Song
from datetime import timedelta

class SongForm(forms.ModelForm):
    duration = forms.CharField(help_text="Enter duration in MM:SS format")

    class Meta:
        model = Song
        fields = ['title', 'duration']

    def clean_duration(self):
        """Converts MM:SS string into a timedelta object."""
        duration_str = self.cleaned_data['duration']
        try:
            minutes, seconds = map(int, duration_str.split(":"))
            return timedelta(minutes=minutes, seconds=seconds)
        except ValueError:
            raise forms.ValidationError("Invalid format. Use MM:SS.")
