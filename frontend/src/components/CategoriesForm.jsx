import { useState } from 'react'
import { createCategory, updateCategory } from '../api/client'

function CategoriesForm({ category, onCancel, onSuccess }) {
  const isEditMode = Boolean(category)

  const [formData, setFormData] = useState({
    name: category?.name ?? '',
    color: category?.color ?? '#3b82f6',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      if (isEditMode) {
        await updateCategory(category.id, formData)
      } else {
        await createCategory(formData)
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
      <h2 className="text-lg font-semibold text-slate-900">{isEditMode ? 'Edit Category' : 'Add Category'}</h2>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">{error}</div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="color" className="block text-sm font-medium text-slate-700">
          Color
        </label>
        <div className="mt-1 flex items-center gap-3">
          <input
            id="color"
            name="color"
            type="color"
            required
            value={formData.color}
            onChange={handleChange}
            className="h-9 w-14 rounded-md border border-slate-300"
          />
          <span className="text-sm text-slate-500">{formData.color}</span>
        </div>
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
          {submitting ? 'Saving...' : isEditMode ? 'Save Changes' : 'Add Category'}
        </button>
      </div>
    </form>
  )
}

export default CategoriesForm
