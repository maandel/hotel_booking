from uuid import UUID
from django.shortcuts import get_object_or_404
from hotel.models import Booking


def update_booking_status(booking_id: UUID, status: str) -> Booking:
    """Update the status of a booking (e.g., pending, confirmed, cancelled)."""
    booking = get_object_or_404(Booking, id=booking_id)
    booking.status = status
    booking.save()
    return booking


def soft_delete_booking(booking_id: UUID) -> None:
    """Soft delete a booking."""
    booking = get_object_or_404(Booking, id=booking_id)
    booking.delete()  # Assumes SoftDeleteModel is implemented properly
