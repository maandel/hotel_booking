from typing import Generic, TypeVar
from ninja import Schema

T = TypeVar("T")

class StandardResponse(Schema, Generic[T]):  # noqa: UP046
    success: bool = True
    message: str = "Success"
    data: T | None = None
