from common.pagination import CustomPagination
from common.schemas import StandardResponse
from django.core.exceptions import ValidationError
from ninja import Router
from ninja.pagination import paginate
from ninja_jwt.authentication import JWTAuth

from .models import Booking, Guest, Hotel, RoomType
from .schemas import (
    AvailabilityCheckSchema,
    BookingCreateSchema,
    BookingSchema,
    HotelSchema,
    RoomTypeSchema,
)
from .selectors.room_selectors import get_available_room_types
from .services.booking_service import create_booking_transaction

router = Router(tags=["Hotel & Bookings"])


@router.get("/hotel", response=StandardResponse[HotelSchema])
def get_hotel(request):
    """Get the primary hotel information"""
    hotel = Hotel.objects.first()
    return StandardResponse(data=hotel)


@router.get("/room-types", response=list[RoomTypeSchema])
@paginate(CustomPagination)
def list_room_types(request):
    """List all available room types (Paginated)"""
    return RoomType.objects.all()


@router.get("/room-types/{room_type_id}", response={200: RoomTypeSchema, 404: StandardResponse})
def get_room_type(request, room_type_id: int):
    """Get details of a specific room type"""
    try:
        return 200, RoomType.objects.get(id=room_type_id)
    except RoomType.DoesNotExist:
        return 404, StandardResponse(success=False, message="Room type not found")


@router.post("/rooms/available", response=StandardResponse[list[RoomTypeSchema]])
def check_availability(request, payload: AvailabilityCheckSchema):
    """Check availability for a given date range and guest count"""
    available_room_types = get_available_room_types(
        checkin=payload.checkin, checkout=payload.checkout, guests=payload.guests
    )
    return StandardResponse(data=available_room_types)


@router.post(
    "/bookings", response={200: StandardResponse[BookingSchema], 400: StandardResponse}
)
def create_booking(request, payload: BookingCreateSchema):
    """Create a new booking and guest record using Clean Architecture Services"""

    # Extract guest info from the payload (for our service layer)
    guest_data = {
        "first_name": payload.first_name,
        "last_name": payload.last_name,
        "email": payload.email,
        "phone": payload.phone,
    }

    try:
        booking = create_booking_transaction(
            room_type_id=payload.room_type_id,
            checkin=payload.checkin,
            checkout=payload.checkout,
            guests=payload.guests,
            special_request=payload.special_request,
            guest_data=guest_data,
        )
        return 200, StandardResponse(
            message="Booking created successfully", data=booking
        )
    except ValidationError as e:
        return 400, StandardResponse(success=False, message=str(e))
    except Exception:
        return 400, StandardResponse(
            success=False, message="An unexpected error occurred."
        )


@router.get("/my-bookings", response=list[BookingSchema], auth=JWTAuth())
@paginate(CustomPagination)
def my_bookings(request):
    """Get bookings for the currently authenticated user (Paginated)"""
    user_email = request.auth.email
    guest_bookings = Guest.objects.filter(email=user_email).values_list(
        "booking_id", flat=True
    )
    return Booking.objects.filter(id__in=guest_bookings).order_by("-created_at")
