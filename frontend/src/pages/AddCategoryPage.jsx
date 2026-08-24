import { useNavigate } from 'react-router-dom'
import CategoriesForm from '../components/CategoriesForm'

function AddCategoryPage() {
  const navigate = useNavigate()

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">Add Category</h1>
      <CategoriesForm onCancel={() => navigate('/categories')} />
    </div>
  )
}

export default AddCategoryPage
