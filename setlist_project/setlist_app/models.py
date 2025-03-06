from django.db import models

class Song(models.Model):
    title = models.CharField(max_length=255, unique=True)
    duration = models.DecimalField(max_digits=5, decimal_places=2, help_text="Duration in minutes")

    def __str__(self):
        return f"{self.title} ({self.duration} mins)"

class Setlist(models.Model):
    SET_CHOICES = [(1, "Set 1"), (2, "Set 2")]

    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    set_number = models.IntegerField(choices=SET_CHOICES)

    def __str__(self):
        return f"{self.song.title} - Set {self.set_number}"

