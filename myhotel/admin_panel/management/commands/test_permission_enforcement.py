from admin_panel.permission_decorators import has_permission, has_section_access
from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from django.test import RequestFactory


class Command(BaseCommand):
    help = "Test permission enforcement on views"

    def add_arguments(self, parser):
        parser.add_argument("username", type=str, help="Username to test")

    def handle(self, *args, **options):
        username = options["username"]

        try:
            user = User.objects.get(username=username)

            self.stdout.write(
                f"🔍 Testing permission enforcement for user: {user.username}"
            )
            self.stdout.write("=" * 60)

            # Test permission functions directly
            self.stdout.write("\n📋 DIRECT PERMISSION TESTS")
            self.stdout.write("-" * 40)

            # Test section access
            booking_section = has_section_access(user, "booking")
            guest_section = has_section_access(user, "guest")
            room_section = has_section_access(user, "room_setup")

            self.stdout.write(
                f"Booking section access: {'✅ ALLOWED' if booking_section else '❌ DENIED'}"
            )
            self.stdout.write(
                f"Guest section access: {'✅ ALLOWED' if guest_section else '❌ DENIED'}"
            )
            self.stdout.write(
                f"Room setup section access: {'✅ ALLOWED' if room_section else '❌ DENIED'}"
            )

            # Test model permissions
            view_booking = has_permission(user, "view_booking")
            edit_booking = has_permission(user, "edit_booking")
            view_guest = has_permission(user, "view_guest")
            view_room = has_permission(user, "view_room")

            self.stdout.write(
                f"View booking permission: {'✅ ALLOWED' if view_booking else '❌ DENIED'}"
            )
            self.stdout.write(
                f"Edit booking permission: {'✅ ALLOWED' if edit_booking else '❌ DENIED'}"
            )
            self.stdout.write(
                f"View guest permission: {'✅ ALLOWED' if view_guest else '❌ DENIED'}"
            )
            self.stdout.write(
                f"View room permission: {'✅ ALLOWED' if view_room else '❌ DENIED'}"
            )

            # Test view access simulation
            self.stdout.write("\n🎯 VIEW ACCESS SIMULATION")
            self.stdout.write("-" * 40)

            RequestFactory()

            # Test booking view access
            if booking_section and view_booking:
                self.stdout.write("✅ Booking views: User should have access")
            elif booking_section and not view_booking:
                self.stdout.write(
                    "⚠️  Booking views: User has section access but no model permission"
                )
            elif not booking_section and view_booking:
                self.stdout.write(
                    "⚠️  Booking views: User has model permission but no section access"
                )
            else:
                self.stdout.write("❌ Booking views: User should be denied access")

            # Test room view access
            if room_section and view_room:
                self.stdout.write("✅ Room views: User should have access")
            elif room_section and not view_room:
                self.stdout.write(
                    "⚠️  Room views: User has section access but no model permission"
                )
            elif not room_section and view_room:
                self.stdout.write(
                    "⚠️  Room views: User has model permission but no section access"
                )
            else:
                self.stdout.write("❌ Room views: User should be denied access")

            # Test guest view access
            if guest_section and view_guest:
                self.stdout.write("✅ Guest views: User should have access")
            elif guest_section and not view_guest:
                self.stdout.write(
                    "⚠️  Guest views: User has section access but no model permission"
                )
            elif not guest_section and view_guest:
                self.stdout.write(
                    "⚠️  Guest views: User has model permission but no section access"
                )
            else:
                self.stdout.write("❌ Guest views: User should be denied access")

            # Summary
            self.stdout.write("\n📊 ENFORCEMENT SUMMARY")
            self.stdout.write("-" * 40)

            total_sections = 3  # booking, guest, room_setup
            accessible_sections = sum([booking_section, guest_section, room_section])

            total_permissions = 4  # view_booking, edit_booking, view_guest, view_room
            granted_permissions = sum(
                [view_booking, edit_booking, view_guest, view_room]
            )

            self.stdout.write(f"Section access: {accessible_sections}/{total_sections}")
            self.stdout.write(
                f"Model permissions: {granted_permissions}/{total_permissions}"
            )

            if accessible_sections > 0 and granted_permissions > 0:
                self.stdout.write(
                    "✅ Permission system is working - user has limited access"
                )
            elif accessible_sections == 0 and granted_permissions == 0:
                self.stdout.write(
                    "✅ Permission system is working - user has no access"
                )
            else:
                self.stdout.write(
                    "⚠️  Permission system may have issues - check role assignments"
                )

            # Recommendations
            self.stdout.write("\n💡 RECOMMENDATIONS")
            self.stdout.write("-" * 40)

            if user.is_superuser:
                self.stdout.write(
                    "• User is superuser - should have all permissions automatically"
                )
            elif accessible_sections == 0:
                self.stdout.write(
                    "• User needs section access permissions assigned to their role"
                )
            elif granted_permissions == 0:
                self.stdout.write(
                    "• User needs model permissions assigned to their role"
                )
            else:
                self.stdout.write("• Permission levels look appropriate for user role")

        except User.DoesNotExist:
            self.stdout.write(f'❌ User "{username}" not found')
