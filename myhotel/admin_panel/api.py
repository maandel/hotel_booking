from uuid import UUID
from common.pagination import CustomPagination
from common.schemas import StandardResponse
from hotel.schemas import BookingSchema, HotelSchema, RoomSchema, RoomTypeSchema
from ninja import Router
from ninja.errors import HttpError
from ninja.pagination import paginate
from ninja_jwt.authentication import JWTAuth

from .dependencies import HasPermission
from .schemas import (
    BookingStatusUpdateSchema,
    HotelCreateSchema,
    RoomCreateSchema,
    RoomTypeCreateSchema,
    UserCreateSchema,
    UserUpdateSchema,
    UserSchema,
    RoleSchema,
    RoleCreateSchema,
    PermissionSchema
)
from .selectors.booking_selectors import get_all_bookings
from .selectors.hotel_selectors import (
    get_all_hotels,
    get_all_room_types,
    get_all_rooms,
)
from .selectors.user_selectors import get_all_users
from .services.booking_service import soft_delete_booking, update_booking_status
from .services.inventory_service import (
    create_hotel,
    create_room,
    create_room_type,
    soft_delete_hotel,
    soft_delete_room,
    soft_delete_room_type,
)
from .services.user_service import (
    create_admin_user,
    toggle_user_status,
)
from .selectors.role_selectors import get_all_roles, get_all_permissions
from .services.role_service import create_role

# Enforce JWT authentication for all admin endpoints
router = Router(tags=["Admin Panel"], auth=JWTAuth())


# --- Bookings ---
@router.get("/bookings", response=list[BookingSchema])
@paginate(CustomPagination)
def list_bookings(request):
    """List all bookings (including past/cancelled) for admin view."""
    HasPermission("view_booking")(request)
    return get_all_bookings()


@router.put("/bookings/{booking_id}/status", response=StandardResponse[BookingSchema])
def change_booking_status(request, booking_id: UUID, payload: BookingStatusUpdateSchema):
    """Update the status of a booking."""
    HasPermission("edit_booking")(request)
    booking = update_booking_status(booking_id, payload.status)
    return StandardResponse(message="Status updated", data=booking)


@router.delete("/bookings/{booking_id}", response=StandardResponse)
def delete_booking(request, booking_id: UUID):
    """Soft delete a booking."""
    HasPermission("delete_booking")(request)
    soft_delete_booking(booking_id)
    return StandardResponse(message="Booking deleted successfully")


# --- Users ---
@router.get("/users", response=list[UserSchema])
@paginate(CustomPagination)
def list_users(request):
    """List all registered users/admins."""
    HasPermission("view_user")(request)
    return get_all_users()


@router.post("/users", response=StandardResponse[UserSchema])
def create_user(request, payload: UserCreateSchema):
    """Create a new admin user."""
    HasPermission("create_user")(request)
    try:
        user = create_admin_user(payload.dict(), request.auth)
        return StandardResponse(message="Admin created", data=user)
    except ValueError as e:
        raise HttpError(400, str(e)) from e

@router.get("/users/{user_id}", response=UserSchema)
def get_user(request, user_id: UUID):
    """Get a specific admin user."""
    from django.shortcuts import get_object_or_404
    from hotel.models import User
    HasPermission("view_user")(request)
    user = get_object_or_404(User, id=user_id)
    return user

@router.put("/users/{user_id}", response=StandardResponse[UserSchema])
def edit_user(request, user_id: UUID, payload: UserUpdateSchema):
    """Update an existing admin user and their roles."""
    HasPermission("edit_user")(request)
    from admin_panel.services.user_service import update_admin_user
    try:
        user = update_admin_user(user_id, payload.dict(exclude_unset=True), request.auth)
        return StandardResponse(message="User updated", data=user)
    except ValueError as e:
        raise HttpError(400, str(e)) from e

@router.post("/users/{user_id}/toggle-status", response=StandardResponse[UserSchema])
def toggle_user(request, user_id: UUID):
    """Activate or deactivate a user account."""
    HasPermission("edit_user")(request)
    user = toggle_user_status(user_id)
    return StandardResponse(message="User status toggled", data=user)


# --- Roles & Permissions ---
@router.get("/roles", response=list[RoleSchema])
@paginate(CustomPagination)
def list_roles(request):
    """List all roles with their permissions."""
    return get_all_roles()

@router.post("/roles", response=StandardResponse[RoleSchema])
def add_role(request, payload: RoleCreateSchema):
    """Create a new role with permissions."""
    try:
        role = create_role(payload.dict())
        # Re-fetch with permissions for schema response
        role = get_all_roles()[0] # Simplification for response, or just return basic
        return StandardResponse(message="Role created")
    except ValueError as e:
        raise HttpError(400, str(e)) from e

@router.put("/roles/{role_id}", response=StandardResponse[RoleSchema])
def edit_role(request, role_id: UUID, payload: RoleCreateSchema):
    """Update an existing role."""
    from admin_panel.services.role_service import update_role
    try:
        role = update_role(role_id, payload.dict())
        return StandardResponse(message="Role updated")
    except ValueError as e:
        raise HttpError(400, str(e)) from e

@router.get("/permissions", response=list[PermissionSchema])
def list_permissions(request):
    """List all available permissions."""
    return get_all_permissions()


# --- Inventory ---
@router.get("/hotels", response=list[HotelSchema])
@paginate(CustomPagination)
def list_hotels(request):
    HasPermission("view_hotel")(request)
    return get_all_hotels()


@router.post("/hotels", response=StandardResponse[HotelSchema])
def add_hotel(request, payload: HotelCreateSchema):
    HasPermission("create_hotel")(request)
    hotel = create_hotel(payload.dict())
    return StandardResponse(message="Hotel created", data=hotel)


@router.delete("/hotels/{hotel_id}", response=StandardResponse)
def delete_hotel(request, hotel_id: UUID):
    HasPermission("delete_hotel")(request)
    soft_delete_hotel(hotel_id)
    return StandardResponse(message="Hotel deleted")


@router.get("/rooms", response=list[RoomSchema])
@paginate(CustomPagination)
def list_rooms(request):
    HasPermission("view_room")(request)
    return get_all_rooms()


@router.post("/rooms", response=StandardResponse[RoomSchema])
def add_room(request, payload: RoomCreateSchema):
    HasPermission("create_room")(request)
    room = create_room(payload.dict())
    return StandardResponse(message="Room created", data=room)


@router.delete("/rooms/{room_id}", response=StandardResponse)
def delete_room(request, room_id: UUID):
    HasPermission("delete_room")(request)
    soft_delete_room(room_id)
    return StandardResponse(message="Room deleted")


@router.get("/room-types", response=list[RoomTypeSchema])
@paginate(CustomPagination)
def list_admin_room_types(request):
    HasPermission("view_room_type")(request)
    return get_all_room_types()


from ninja import Form, File
from ninja.files import UploadedFile

@router.post("/room-types", response=StandardResponse[RoomTypeSchema])
def add_room_type(request, payload: RoomTypeCreateSchema = Form(...), image: UploadedFile = File(None)):
    HasPermission("create_room_type")(request)
    data = payload.dict()
    rt = create_room_type(data, image)
    return StandardResponse(message="Room type created", data=rt)


@router.delete("/room-types/{room_type_id}", response=StandardResponse)
def delete_room_type(request, room_type_id: UUID):
    HasPermission("delete_room_type")(request)
    soft_delete_room_type(room_type_id)
    return StandardResponse(message="Room type deleted")
