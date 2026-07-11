from typing import Generic, TypeVar

from django.core.paginator import Paginator
from ninja import Field, Schema
from ninja.pagination import PaginationBase

T = TypeVar("T")


class CustomPagination(PaginationBase):
    class Input(Schema):
        page: int = Field(1, ge=1)
        page_size: int = Field(10, ge=1, le=100)

    class Output(Schema, Generic[T]):
        success: bool = True
        message: str = "Success"
        count: int
        next: int | None = None
        previous: int | None = None
        items: list[T]

    items_attribute: str = "items"

    def paginate_queryset(self, queryset, pagination: Input, **params):
        paginator = Paginator(queryset, pagination.page_size)
        page = paginator.get_page(pagination.page)

        return {
            "success": True,
            "message": "Success",
            "count": paginator.count,
            "next": page.next_page_number() if page.has_next() else None,
            "previous": page.previous_page_number() if page.has_previous() else None,
            "items": list(page.object_list),
        }
