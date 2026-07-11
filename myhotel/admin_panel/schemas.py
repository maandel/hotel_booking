from uuid import UUID
from hotel.models import User
from hotel.models import Role, UserRole, Permission
from ninja import ModelSchema, Schema


class UserSchema(ModelSchema):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "is_active",
            "date_joined",
        ]

    roles: list[str] = []
    role_ids: list[UUID] = []

    @staticmethod
    def resolve_roles(obj):
        return [ur.role.name for ur in obj.userrole_set.all()]
        
    @staticmethod
    def resolve_role_ids(obj):
        return [ur.role.id for ur in obj.userrole_set.all()]


class UserCreateSchema(Schema):
    username: str
    email: str
    password: str
    first_name: str | None = ""
    last_name: str | None = ""
    role_ids: list[UUID] = []

class UserUpdateSchema(Schema):
    username: str | None = None
    email: str | None = None
    first_name: str | None = None
    last_name: str | None = None
    role_ids: list[UUID] | None = None

class PermissionSchema(ModelSchema):
    class Meta:
        model = Permission
        fields = ["id", "name", "codename", "permission_type"]

class RoleSchema(ModelSchema):
    permissions: list[PermissionSchema] = []
    
    class Meta:
        model = Role
        fields = ["id", "name", "description", "is_active", "created_at"]

class RoleCreateSchema(Schema):
    name: str
    description: str | None = ""
    permission_ids: list[UUID] = []


class UserRoleSchema(ModelSchema):
    role: RoleSchema

    class Meta:
        model = UserRole
        fields = ["id", "assigned_at"]


class BookingStatusUpdateSchema(Schema):
    status: str


class RoleAssignmentSchema(Schema):
    role_id: UUID


class HotelCreateSchema(Schema):
    name: str
    address: str
    contact_email: str
    contact_phone: str
    description: str | None = ""


class RoomTypeCreateSchema(Schema):
    name: str
    description: str
    base_price: float
    capacity: int
    amenity_ids: list[UUID] = []
    amenity_names: str | None = None


class RoomCreateSchema(Schema):
    room_number: str
    room_type_id: UUID
    hotel_id: UUID


class AmenityCreateSchema(Schema):
    name: str
    description: str | None = ""
    icon_name: str | None = ""
