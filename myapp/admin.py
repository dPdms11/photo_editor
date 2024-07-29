from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import UserCreationForm
from .models import ImageModel, CustomUser

class CustomUserAdmin(UserAdmin):
    add_form = UserCreationForm
    model = CustomUser

    list_display = ["email", "username", "is_admin", "is_staff"]
    list_filter = ["is_admin"]
    fieldsets = [
        (None, {"fields": ["email", "username", "password"]}),
        ("Permissions", {"fields": ["is_admin", "is_staff"]})
    ]
    add_fieldsets = [
        (None, {
            "classes": ["wide",],
            "fields": ["email", "username", "password1", "password2", "is_admin", "is_staff"]
        })
    ]
    search_fields = ["email", "username", ]
    ordering = ["email", ]
    filter_horizontal = ()

admin.site.register(ImageModel)
admin.site.register(CustomUser, CustomUserAdmin)