from datetime import date

from hotel.models import Booking, Room, RoomType


def get_available_room_types(
    checkin: date, checkout: date, guests: int
) -> list[RoomType]:
    """
    Returns a list of RoomTypes that have at least one room available
    for the given dates and capacity.
    """
    valid_room_types = RoomType.objects.filter(capacity__gte=guests)
    available_room_types = []

    for rt in valid_room_types:
        rooms = Room.objects.filter(room_type=rt, is_available=True)
        for room in rooms:
            overlapping = Booking.objects.filter(
                room=room,
                status="confirmed",
                checkin__lt=checkout,
                checkout__gt=checkin,
            ).exists()

            if not overlapping:
                available_room_types.append(rt)
                break  # We only need one available room to show the RoomType

    return available_room_types


def get_first_available_room(
    room_type_id: int, checkin: date, checkout: date
) -> Room | None:
    """
    Returns the first available room for a given room type and date range,
    or None if no rooms are available.
    """
    rooms = Room.objects.filter(room_type_id=room_type_id, is_available=True)

    for room in rooms:
        overlapping = Booking.objects.filter(
            room=room, status="confirmed", checkin__lt=checkout, checkout__gt=checkin
        ).exists()

        if not overlapping:
            return room

    return None
