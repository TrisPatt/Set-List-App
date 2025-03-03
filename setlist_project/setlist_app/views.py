from django.shortcuts import render, redirect
from .models import Song, Setlist
from .forms import SongForm

def home(request):
    songs = Song.objects.all()
    set1 = Setlist.objects.filter(set_number=1)
    set2 = Setlist.objects.filter(set_number=2)
    return render(request, 'setlist_app/home.html', {"songs": songs, "set1": set1, "set2": set2})

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

