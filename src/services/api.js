
const API_BASE_URL = (
  process.env.REACT_APP_API_URL ||
  "https://fabbyserver.onrender.com/api"
).replace(/\/+$/, "");

export const apiRequest = async (path, options = {}) => {
  const token = localStorage.getItem("shophub_admin_token");
  const headers = { ...(options.headers || {}) };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (
    options.body &&
    !(options.body instanceof FormData) &&
    !headers["Content-Type"]
  ) {
    headers["Content-Type"] = "application/json";
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  const response = await fetch(`${API_BASE_URL}${normalizedPath}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Request failed (${response.status})`);
  }

  return data;
};

export const getProducts = async (params = "") =>
  apiRequest(`/products${params}`);

export const getProduct = async (id) =>
  apiRequest(`/products/${id}`);

export const getCategories = async () =>
  apiRequest("/categories");

export { API_BASE_URL };
