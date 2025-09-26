from django.contrib import admin
from django import forms
from .models import *

# Register your models here.

class SIGSLeadershipInline(admin.StackedInline):
    model = SIGSLeadership
    extra = 1

class SIGSForm(forms.ModelForm):
    class Meta:
        model = SIGS
        fields = '__all__'
        widgets = {
            'primary_color': forms.TextInput(attrs={'type': 'color', 'class': 'color-picker'}),
        }

@admin.register(SIGS)
class SIGSAdmin(admin.ModelAdmin):
    form = SIGSForm
    inlines = [SIGSLeadershipInline]
    prepopulated_fields = { "slug": ["name"] }
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'slug', 'about', 'logo')
        }),
        ('Website & Links', {
            'fields': ('website', 'link_name')
        }),
        ('Branding', {
            'fields': ('primary_color',),
            'description': 'Choose a primary color for this SIG. This will be used for theming the SIG page.'
        }),
    )

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