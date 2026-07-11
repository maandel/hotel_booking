from cloudinary.models import CloudinaryField
from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone
from django.conf import settings

from .soft_delete import SoftDeleteModel, UUIDModel

class User(AbstractUser, UUIDModel):
    """Custom User model with UUID primary key"""
    pass

class UserProfile(UUIDModel):
    """Extended user profile with additional fields"""

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="profile")
    profile_picture = CloudinaryField("image", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"

    @property
    def has_profile_picture(self):
        return bool(self.profile_picture)


class Hotel(SoftDeleteModel):
    name = models.CharField(max_length=200)
    address = models.TextField()
    contact_email = models.EmailField()
    contact_phone = models.CharField(max_length=15)
    description = models.TextField(blank=True)
    hotel_logo = CloudinaryField("image", blank=True, null=True)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return self.name


class HotelAmenity(SoftDeleteModel):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    icon_name = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.name


class RoomAmenity(SoftDeleteModel):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    icon_name = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.name


class RoomType(SoftDeleteModel):
    name = models.CharField(max_length=200, unique=True)
    description = models.TextField()
    base_price = models.DecimalField(max_digits=20, decimal_places=2)
    display_price = models.CharField(max_length=300, null=True, blank=True)
    capacity = models.PositiveIntegerField()
    amenities = models.ManyToManyField(RoomAmenity)
    image = CloudinaryField("image", blank=True, null=True)

    def clean(self):
        # Skip validation for unsaved instances
        if self.pk is None:
            return

        # Only validate amenities for saved instances
        if not self.amenities.exists():
            raise ValidationError("A room type must have at least one amenity")

    def __str__(self):
        return self.name


class Room(SoftDeleteModel):
    hotel = models.ForeignKey(Hotel, on_delete=models.SET_NULL, null=True)
    room_type = models.ForeignKey(RoomType, on_delete=models.SET_NULL, null=True)
    room_number = models.CharField(max_length=10, unique=True)
    is_available = models.BooleanField(default=True)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return f"{self.room_type} - {self.room_number}"


class Booking(SoftDeleteModel):
    room = models.ForeignKey(Room, on_delete=models.SET_NULL, null=True)
    checkin = models.DateField()
    checkout = models.DateField()
    guests = models.PositiveIntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(default=timezone.now)
    special_request = models.TextField(blank=True)
    status = models.CharField(
        max_length=30,
        choices=[
            ("pending", "Pending"),
            ("confirmed", "Confirmed"),
            ("cancelled", "Cancelled"),
        ],
        default="pending",
    )
    transaction_id = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"Booking for {self.room} - {self.checkin} to {self.checkout}"


class Guest(SoftDeleteModel):
    booking = models.ForeignKey(Booking, on_delete=models.SET_NULL, null=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField()
    phone = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class ContactForm(UUIDModel):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    subject = models.CharField(max_length=400)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.subject}"


# Permission and Role Management Models
class Permission(UUIDModel):
    """Custom permission model for fine-grained access control"""

    PERMISSION_TYPES = [
        ("add", "Add"),
        ("view", "View"),
        ("edit", "Edit"),
        ("delete", "Delete"),
    ]

    name = models.CharField(max_length=200)
    codename = models.CharField(max_length=100, unique=True)
    content_type = models.ForeignKey(
        ContentType, on_delete=models.CASCADE, related_name="custom_permissions"
    )
    permission_type = models.CharField(max_length=10, choices=PERMISSION_TYPES)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("content_type", "permission_type")
        ordering = ["content_type__model", "permission_type"]

    def __str__(self):
        return f"{self.get_permission_type_display()} {self.content_type.model}"

    def save(self, *args, **kwargs):
        if not self.name:
            self.name = f"Can {self.get_permission_type_display().lower()} {self.content_type.model}"
        if not self.codename:
            self.codename = f"{self.permission_type}_{self.content_type.model}"
        super().save(*args, **kwargs)


class Role(UUIDModel):
    """Role model to group permissions"""

    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    permissions = models.ManyToManyField(Permission, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name

    def get_permission_codenames(self):
        """Get list of permission codenames for this role"""
        return list(self.permissions.values_list("codename", flat=True))


class UserRole(UUIDModel):
    """Many-to-many relationship between users and roles"""

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    assigned_at = models.DateTimeField(auto_now_add=True)
    assigned_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name="assigned_roles"
    )

    class Meta:
        unique_together = ("user", "role")

    def __str__(self):
        return f"{self.user.username} - {self.role.name}"
