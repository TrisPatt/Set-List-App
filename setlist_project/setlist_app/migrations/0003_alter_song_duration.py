# Generated by Django 5.1.6 on 2025-03-06 21:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('setlist_app', '0002_alter_song_duration'),
    ]

    operations = [
        migrations.AlterField(
            model_name='song',
            name='duration',
            field=models.FloatField(help_text='Duration in minutes'),
        ),
    ]
