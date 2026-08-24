const sampleExpenses = [
  { id: 1, transaction_date: '2026-08-01', description: 'Groceries', category: 'Food', amount: 84.32, notes: '' },
  { id: 2, transaction_date: '2026-08-05', description: 'Electric bill', category: 'Utilities', amount: 120.5, notes: 'Higher than usual due to AC' },
  { id: 3, transaction_date: '2026-08-12', description: 'Movie tickets', category: 'Entertainment', amount: 32.0, notes: '' },
]

function ExpensesPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Expenses</h1>
        <button
          type="button"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Add New
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 font-medium text-slate-600">Date</th>
              <th className="px-4 py-3 font-medium text-slate-600">Description</th>
              <th className="px-4 py-3 font-medium text-slate-600">Category</th>
              <th className="px-4 py-3 font-medium text-slate-600">Amount</th>
              <th className="px-4 py-3 font-medium text-slate-600">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {sampleExpenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-slate-700">{expense.transaction_date}</td>
                <td className="px-4 py-3 text-slate-900">{expense.description}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                    {expense.category}
                  </span>
                </td>
                <td className="px-4 py-3 font-medium text-slate-900">${expense.amount.toFixed(2)}</td>
                <td className="px-4 py-3 text-slate-500">{expense.notes || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ExpensesPage
