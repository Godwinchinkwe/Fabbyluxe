import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../AdminAuth';
import AdminShell from './AdminShell';

const AdminProtected = ({ children }) => {
  const { isAuthenticated } = useAdminAuth();
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return <AdminShell>{children}</AdminShell>;
};
export default AdminProtected;
