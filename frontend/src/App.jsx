import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ExpensesPage from './pages/ExpensesPage'
import AddExpensePage from './pages/AddExpensePage'
import CategoriesPage from './pages/CategoriesPage'
import AddCategoryPage from './pages/AddCategoryPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="expenses" element={<ExpensesPage />} />
          <Route path="expenses/new" element={<AddExpensePage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="categories/new" element={<AddCategoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
