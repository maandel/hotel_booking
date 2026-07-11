from datetime import date

from ninja import ModelSchema, Schema

from .models import Booking, Hotel, HotelAmenity, Room, RoomAmenity, RoomType


# Amenities
class RoomAmenitySchema(ModelSchema):
    class Meta:
        model = RoomAmenity
        fields = ["id", "name", "description", "icon_name"]


class HotelAmenitySchema(ModelSchema):
    class Meta:
        model = HotelAmenity
        fields = ["id", "name", "description", "icon_name"]


# Hotel
class HotelSchema(ModelSchema):
    class Meta:
        model = Hotel
        fields = [
            "id",
            "name",
            "address",
            "contact_email",
            "contact_phone",
            "description",
        ]


# Room Type
class RoomTypeSchema(ModelSchema):
    amenities: list[RoomAmenitySchema]

    class Meta:
        model = RoomType
        fields = [
            "id",
            "name",
            "description",
            "base_price",
            "display_price",
            "capacity",
        ]


# Room
class RoomSchema(ModelSchema):
    room_type: RoomTypeSchema

    class Meta:
        model = Room
        fields = ["id", "room_number", "is_available"]


# Booking
class BookingSchema(ModelSchema):
    room: RoomSchema

    class Meta:
        model = Booking
        fields = [
            "id",
            "checkin",
            "checkout",
            "guests",
            "total_price",
            "special_request",
            "status",
            "created_at",
        ]


# Input Schema for creating a booking
class BookingCreateSchema(Schema):
    room_type_id: int
    checkin: date
    checkout: date
    guests: int
    special_request: str | None = ""

    # Guest details
    first_name: str
    last_name: str
    email: str
    phone: str


class AvailabilityCheckSchema(Schema):
    checkin: date
    checkout: date
    guests: int
