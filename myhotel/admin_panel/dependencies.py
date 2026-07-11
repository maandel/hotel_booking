from hotel.models import UserRole
from ninja.errors import HttpError


class HasPermission:
    """
    Ninja Dependency to check if the currently authenticated user
    possesses a specific role-based permission.
    """

    def __init__(self, codename: str):
        self.codename = codename

    def __call__(self, request):
        user = getattr(request, "auth", None)
        if not user or not user.is_authenticated:
            raise HttpError(401, "Unauthorized")

        # Superusers bypass all permission checks
        if user.is_superuser:
            return True

        # Check if any of the user's roles have the required permission
        has_perm = UserRole.objects.filter(
            user=user, role__permissions__codename=self.codename
        ).exists()

        if not has_perm:
            raise HttpError(
                403, f"Forbidden: You do not have the '{self.codename}' permission."
            )

        return True
