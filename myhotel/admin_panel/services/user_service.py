from uuid import UUID
from hotel.models import User
from django.db import transaction
from django.shortcuts import get_object_or_404
from hotel.models import Role, UserRole


def toggle_user_status(user_id: UUID) -> User:
    """Activate or deactivate a user."""
    user = get_object_or_404(User, id=user_id)
    user.is_active = not user.is_active
    user.save()
    return user


@transaction.atomic
def create_admin_user(data: dict, created_by_user: User) -> User:
    """Create a new admin user and assign roles."""
    if User.objects.filter(username=data["username"]).exists():
        raise ValueError("Username already exists")
    if User.objects.filter(email=data["email"]).exists():
        raise ValueError("Email already exists")

    user = User.objects.create_user(
        username=data["username"],
        email=data["email"],
        password=data["password"],
        first_name=data.get("first_name", ""),
        last_name=data.get("last_name", ""),
        is_staff=True,  # Give them basic django staff access
    )

    # Assign roles
    for role_id in data.get("role_ids", []):
        assign_role_to_user(user.id, role_id, created_by_user)

    return user


def assign_role_to_user(user_id: UUID, role_id: UUID, assigned_by_user: User) -> UserRole:
    """Assign a role to a user."""
    user = get_object_or_404(User, id=user_id)
    role = get_object_or_404(Role, id=role_id)

    user_role, _ = UserRole.objects.get_or_create(
        user=user, role=role, defaults={"assigned_by": assigned_by_user}
    )
    return user_role


def remove_role_from_user(user_id: UUID, role_id: UUID) -> None:
    """Remove a role from a user."""
    UserRole.objects.filter(user_id=user_id, role_id=role_id).delete()

@transaction.atomic
def update_admin_user(user_id: UUID, data: dict, updated_by_user: User) -> User:
    """Update an existing admin user and their roles."""
    user = get_object_or_404(User, id=user_id)
    
    if "username" in data and data["username"]:
        if User.objects.filter(username=data["username"]).exclude(id=user_id).exists():
            raise ValueError("Username already exists")
        user.username = data["username"]
        
    if "email" in data and data["email"]:
        if User.objects.filter(email=data["email"]).exclude(id=user_id).exists():
            raise ValueError("Email already exists")
        user.email = data["email"]
        
    if "first_name" in data:
        user.first_name = data["first_name"]
    if "last_name" in data:
        user.last_name = data["last_name"]
        
    user.save()
    
    if "role_ids" in data and data["role_ids"] is not None:
        # Clear existing roles
        UserRole.objects.filter(user=user).delete()
        # Assign new roles
        for role_id in data["role_ids"]:
            assign_role_to_user(user.id, role_id, updated_by_user)
            
    return user
