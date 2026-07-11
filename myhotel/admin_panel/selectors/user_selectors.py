from uuid import UUID
from hotel.models import User
from django.db.models import QuerySet
from hotel.models import Role, UserRole


def get_all_users() -> QuerySet[User]:
    """Get all users."""
    return User.objects.all().order_by("-date_joined")


def get_all_roles() -> QuerySet[Role]:
    """Get all roles."""
    return Role.objects.all()


def get_user_roles(user_id: UUID) -> QuerySet[UserRole]:
    """Get all roles assigned to a user."""
    return UserRole.objects.filter(user_id=user_id)
