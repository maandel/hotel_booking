from uuid import UUID
from hotel.models import Role, Permission
from django.core.exceptions import ValidationError

def create_role(data: dict):
    name = data.get("name")
    description = data.get("description", "")
    permission_ids = data.get("permission_ids", [])
    
    if Role.objects.filter(name=name).exists():
        raise ValueError("A role with this name already exists")
        
    role = Role.objects.create(name=name, description=description)
    
    if permission_ids:
        perms = Permission.objects.filter(id__in=permission_ids)
        role.permissions.set(perms)
        
    return role

def update_role(role_id: UUID, data: dict):
    try:
        role = Role.objects.get(id=role_id)
    except Role.DoesNotExist:
        raise ValueError("Role not found")

    name = data.get("name")
    if name:
        if Role.objects.filter(name=name).exclude(id=role_id).exists():
            raise ValueError("Another role with this name already exists")
        role.name = name

    if "description" in data:
        role.description = data["description"]
        
    role.save()

    if "permission_ids" in data:
        perms = Permission.objects.filter(id__in=data["permission_ids"])
        role.permissions.set(perms)
        
    return role
