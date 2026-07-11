from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.shortcuts import redirect
from django.urls import include, path

from .api import api


def api_docs_redirect(request):
    """Redirect users to the API documentation"""
    return redirect("/api/v1/docs")


urlpatterns = [
    path("admin/", admin.site.urls),
    path("", api_docs_redirect, name="home"),
    path("api/v1/", api.urls),  # Django Ninja Base Router
    path("accounts/", include("allauth.urls")),  # Allauth accounts
]

# Serve static files in development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Serve media files in both development and production
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
