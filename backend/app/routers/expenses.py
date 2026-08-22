from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.category import Category
from app.models.expense import Expense
from app.schemas.expense import ExpenseCreate, ExpenseRead, ExpenseUpdate

router = APIRouter(prefix="/expenses", tags=["expenses"])


def _get_expense_or_404(db: Session, expense_id: int) -> Expense:
    expense = db.get(Expense, expense_id)
    if expense is None:
        raise HTTPException(status_code=404, detail="Expense not found")
    return expense


def _ensure_category_exists(db: Session, category_id: int) -> None:
    if db.get(Category, category_id) is None:
        raise HTTPException(status_code=404, detail="Category not found")


@router.post("", response_model=ExpenseRead, status_code=201)
def create_expense(expense_in: ExpenseCreate, db: Session = Depends(get_db)) -> Expense:
    _ensure_category_exists(db, expense_in.category_id)
    expense = Expense(**expense_in.model_dump())
    db.add(expense)
    db.commit()
    db.refresh(expense)
    return expense


@router.get("", response_model=list[ExpenseRead])
def list_expenses(db: Session = Depends(get_db)) -> list[Expense]:
    return db.query(Expense).all()


@router.get("/{expense_id}", response_model=ExpenseRead)
def get_expense(expense_id: int, db: Session = Depends(get_db)) -> Expense:
    return _get_expense_or_404(db, expense_id)


@router.put("/{expense_id}", response_model=ExpenseRead)
def update_expense(expense_id: int, expense_in: ExpenseUpdate, db: Session = Depends(get_db)) -> Expense:
    expense = _get_expense_or_404(db, expense_id)
    _ensure_category_exists(db, expense_in.category_id)
    for field, value in expense_in.model_dump().items():
        setattr(expense, field, value)
    db.commit()
    db.refresh(expense)
    return expense


@router.delete("/{expense_id}", status_code=204)
def delete_expense(expense_id: int, db: Session = Depends(get_db)) -> None:
    expense = _get_expense_or_404(db, expense_id)
    db.delete(expense)
    db.commit()
