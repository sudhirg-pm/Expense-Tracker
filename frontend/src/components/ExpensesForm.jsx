import { useEffect, useState } from 'react'
import { createExpense, listCategories, updateExpense } from '../api/client'

function ExpensesForm({ expense, onCancel, onSuccess }) {
  const isEditMode = Boolean(expense)

  const [formData, setFormData] = useState({
    amount: expense?.amount ?? '',
    description: expense?.description ?? '',
    category_id: expense?.category_id ?? '',
    transaction_date: expense?.transaction_date ?? '',
    notes: expense?.notes ?? '',
  })
  const [categories, setCategories] = useState([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function loadCategories() {
      setCategoriesLoading(true)
      try {
        const data = await listCategories()
        if (!cancelled) {
          setCategories(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
        }
      } finally {
        if (!cancelled) {
          setCategoriesLoading(false)
        }
      }
    }

    loadCategories()

    return () => {
      cancelled = true
    }
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)
    setSubmitting(true)

    const payload = {
      amount: Number(formData.amount),
      description: formData.description,
      category_id: Number(formData.category_id),
      transaction_date: formData.transaction_date,
      notes: formData.notes || null,
    }

    try {
      if (isEditMode) {
        await updateExpense(expense.id, payload)
      } else {
        await createExpense(payload)
      }
      onSuccess?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">{isEditMode ? 'Edit Expense' : 'Add Expense'}</h2>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">{error}</div>
      )}

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-slate-700">
          Amount
        </label>
        <input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          min="0.01"
          required
          value={formData.amount}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-700">
          Description
        </label>
        <input
          id="description"
          name="description"
          type="text"
          required
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="category_id" className="block text-sm font-medium text-slate-700">
          Category
        </label>
        <select
          id="category_id"
          name="category_id"
          required
          disabled={categoriesLoading}
          value={formData.category_id}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="" disabled>
            {categoriesLoading ? 'Loading categories...' : 'Select a category'}
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="transaction_date" className="block text-sm font-medium text-slate-700">
          Transaction Date
        </label>
        <input
          id="transaction_date"
          name="transaction_date"
          type="date"
          required
          value={formData.transaction_date}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-slate-700">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          maxLength={500}
          rows={3}
          value={formData.notes}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? 'Saving...' : isEditMode ? 'Save Changes' : 'Add Expense'}
        </button>
      </div>
    </form>
  )
}

export default ExpensesForm
