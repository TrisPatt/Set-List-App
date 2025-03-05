from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('add-song/', views.add_song, name='add_song'),
    path('add-to-set/<int:song_id>/<int:set_number>/', views.add_to_set, name='add_to_set'),
    path('remove-from-set/<int:setlist_id>/', views.remove_from_set, name='remove_from_set'),
    path('clear-all-from-set/<int:set_number>/', views.clear_all_from_set, name='clear_all_from_set'),
]
