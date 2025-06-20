from django.contrib import admin
from .models import *

# Register your models here.

class ProgramLeadershipInline(admin.StackedInline):
    model = ProgramLeadership
    extra = 1

@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    inlines = [ProgramLeadershipInline]
    prepopulated_fields = { "slug": ["name"]}

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

@admin.register(Leadership)
class LeadershipAdmin(admin.ModelAdmin):
    pass

@admin.register(FAQ)
class FAQ(admin.ModelAdmin):
    pass