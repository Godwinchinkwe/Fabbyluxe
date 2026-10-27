import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiBox, FiGrid, FiLogOut, FiPlus, FiShoppingBag } from 'react-icons/fi';
import { useAdminAuth } from '../AdminAuth';
import './Admin.css';

const AdminShell = ({ children }) => {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/admin/login'); };
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand"><FiShoppingBag /><span>FABBY-LUXE Admin</span></div>
        <nav>
          <NavLink to="/admin" end><FiGrid /> Dashboard</NavLink>
          <NavLink to="/admin/products"><FiBox /> Products</NavLink>
          <NavLink to="/admin/products/new"><FiPlus /> Add Product</NavLink>
          <NavLink to="/admin/categories"><FiGrid /> Categories</NavLink>
        </nav>
        <button className="admin-logout" onClick={handleLogout}><FiLogOut /> Logout</button>
      </aside>
      <section className="admin-main">
        <header className="admin-topbar">
          <div><strong>Store Management</strong><span>Manage your online store without editing code.</span></div>
          <div className="admin-user">{admin?.name || 'Administrator'}</div>
        </header>
        <main className="admin-content">{children}</main>
      </section>
    </div>
  );
};
export default AdminShell;
