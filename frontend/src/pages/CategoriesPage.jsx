import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteCategory, listCategories } from '../api/client'

function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await listCategories()
      setCategories(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleDelete = async (category) => {
    const confirmed = window.confirm(`Delete "${category.name}"? This cannot be undone.`)
    if (!confirmed) {
      return
    }

    setError(null)
    try {
      await deleteCategory(category.id)
      await loadData()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Categories</h1>
        <Link
          to="/categories/new"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Add New
        </Link>
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-6 text-center text-sm text-slate-500 shadow-sm">
          Loading categories...
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 font-medium text-slate-600">Name</th>
                <th className="px-4 py-3 font-medium text-slate-600">Color</th>
                <th className="px-4 py-3 font-medium text-slate-600">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {categories.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-slate-500">
                    No categories yet.
                  </td>
                </tr>
              )}
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-900">{category.name}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-2 text-slate-700">
                      <span
                        className="h-3 w-3 rounded-full border border-slate-300"
                        style={{ backgroundColor: category.color }}
                      />
                      {category.color}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleDelete(category)}
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

export default CategoriesPage
