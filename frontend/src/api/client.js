const BASE_URL = 'http://localhost:8001'

class ApiError extends Error {
  constructor(message, status, body) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (response.status === 204) {
    return null
  }

  const isJson = response.headers.get('content-type')?.includes('application/json')
  const body = isJson ? await response.json() : await response.text()

  if (!response.ok) {
    const message = (isJson && body?.detail) || response.statusText || 'Request failed'
    throw new ApiError(message, response.status, body)
  }

  return body
}

export function listExpenses(params = {}) {
  const query = new URLSearchParams()
  if (params.categoryId !== undefined && params.categoryId !== null && params.categoryId !== '') {
    query.set('category_id', params.categoryId)
  }
  const queryString = query.toString()
  return request(`/api/expenses${queryString ? `?${queryString}` : ''}`)
}

export function getExpense(id) {
  return request(`/api/expenses/${id}`)
}

export function createExpense(data) {
  return request('/api/expenses', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function updateExpense(id, data) {
  return request(`/api/expenses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function deleteExpense(id) {
  return request(`/api/expenses/${id}`, {
    method: 'DELETE',
  })
}

export function listCategories() {
  return request('/api/categories')
}

export function getCategory(id) {
  return request(`/api/categories/${id}`)
}

export function createCategory(data) {
  return request('/api/categories', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function updateCategory(id, data) {
  return request(`/api/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function deleteCategory(id) {
  return request(`/api/categories/${id}`, {
    method: 'DELETE',
  })
}

export { ApiError, request }
