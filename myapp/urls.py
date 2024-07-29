from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("workspace/<int:id>", views.workspace, name="workspace"),
    path("register/", views.register, name="register"),
    path("login/", views.login_user, name="login"),
    path("logout/", views.logout_user, name="logout"),
    path("account/", views.account, name="account"),
    path("uploads/", views.uploads, name="uploads"),
]