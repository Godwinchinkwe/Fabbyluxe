import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiPlus, FiSearch, FiTrash2, FiDownloadCloud } from 'react-icons/fi';
import { apiRequest } from '../../services/api';
import { productsDatabase } from '../../data/productsDatabase';
import '../components/Admin.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const d = await apiRequest(`/admin/products?status=${status}${search ? `&search=${encodeURIComponent(search)}` : ''}`);
      setProducts(d.products || []);
    } catch (e) { alert(e.message); }
    finally { setLoading(false); }
  }, [search, status]);

  useEffect(() => { load(); }, [load]);

  const remove = async id => {
    if (!window.confirm('Remove this product from the public store?')) return;
    try { await apiRequest(`/admin/products/${id}`, { method: 'DELETE' }); await load(); }
    catch (e) { alert(e.message); }
  };

  const importLegacy = async () => {
    if (!window.confirm(`Import the ${productsDatabase.length} products currently hardcoded in your website into MongoDB? Existing matching products will be skipped.`)) return;
    setImporting(true);
    try {
      const legacyProducts = productsDatabase.map(p => ({
        name: p.name,
        category: p.category || 'uncategorized',
        price: p.price,
        oldPrice: p.oldPrice ?? null,
        image: typeof p.image === 'string' ? p.image : '',
        description: p.description || '',
        rating: p.rating || 0,
        reviews: p.reviews || 0,
        inStock: p.inStock !== false,
        stock: p.stock ?? (p.inStock === false ? 0 : 10),
        badge: ['new', 'sale', 'bestseller'].includes(p.badge) ? p.badge : 'none',
        featured: Boolean(p.featured),
        specifications: p.specifications || {}
      }));
      const result = await apiRequest('/admin/products/import-legacy', {
        method: 'POST', body: JSON.stringify({ products: legacyProducts })
      });
      alert(result.message || 'Import complete.');
      await load();
    } catch (e) { alert(e.message); }
    finally { setImporting(false); }
  };

  return <div>
    <div className="admin-page-heading">
      <div><h1>Products</h1><p>Add, edit, publish and manage stock.</p></div>
      <div className="admin-heading-actions">
        <button className="admin-secondary-btn" onClick={importLegacy} disabled={importing}>
          <FiDownloadCloud /> {importing ? 'Importing...' : 'Import Existing Products'}
        </button>
        <Link to="/admin/products/new" className="admin-primary-btn"><FiPlus /> Add Product</Link>
      </div>
    </div>
    <p className="admin-help-text">Import your existing hardcoded catalogue once to move it into the database. Matching products are skipped on later imports.</p>
    <div className="admin-toolbar">
      <div className="admin-search"><FiSearch /><input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && load()} placeholder="Search products..." /></div>
      <select value={status} onChange={e => setStatus(e.target.value)}><option value="all">All statuses</option><option value="published">Published</option><option value="draft">Draft</option></select>
    </div>
    <div className="admin-panel"><div className="admin-table-wrap"><table><thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead><tbody>
      {loading ? <tr><td colSpan="6" className="empty-cell">Loading...</td></tr> : products.map(p => <tr key={p._id}>
        <td><div className="admin-product-cell"><img src={p.image || p.images?.[0] || ''} alt="" /><span>{p.name}</span></div></td>
        <td>{p.category === 'uncategorized' ? 'Uncategorized' : p.category}</td>
        <td>₦{Number(p.price).toLocaleString()}</td><td>{p.stock ?? 0}</td>
        <td><span className={`status-pill ${p.status || (p.active ? 'published' : 'draft')}`}>{p.status || (p.active ? 'published' : 'draft')}</span></td>
        <td><div className="row-actions"><Link to={`/admin/products/edit/${p._id}`} title="Edit"><FiEdit2 /></Link><button onClick={() => remove(p._id)} title="Remove"><FiTrash2 /></button></div></td>
      </tr>)}
      {!loading && !products.length && <tr><td colSpan="6" className="empty-cell">No products found.</td></tr>}
    </tbody></table></div></div>
  </div>;
};
export default AdminProducts;
