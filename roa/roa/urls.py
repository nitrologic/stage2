from django.contrib.staticfiles.storage import staticfiles_storage
from django.views.generic import RedirectView
from django.urls import path
from django.conf.urls import url,include
from django.contrib import admin

urlpatterns = [
    path(
        'favicon.ico',
        RedirectView.as_view(url=staticfiles_storage.url('favicon.ico'))
    ),
    path('junrei/', include('junrei.urls')),
    path('admin/', admin.site.urls),
    path('',RedirectView.as_view(url='junrei/'))
]
