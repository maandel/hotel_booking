from django.shortcuts import redirect


def admin_redirect(request):
    """Redirect to login if not authenticated, otherwise to dashboard"""
    if request.user.is_authenticated:
        return redirect("admin_panel:dashboard")
    else:
        return redirect("admin_panel:login")
