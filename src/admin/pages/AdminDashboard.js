import React, { useEffect, useState } from 'react';
import { FiBox, FiCheckCircle, FiEdit3, FiPlusCircle } from 'react-icons/fi';
import { apiRequest } from '../../services/api';
import { Link } from 'react-router-dom';
import '../components/Admin.css';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => { apiRequest('/admin/products').then(d => setProducts(d.products)).catch(() => {}); }, []);
  const published = products.filter(p => p.status === 'published').length;
  const out = products.filter(p => Number(p.stock) <= 0).length;
  const featured = products.filter(p => p.featured).length;
  return <div>
    <div className="admin-page-heading"><div><h1>Dashboard</h1><p>Keep your store products up to date.</p></div><Link to="/admin/products/new" className="admin-primary-btn"><FiPlusCircle /> Add Product</Link></div>
    <div className="admin-stat-grid">
      <div className="admin-stat"><FiBox /><div><span>Total Products</span><strong>{products.length}</strong></div></div>
      <div className="admin-stat"><FiCheckCircle /><div><span>Published</span><strong>{published}</strong></div></div>
      <div className="admin-stat"><FiEdit3 /><div><span>Featured</span><strong>{featured}</strong></div></div>
      <div className="admin-stat"><FiBox /><div><span>Out of Stock</span><strong>{out}</strong></div></div>
    </div>
    <div className="admin-panel"><div className="admin-panel-header"><h2>Recently Added</h2><Link to="/admin/products">View all</Link></div>
      <div className="admin-table-wrap"><table><thead><tr><th>Product</th><th>Price</th><th>Stock</th><th>Status</th></tr></thead><tbody>
      {products.slice(0, 5).map(p => <tr key={p._id}><td><div className="admin-product-cell"><img src={p.image} alt="" /><span>{p.name}</span></div></td><td>₦{Number(p.price).toLocaleString()}</td><td>{p.stock}</td><td><span className={`status-pill ${p.status}`}>{p.status}</span></td></tr>)}
      {!products.length && <tr><td colSpan="4" className="empty-cell">No products yet.</td></tr>}
      </tbody></table></div>
    </div>
  </div>;
};
export default AdminDashboard;
