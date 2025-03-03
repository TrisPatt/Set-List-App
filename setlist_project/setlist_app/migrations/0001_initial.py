# Generated by Django 5.1.6 on 2025-03-03 20:11

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Song',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255, unique=True)),
                ('duration', models.FloatField(help_text='Duration in minutes')),
            ],
        ),
        migrations.CreateModel(
            name='Setlist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('set_number', models.IntegerField(choices=[(1, 'Set 1'), (2, 'Set 2')])),
                ('song', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='setlist_app.song')),
            ],
        ),
    ]
