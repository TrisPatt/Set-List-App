from django import template
import math

register = template.Library()

@register.filter
def duration_filter(seconds):
    minutes, seconds = divmod(int(seconds), 60)
    return f"{minutes}:{seconds:02d}"
