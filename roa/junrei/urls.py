from django.urls import path
from django.views.generic import RedirectView
from django.contrib.staticfiles.storage import staticfiles_storage

from . import views

urlpatterns = [
    path(
        'acidsoftware.gif',
        RedirectView.as_view(url=staticfiles_storage.url('acidsoftware.gif'))
    ),
    path('hello', views.hello, name='hello'),
    path('', views.index, name="index"),
]
