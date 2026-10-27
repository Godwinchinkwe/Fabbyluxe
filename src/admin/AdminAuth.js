import React, { createContext, useContext, useState } from 'react';
import { apiRequest } from '../services/api';

const AdminAuthContext = createContext(null);
export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    try { return JSON.parse(localStorage.getItem('shophub_admin') || 'null'); } catch { return null; }
  });

  const login = async (email, password) => {
    const data = await apiRequest('/admin/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    localStorage.setItem('shophub_admin_token', data.token);
    localStorage.setItem('shophub_admin', JSON.stringify(data.admin));
    setAdmin(data.admin);
  };
  const logout = () => {
    localStorage.removeItem('shophub_admin_token');
    localStorage.removeItem('shophub_admin');
    setAdmin(null);
  };
  return <AdminAuthContext.Provider value={{ admin, login, logout, isAuthenticated: Boolean(admin) }}>{children}</AdminAuthContext.Provider>;
};
