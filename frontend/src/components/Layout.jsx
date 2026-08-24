import { NavLink, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/expenses">Expenses</NavLink>
        <NavLink to="/categories">Categories</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
