from django.contrib import admin
from .models import Program
from .models import CarouselImage
from .models import Event
from .models import Sponsor
from .models import ACMKekuhaupioCohort

# Register your models here.

@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    # Leaving this here in case we want additional functionality
    pass

@admin.register(CarouselImage)
class CarouselImageAdmin(admin.ModelAdmin):
    pass

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    pass

@admin.register(Sponsor)
class SponsorAdmin(admin.ModelAdmin):
    readonly_fields = ['created_at']

@admin.register(ACMKekuhaupioCohort)
class ACMKekuhaupioCohort(admin.ModelAdmin):
    readonly_fields = ['created_at']