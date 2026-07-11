from datetime import date

from django.core.exceptions import ValidationError
from django.db import transaction
from django.shortcuts import get_object_or_404
from hotel.models import Booking, Guest, RoomType
from hotel.selectors.room_selectors import get_first_available_room


def create_booking_transaction(
    room_type_id: int,
    checkin: date,
    checkout: date,
    guests: int,
    special_request: str,
    guest_data: dict,
) -> Booking:
    """
    Handles the business logic of creating a booking:
    1. Validates dates and capacity.
    2. Finds an available room.
    3. Calculates total price.
    4. Creates the Booking and Guest atomically.
    """

    if checkin >= checkout:
        raise ValidationError("Check-out date must be after check-in date.")

    room_type = get_object_or_404(RoomType, id=room_type_id)

    if guests > room_type.capacity:
        raise ValidationError(f"Guests exceed room capacity of {room_type.capacity}")

    # Get available room via Selector
    available_room = get_first_available_room(room_type.id, checkin, checkout)

    if not available_room:
        raise ValidationError("No rooms available for the selected dates.")

    # Calculate price
    nights = (checkout - checkin).days
    total_price = room_type.base_price * nights

    # Execute within an atomic database transaction
    with transaction.atomic():
        booking = Booking.objects.create(
            room=available_room,
            checkin=checkin,
            checkout=checkout,
            guests=guests,
            total_price=total_price,
            special_request=special_request,
            status="pending",
        )

        Guest.objects.create(
            booking=booking,
            first_name=guest_data.get("first_name", ""),
            last_name=guest_data.get("last_name", ""),
            email=guest_data.get("email", ""),
            phone=guest_data.get("phone", ""),
        )

    return booking
