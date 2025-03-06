from django.shortcuts import render, redirect
from .models import Song, Setlist
from .forms import SongForm

def home(request):
    # Fetch all available songs
    songs = Song.objects.all()

    # Get songs for Set 1 and Set 2
    set1 = Setlist.objects.filter(set_number=1)
    set2 = Setlist.objects.filter(set_number=2)

    # Correct conversion of minutes to seconds
    set1_total_seconds = sum(int(float(item.song.duration) * 60) for item in set1)
    set2_total_seconds = sum(int(float(item.song.duration) * 60) for item in set2)

    # Convert total seconds back to MM:SS format
    def format_duration(total_seconds):
        minutes = total_seconds // 60  # Whole minutes
        seconds = total_seconds % 60   # Remaining seconds
        return f"{minutes}:{seconds:02d}"  # Format as MM:SS

    set1_duration = format_duration(set1_total_seconds)
    set2_duration = format_duration(set2_total_seconds)

    return render(request, 'setlist_app/home.html', {
        "songs": songs,
        "set1": set1,
        "set2": set2,
        "set1_duration": set1_duration,  
        "set2_duration": set2_duration,
    })


def add_song(request):
    if request.method == "POST":
        form = SongForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')
    else:
        form = SongForm()
    return render(request, 'setlist_app/add_song.html', {"form": form})

def add_to_set(request, song_id, set_number):
    song = Song.objects.get(id=song_id)
    Setlist.objects.create(song=song, set_number=set_number)
    return redirect('home')

def remove_from_set(request, setlist_id):
    setlist_entry = Setlist.objects.get(id=setlist_id)
    setlist_entry.delete()
    return redirect('home')

def clear_all_from_set(request, set_number):
    Setlist.objects.filter(set_number=set_number).delete()
    return redirect('home')  

def clear_all_songs(request):
    """Deletes all available songs from the database."""
    Song.objects.all().delete()
    return redirect('home')

