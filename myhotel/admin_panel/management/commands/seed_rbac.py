from django.contrib.contenttypes.models import ContentType
from django.core.management.base import BaseCommand
from hotel.models import (
    Booking,
    Hotel,
    HotelAmenity,
    Permission,
    Role,
    Room,
    RoomType,
    User,
)


class Command(BaseCommand):
    help = "Seeds the database with granular module permissions and creates a default Admin role."

    def handle(self, *args, **options):
        # Define the modules and their required permissions
        # Format: Model, [list of permission prefixes]
        modules = [
            (User, ["view", "create", "edit", "delete"]),
            (Booking, ["view", "edit", "delete"]),  # No create_booking
            (Hotel, ["view", "create", "edit", "delete"]),
            (Room, ["view", "create", "edit", "delete"]),
            (RoomType, ["view", "create", "edit", "delete"]),
            (HotelAmenity, ["view", "create", "edit", "delete"]),
        ]

        created_perms = []

        for model_class, perm_types in modules:
            content_type = ContentType.objects.get_for_model(model_class)
            model_name = content_type.model

            for p_type in perm_types:
                codename = f"{p_type}_{model_name}"
                name = f"Can {p_type} {model_name}"

                perm, created = Permission.objects.get_or_create(
                    codename=codename,
                    defaults={
                        "name": name,
                        "content_type": content_type,
                        "permission_type": p_type,
                        "description": f"Allows the user to {p_type} {model_name} records.",
                    },
                )
                created_perms.append(perm)
                if created:
                    self.stdout.write(
                        self.style.SUCCESS(f"Created permission: {codename}")
                    )
                else:
                    self.stdout.write(f"Permission already exists: {codename}")

        # Create or update the Admin role with ALL permissions
        admin_role, created = Role.objects.get_or_create(
            name="Admin",
            defaults={"description": "Full access administrator with all permissions"},
        )

        # Add all generated permissions to the Admin role
        admin_role.permissions.add(*created_perms)

        self.stdout.write(
            self.style.SUCCESS(
                f'\nSuccessfully assigned {len(created_perms)} permissions to the "Admin" role.'
            )
        )
        self.stdout.write(self.style.SUCCESS("RBAC Seeding Complete!"))
