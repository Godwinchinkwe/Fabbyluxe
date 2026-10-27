const API_BASE_URL = (
  process.env.REACT_APP_API_URL || 'https://fabbyserver.onrender.com/api','http://localhost:5000/api'
).replace(/\/$/, '');

export const apiRequest = async (path, options = {}) => {
  const token = localStorage.getItem('shophub_admin_token');
  const headers = { ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  if (!(options.body instanceof FormData)) headers['Content-Type'] = 'application/json';

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || `Request failed (${response.status})`);
  return data;
};

export const getProducts = async (params = '') => apiRequest(`/products${params}`);
export const getProduct = async (id) => apiRequest(`/products/${id}`);
export const getCategories = async () => apiRequest('/categories');
export { API_BASE_URL };
