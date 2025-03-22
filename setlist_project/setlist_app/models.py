from django.db import models
from datetime import timedelta

class Song(models.Model):
    title = models.CharField(max_length=255, unique=True)
    duration = models.DurationField(help_text="Duration in MM:SS format")  

    def __str__(self):
        minutes, seconds = divmod(self.duration.total_seconds(), 60)
        return f"{self.title} ({int(minutes)}:{int(seconds):02d})"

    def formatted_duration(self):
        """Returns duration in MM:SS format."""
        minutes, seconds = divmod(self.duration.total_seconds(), 60)
        return f"{int(minutes)}:{int(seconds):02d}"


class Setlist(models.Model):
    SET_CHOICES = [(1, "Set 1"), (2, "Set 2")]

    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    set_number = models.IntegerField(choices=SET_CHOICES)
    order = models.PositiveIntegerField(default=0) 

    class Meta:
        unique_together = ('song', 'set_number')

    def __str__(self):
        return f"{self.song.title} - Set {self.set_number}"

