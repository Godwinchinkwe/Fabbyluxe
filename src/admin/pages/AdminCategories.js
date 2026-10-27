
import React, { useEffect, useState } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiCheck, FiX } from 'react-icons/fi';
import { apiRequest } from '../../services/api';
import '../components/Admin.css';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState('');
  const [editingName, setEditingName] = useState('');
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await apiRequest('/categories');
      console.log('Categories API response:', data);

      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.categories)
          ? data.categories
          : [];

      console.log('Categories loaded:', list);
      setCategories(list);
    } catch (err) {
      console.error('Category loading failed:', err);
      setCategories([]);
      setError(err.message || 'Could not load categories.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setBusy(true);

    try {
      await apiRequest('/categories', {
        method: 'POST',
        body: JSON.stringify({ name: name.trim() }),
      });

      setName('');
      await load();
    } catch (err) {
      alert(err.message);
    } finally {
      setBusy(false);
    }
  };

  const saveEdit = async (id) => {
    if (!editingName.trim()) return;

    try {
      await apiRequest(`/categories/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ name: editingName.trim() }),
      });

      setEditingId('');
      setEditingName('');
      await load();
    } catch (err) {
      alert(err.message);
    }
  };

  const remove = async (category) => {
    if (
      !window.confirm(
        `Delete "${category.name}"? Its products will be kept and marked Uncategorized.`
      )
    ) {
      return;
    }

    try {
      await apiRequest(`/categories/${category._id}`, {
        method: 'DELETE',
      });

      await load();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <h1>Categories</h1>
          <p>Create and organize the categories shown in your store.</p>
        </div>
      </div>

      <div className="category-manager-grid">
        <section className="admin-panel">
          <h2>Add Category</h2>

          <form onSubmit={add} className="category-add-form">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Handbags"
              required
              maxLength={80}
            />

            <button className="admin-primary-btn" disabled={busy}>
              <FiPlus /> {busy ? 'Adding...' : 'Add'}
            </button>
          </form>
        </section>

        <section className="admin-panel">
          <h2>Current Categories</h2>

          <div className="category-list">
            {loading ? (
              <p>Loading categories...</p>
            ) : error ? (
              <div>
                <p role="alert">{error}</p>
                <button type="button" onClick={load}>
                  Retry
                </button>
              </div>
            ) : categories.length === 0 ? (
              <p className="empty-cell">
                No categories returned by the API. Check the API response
                in the browser console.
              </p>
            ) : (
              categories.map((category) => (
                <div className="category-row" key={category._id || category.slug || category.name}>
                  <div className="category-row-content">
                    {editingId === category._id ? (
                      <form
                        className="category-edit-form"
                        onSubmit={(e) => {
                          e.preventDefault();
                          saveEdit(category._id);
                        }}
                      >
                        <input
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          autoFocus
                          required
                          maxLength={80}
                        />

                        <button type="submit" title="Save">
                          <FiCheck />
                        </button>

                        <button
                          type="button"
                          title="Cancel"
                          onClick={() => {
                            setEditingId('');
                            setEditingName('');
                          }}
                        >
                          <FiX />
                        </button>
                      </form>
                    ) : (
                      <>
                        <strong>{category.name}</strong>
                        <small>{category.slug}</small>
                      </>
                    )}
                  </div>

                  {editingId !== category._id && category._id && (
  <div className="row-actions">
    <button
      type="button"
      onClick={() => {
        setEditingId(category._id);
        setEditingName(category.name);
      }}
      title="Edit category"
    >
      <FiEdit2 />
    </button>

    <button
      type="button"
      onClick={() => remove(category)}
      title="Delete category"
    >
      <FiTrash2 />
    </button>
  </div>
)}

{!category._id && (
  <small className="category-source-label">
    Product category
  </small>
)}
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminCategories;
