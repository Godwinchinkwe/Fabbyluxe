import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiMail, FiShoppingBag } from 'react-icons/fi';
import { useAdminAuth } from '../AdminAuth';
import '../components/Admin.css';

const AdminLogin = () => {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async e => {
    e.preventDefault(); setError(''); setBusy(true);
    try { await login(form.email, form.password); navigate('/admin'); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };
  return <div className="admin-login-page">
    <form className="admin-login-card" onSubmit={submit}>
      <div className="login-logo"><FiShoppingBag /></div>
      <h1>FABBY-LUXE Admin</h1><p>Sign in to manage your products.</p>
      {error && <div className="admin-error">{error}</div>}
      <label><span>Email</span><div className="input-icon"><FiMail /><input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="admin@example.com" /></div></label>
      <label><span>Password</span><div className="input-icon"><FiLock /><input type="password" required value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="••••••••" /></div></label>
      <button className="admin-primary-btn" disabled={busy}>{busy ? 'Signing in...' : 'Sign In'}</button>
    </form>
  </div>;
};
export default AdminLogin;
