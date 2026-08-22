from pydantic import BaseModel, ConfigDict


class CategoryBase(BaseModel):
    name: str
    color: str


class CategoryCreate(CategoryBase):
    pass


class CategoryUpdate(CategoryBase):
    pass


class CategoryRead(CategoryBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
