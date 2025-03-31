from django.contrib import admin
from .models import Program

# Register your models here.

@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    # Leaving this here in case we want additional functionality
    pass