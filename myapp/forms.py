from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm
from django.forms import ModelForm
from .models import ImageModel, CustomUser
import magic

class CustomUserForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = get_user_model()
        fields = ["email"]

class ImageForm(ModelForm):
    class Meta:
        model = ImageModel
        fields = ["image"]
    
    def is_image(self, file):
        file_type = magic.from_buffer(file.read(1024), mime=True)

        if not file_type.startswith("image/"):
            return False
        return True