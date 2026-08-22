from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryRead, CategoryUpdate

router = APIRouter(prefix="/categories", tags=["categories"])


def _get_category_or_404(db: Session, category_id: int) -> Category:
    category = db.get(Category, category_id)
    if category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return category


@router.post("", response_model=CategoryRead, status_code=201)
def create_category(category_in: CategoryCreate, db: Session = Depends(get_db)) -> Category:
    category = Category(**category_in.model_dump())
    db.add(category)
    db.commit()
    db.refresh(category)
    return category


@router.get("", response_model=list[CategoryRead])
def list_categories(db: Session = Depends(get_db)) -> list[Category]:
    return db.query(Category).all()


@router.get("/{category_id}", response_model=CategoryRead)
def get_category(category_id: int, db: Session = Depends(get_db)) -> Category:
    return _get_category_or_404(db, category_id)


@router.put("/{category_id}", response_model=CategoryRead)
def update_category(category_id: int, category_in: CategoryUpdate, db: Session = Depends(get_db)) -> Category:
    category = _get_category_or_404(db, category_id)
    for field, value in category_in.model_dump().items():
        setattr(category, field, value)
    db.commit()
    db.refresh(category)
    return category


@router.delete("/{category_id}", status_code=204)
def delete_category(category_id: int, db: Session = Depends(get_db)) -> None:
    category = _get_category_or_404(db, category_id)
    db.delete(category)
    db.commit()
