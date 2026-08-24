import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteExpense, listCategories, listExpenses } from '../api/client'

function ExpensesPage() {
  const [expenses, setExpenses] = useState([])
  const [categories, setCategories] = useState([])
  const [categoryFilter, setCategoryFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    listCategories()
      .then(setCategories)
      .catch((err) => setError(err.message))
  }, [])

  const loadExpenses = async (categoryId) => {
    setLoading(true)
    setError(null)
    try {
      const data = await listExpenses({ categoryId })
      setExpenses(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadExpenses(categoryFilter)
  }, [categoryFilter])

  const categoryName = (categoryId) =>
    categories.find((category) => category.id === categoryId)?.name ?? 'Unknown'

  const handleDelete = async (expense) => {
    const confirmed = window.confirm(`Delete "${expense.description}"? This cannot be undone.`)
    if (!confirmed) {
      return
    }

    setError(null)
    try {
      await deleteExpense(expense.id)
      await loadExpenses(categoryFilter)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Expenses</h1>
        <Link
          to="/expenses/new"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Add New
        </Link>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <label htmlFor="category-filter" className="text-sm font-medium text-slate-700">
          Filter by category
        </label>
        <select
          id="category-filter"
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-6 text-center text-sm text-slate-500 shadow-sm">
          Loading expenses...
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 font-medium text-slate-600">Date</th>
                <th className="px-4 py-3 font-medium text-slate-600">Description</th>
                <th className="px-4 py-3 font-medium text-slate-600">Category</th>
                <th className="px-4 py-3 font-medium text-slate-600">Amount</th>
                <th className="px-4 py-3 font-medium text-slate-600">Notes</th>
                <th className="px-4 py-3 font-medium text-slate-600">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {expenses.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-slate-500">
                    No expenses found.
                  </td>
                </tr>
              )}
              {expenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-700">{expense.transaction_date}</td>
                  <td className="px-4 py-3 text-slate-900">{expense.description}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                      {categoryName(expense.category_id)}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-900">${Number(expense.amount).toFixed(2)}</td>
                  <td className="px-4 py-3 text-slate-500">{expense.notes || '—'}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleDelete(expense)}
                      className="rounded-md border border-red-200 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ExpensesPage
