import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiImage, FiUpload, FiX } from "react-icons/fi";
import { apiRequest } from "../../services/api";
import "../components/Admin.css";

const empty = {
  name: "",
  category: "uncategorized",
  price: "",
  oldPrice: "",
  description: "",
  stock: 0,
  badge: "none",
  featured: false,
  status: "published",
  image: "",
  images: [],
  sizes: "",
  colors: "",
  newArrival: false,
  bestSeller: false,
  inStock: true,
};
const ProductForm = () => {
  const { id } = useParams();
  const edit = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [categories, setCategories] = useState([]);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(edit);

  useEffect(() => {
    apiRequest("/categories")
  .then((data) => {
    const receivedCategories = Array.isArray(data)
      ? data
      : Array.isArray(data?.categories)
        ? data.categories
        : [];

    setCategories(receivedCategories);
  })
  .catch((error) => {
    console.error("Failed to load categories:", error);
    setCategories([]);
  });
  
    if (edit)

      apiRequest(`/admin/products/${id}`)
        .then((d) => setForm({ ...empty, ...d.product,
        sizes: Array.isArray(d.product.sizes) ? d.product.sizes.join(", ") : (d.product.sizes || ""),
        colors: Array.isArray(d.product.colors) ? d.product.colors.join(", ") : (d.product.colors || ""),
        oldPrice: d.product.oldPrice ?? d.product.compareAtPrice ?? "",
        images: Array.isArray(d.product.images) && d.product.images.length ? d.product.images : (d.product.image ? [d.product.image] : [])
      }))
        .catch((e) => alert(e.message))
        .finally(() => setLoading(false));
  }, [id, edit]);
  const change = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };
  const upload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      const uploaded = [];
      for (const file of files) {
        if (file.size > 5 * 1024 * 1024) throw new Error(`${file.name} is larger than 5MB.`);
        const dataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(new Error(`Could not read ${file.name}.`));
          reader.readAsDataURL(file);
        });
        const d = await apiRequest("/admin/products/upload", {
          method: "POST",
          body: JSON.stringify({ imageData: dataUrl, fileName: file.name, mimeType: file.type })
        });
        uploaded.push(d.url);
      }
      setForm((f) => {
        const images = [...(f.images || []), ...uploaded];
        return { ...f, images, image: f.image || images[0] || "" };
      });
      e.target.value = "";
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };
  const submit = async (e) => {
    e.preventDefault();
    if (!form.image) {
      alert("Please upload a product image.");
      return;
    }
    setBusy(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        oldPrice: form.oldPrice === "" ? null : Number(form.oldPrice),
        stock: Number(form.stock),
        sizes: String(form.sizes || "").split(",").map(v => v.trim()).filter(Boolean),
        colors: String(form.colors || "").split(",").map(v => v.trim()).filter(Boolean),
        images: form.images?.length ? form.images : (form.image ? [form.image] : []),
        inStock: Number(form.stock) > 0 && form.inStock,
      };
      await apiRequest(edit ? `/admin/products/${id}` : "/admin/products", {
        method: edit ? "PATCH" : "POST",
        body: JSON.stringify(payload),
      });
      navigate("/admin/products");
    } catch (err) {
      alert(err.message);
    } finally {
      setBusy(false);
    }
  };
  if (loading) return <div className="admin-loading">Loading product...</div>;
  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <Link className="back-link" to="/admin/products">
            <FiArrowLeft /> Back to Products
          </Link>
          <h1>{edit ? "Edit Product" : "Add Product"}</h1>
          <p>
            {edit
              ? "Update the product details below."
              : "Add a new product to your store."}
          </p>
        </div>
      </div>
      <form className="product-form" onSubmit={submit}>
        <div className="form-main">
          <section className="admin-panel">
            <h2>Product Information</h2>
            <div className="form-grid">
              <label className="full">
                <span>Product name</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={change}
                  required
                  placeholder="e.g. Geneva Luxury Watch"
                />
              </label>
              <label>
                <span>Category</span>
                <select name="category" value={form.category} onChange={change}>
                  <option value="uncategorized">Uncategorized</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>Price (₦)</span>
                <input
                  type="number"
                  min="0"
                  name="price"
                  value={form.price}
                  onChange={change}
                  required
                  placeholder="18000"
                />
              </label>
              <label>
                <span>Old price (₦)</span>
                <input
                  type="number"
                  min="0"
                  name="oldPrice"
                  value={form.oldPrice ?? ""}
                  onChange={change}
                  placeholder="24000"
                />
              </label>
              <label>
                <span>Stock quantity</span>
                <input
                  type="number"
                  min="0"
                  name="stock"
                  value={form.stock}
                  onChange={change}
                />
              </label>
              <label>
                <span>Sizes (comma-separated)</span>
                <input name="sizes" value={form.sizes} onChange={change} placeholder="S, M, L, XL" />
              </label>
              <label>
                <span>Colours (comma-separated)</span>
                <input name="colors" value={form.colors} onChange={change} placeholder="Black, Gold, Brown" />
              </label>
              <label>
                <span>Badge</span>
                <select name="badge" value={form.badge} onChange={change}>
                  <option value="none">None</option>
                  <option value="new">New</option>
                  <option value="sale">Sale</option>
                  <option value="bestseller">Bestseller</option>
                </select>
              </label>
              <label className="full">
                <span>Short description</span>
                <textarea
                  name="description"
                  rows="7"
                  value={form.description}
                  onChange={change}
                  required
                  placeholder="Describe the product clearly for customers..."
                />
              </label>
              {(form.images || []).length > 1 && <small>{form.images.length} images attached. The first image is the main product image.</small>}
            </div>
          </section>
          <section className="admin-panel">
            <h2>Product Image</h2>
            <div className="upload-box">
              {form.image ? (
                <div className="image-preview">
                  <img src={form.image} alt="Preview" />
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, image: "", images: [] }))}
                  >
                    <FiX />
                  </button>
                </div>
              ) : (
                <>
                  <FiImage />
                  <strong>Upload product image</strong>
                  <span>Select one or more JPG, PNG or WEBP images (up to 5MB each)</span>
                </>
              )}
              <label className="upload-btn">
                <FiUpload />
                {uploading
                  ? "Uploading..."
                  : form.image
                    ? "Change image"
                    : "Choose image"}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  multiple
                  onChange={upload}
                  disabled={uploading}
                />
              </label>
            </div>
          </section>
        </div>
        <aside className="form-side">
          <section className="admin-panel">
            <h2>Publishing</h2>
            <label>
              <span>Status</span>
              <select name="status" value={form.status} onChange={change}>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </label>
            <label className="check-row">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={change}
              />
              <span>Feature this product on the homepage</span>
            </label>
            <div className="inline-checks">
              <label><input type="checkbox" name="newArrival" checked={Boolean(form.newArrival)} onChange={change} /> New arrival</label>
              <label><input type="checkbox" name="bestSeller" checked={Boolean(form.bestSeller)} onChange={change} /> Best seller</label>
              <label><input type="checkbox" name="inStock" checked={Boolean(form.inStock)} onChange={change} /> In stock</label>
            </div>
          </section>
          <div className="form-actions">
            <Link to="/admin/products" className="admin-secondary-btn">
              Cancel
            </Link>
            <button className="admin-primary-btn" disabled={busy || uploading}>
              {busy
                ? edit
                  ? "Saving..."
                  : "Publishing..."
                : edit
                  ? "Save Changes"
                  : "Publish Product"}
            </button>
          </div>
        </aside>
      </form>
    </div>
  );
};
export default ProductForm;
