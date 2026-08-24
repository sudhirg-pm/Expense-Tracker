from datetime import date, datetime
from decimal import Decimal
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


class ExpenseBase(BaseModel):
    amount: Decimal = Field(gt=0)
    description: str
    category_id: int
    transaction_date: date
    notes: Optional[str] = Field(default=None, max_length=500)


class ExpenseCreate(ExpenseBase):
    pass


class ExpenseUpdate(ExpenseBase):
    pass


class ExpenseRead(ExpenseBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
