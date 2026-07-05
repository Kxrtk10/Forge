from uuid import UUID

from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    email: EmailStr
    name: str | None = None


class UserCreate(UserBase):
    pass


class UserRead(UserBase):
    id: UUID

    model_config = {"from_attributes": True}
