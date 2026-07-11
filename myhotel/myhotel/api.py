from admin_panel.api import router as admin_router
from hotel.api import router as hotel_router
from ninja_extra import NinjaExtraAPI
from ninja_jwt.controller import NinjaJWTDefaultController

# Create the main API instance
api = NinjaExtraAPI(
    title="Hotel Booking API",
    description="API for the decoupled Next.js Frontend",
    version="1.0.0",
)

# Register JWT Authentication endpoints automatically
api.register_controllers(NinjaJWTDefaultController)

# Attach the routers
api.add_router("/hotel", hotel_router)
api.add_router("/admin", admin_router)
