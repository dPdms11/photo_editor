from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.shortcuts import render, redirect
from .forms import ImageForm, CustomUserForm
from .models import ImageModel

def home(request):
    if request.method == "POST":
        file = request.FILES["image"]
        form = ImageForm(request.POST, request.FILES)

        if form.is_valid() and form.is_image(file):
            # save image in database if user is logged in
            if request.user.is_authenticated:
                image = form.save(commit=False)
                image.user = request.user
                image.save()
                return JsonResponse({'status': 302,'id': image.id})
            
            # handle image in frontend if user is not logged in
            return JsonResponse({'status': 202})
        else:
            return JsonResponse({'status': 500, 'error': 'not a valid image'})
    else:
        user_form = CustomUserForm()
        # TBD - if user is logged in, get images from database
        return render(request, "home.html", {"user_form": user_form})

def workspace(request, id):
    user_form = CustomUserForm()
    return render(request, "workspace.html", {"imgId": id, "user_form": user_form})

def register(request):
    if request.method == "POST":
        form = CustomUserForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'status': 200})
        else:
            messages.info(request, form.errors)
            return JsonResponse({'status': 400})

def login_user(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")
        user = authenticate(request, email=email, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({'status': 200})
        else:
            messages.info(request, "Invalid username or password")
            return JsonResponse({'status': 400})

def logout_user(request):
    logout(request)
    return redirect("home")

def account(request):
    return render(request, "account.html")

def uploads(request):
    return render(request, "uploads.html")