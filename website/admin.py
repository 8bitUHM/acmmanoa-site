from django.contrib import admin
from .models import Program, Image

# Register your models here.

@admin.register(Image)
class ImageAdmin(admin.ModelAdmin): 
    def get_actions(self, request): 
        actions = super().get_actions(request)

        if request.user.username[0].upper() != "J":

            if "delete_selected" in actions: 
                del actions["delete_selected"]
        
        return actions 
    
    def __str__(self): 
        return self.name

@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    # Leaving this here in case we want additional functionality
    pass