from hotel.models import Role, Permission
from admin_panel.schemas import RoleSchema, PermissionSchema

def get_all_roles():
    roles = Role.objects.all().prefetch_related("permissions")
    return [
        RoleSchema(
            id=role.id,
            name=role.name,
            description=role.description,
            is_active=role.is_active,
            permissions=[
                PermissionSchema(
                    id=perm.id,
                    name=perm.name,
                    codename=perm.codename,
                    permission_type=perm.permission_type,
                )
                for perm in role.permissions.all()
            ],
            created_at=role.created_at,
        )
        for role in roles
    ]

def get_all_permissions():
    perms = Permission.objects.all()
    return [
        PermissionSchema(
            id=perm.id,
            name=perm.name,
            codename=perm.codename,
            permission_type=perm.permission_type,
        )
        for perm in perms
    ]
