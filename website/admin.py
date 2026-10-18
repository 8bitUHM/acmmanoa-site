from django.contrib import admin
from django import forms
from .models import *
from .caldav_accounts import CalDAVAccountForm
from .caldav import CalendarUnavailable, ensure_calendar
from .calendar_hosts import get_calendar


@admin.register(CalDAVAccount)
class CalDAVAccountAdmin(admin.ModelAdmin):
    form = CalDAVAccountForm
    list_display = ('username', 'is_active', 'can_edit')
    list_filter = ('is_active', 'can_edit')
    search_fields = ('username',)

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

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        try:
            ensure_calendar(get_calendar(f'sig-{obj.pk}'))
        except CalendarUnavailable as error:
            self.message_user(request, f'SIG saved. Calendar provisioning needs a retry: {error}', level='error')
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'slug', 'expanded_name', 'about', 'logo')
        }),
        ('Website & Links', {
            'fields': ('website', 'link_name')
        }),
        ('Social Media', {
            'fields': ('discord_link', 'instagram_link', 'github_link', 'linkedin_link'),
            'description': 'Optional social media links for this SIG. Leave blank if not applicable.'
        }),
        ('Meeting Information', {
            'fields': ('meeting_days', 'meeting_start_time', 'meeting_end_time', 'meeting_location'),
            'description': 'Optional meeting information for this SIG. Leave blank if not applicable.'
        }),
        ('Branding', {
            'fields': ('primary_color',),
            'description': 'Choose a primary color for this SIG. This will be used for theming the SIG page.'
        }),
    )

@admin.register(CarouselImage)
class CarouselImageAdmin(admin.ModelAdmin):
    pass

# Event remains an unregistered legacy archive for the resumable CalDAV migration.

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
