import getpass
from hotel.models import User
from django.core.management.base import BaseCommand
from hotel.models import Role, UserRole


class Command(BaseCommand):
    help = "Creates a Superadmin user and ensures the Admin role exists."

    def add_arguments(self, parser):
        parser.add_argument("--username", type=str, help="Admin username")
        parser.add_argument("--email", type=str, help="Admin email")
        parser.add_argument("--password", type=str, help="Admin password")

    def handle(self, *args, **options):
        username = options.get("username")
        email = options.get("email")
        password = options.get("password")

        # Interactive prompts if not provided
        if not username:
            username = input("Username: ").strip()
        if not email:
            email = input("Email address: ").strip()
        if not password:
            password = getpass.getpass("Password: ")

        if not username or not email or not password:
            self.stdout.write(self.style.ERROR("Error: Username, email, and password are required."))
            return

        if User.objects.filter(username=username).exists():
            self.stdout.write(self.style.WARNING(f'User "{username}" already exists.'))
            return

        # Create the Superuser
        user = User.objects.create_superuser(
            username=username, email=email, password=password
        )
        self.stdout.write(
            self.style.SUCCESS(f'Successfully created superuser "{username}"')
        )

        # Ensure "Admin" role exists in custom Role table
        admin_role, created = Role.objects.get_or_create(
            name="Admin", defaults={"description": "Full access super administrator"}
        )
        if created:
            self.stdout.write(self.style.SUCCESS('Created "Admin" Role.'))

        # Assign role
        UserRole.objects.get_or_create(user=user, role=admin_role)
        self.stdout.write(
            self.style.SUCCESS(f'Successfully assigned "Admin" role to "{username}"')
        )
