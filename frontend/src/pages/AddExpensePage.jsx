import { useNavigate } from 'react-router-dom'
import ExpensesForm from '../components/ExpensesForm'

function AddExpensePage() {
  const navigate = useNavigate()

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">Add Expense</h1>
      <ExpensesForm onCancel={() => navigate('/expenses')} />
    </div>
  )
}

export default AddExpensePage
