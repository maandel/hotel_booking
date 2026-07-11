from uuid import UUID
from django.db.models import QuerySet
from hotel.models import Booking


def get_all_bookings() -> QuerySet[Booking]:
    """Get all bookings, ordered by creation date."""
    return Booking.objects.all().order_by("-created_at")


def get_booking_by_id(booking_id: UUID) -> Booking:
    """Get a specific booking."""
    return Booking.objects.get(id=booking_id)
