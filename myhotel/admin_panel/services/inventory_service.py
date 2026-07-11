from uuid import UUID
from django.shortcuts import get_object_or_404
from hotel.models import Hotel, HotelAmenity, Room, RoomType


def create_room_type(data: dict, image=None) -> RoomType:
    """Create a new room type."""
    rt = RoomType.objects.create(
        name=data["name"],
        description=data["description"],
        base_price=data["base_price"],
        capacity=data["capacity"],
    )
    if image:
        rt.image = image
        rt.save()
        
    if "amenity_names" in data and data["amenity_names"]:
        from hotel.models import RoomAmenity
        names = [n.strip() for n in data["amenity_names"].split(",") if n.strip()]
        amenities = []
        for name in names:
            amenity, _ = RoomAmenity.objects.get_or_create(name=name)
            amenities.append(amenity)
        rt.amenities.set(amenities)
    elif "amenity_ids" in data and data["amenity_ids"]:
        rt.amenities.set(data["amenity_ids"])
    return rt


def soft_delete_room_type(room_type_id: UUID) -> None:
    """Soft delete a room type."""
    rt = get_object_or_404(RoomType, id=room_type_id)
    rt.delete()


def create_room(data: dict) -> Room:
    """Create a new room."""
    room_type = get_object_or_404(RoomType, id=data["room_type_id"])
    hotel = get_object_or_404(Hotel, id=data["hotel_id"])

    return Room.objects.create(
        room_number=data["room_number"],
        room_type=room_type,
        hotel=hotel,
        is_available=True,
    )


def soft_delete_room(room_id: UUID) -> None:
    """Soft delete a room."""
    room = get_object_or_404(Room, id=room_id)
    room.delete()


def create_hotel(data: dict) -> Hotel:
    return Hotel.objects.create(**data)


def soft_delete_hotel(hotel_id: UUID) -> None:
    hotel = get_object_or_404(Hotel, id=hotel_id)
    hotel.delete()


def create_hotel_amenity(data: dict) -> HotelAmenity:
    return HotelAmenity.objects.create(**data)


def soft_delete_hotel_amenity(amenity_id: UUID) -> None:
    amenity = get_object_or_404(HotelAmenity, id=amenity_id)
    amenity.delete()
