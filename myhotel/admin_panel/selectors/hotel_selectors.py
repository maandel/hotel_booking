from django.db.models import QuerySet
from hotel.models import Hotel, HotelAmenity, Room, RoomAmenity, RoomType


def get_all_hotels() -> QuerySet[Hotel]:
    return Hotel.objects.all()


def get_all_room_types() -> QuerySet[RoomType]:
    return RoomType.objects.all()


def get_all_rooms() -> QuerySet[Room]:
    return Room.objects.all()


def get_all_room_amenities() -> QuerySet[RoomAmenity]:
    return RoomAmenity.objects.all()


def get_all_hotel_amenities() -> QuerySet[HotelAmenity]:
    return HotelAmenity.objects.all()
