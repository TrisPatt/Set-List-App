from django import template
import math

register = template.Library()

@register.filter
def float_to_time(value):
    """Converts float minutes to MM:SS format."""
    try:
        total_seconds = int(value * 60)  
        minutes = total_seconds // 60
        seconds = total_seconds % 60
        return f"{minutes}:{seconds:02d}"  
    except (TypeError, ValueError):
        return "0:00"  
