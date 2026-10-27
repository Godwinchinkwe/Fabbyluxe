import React, { useMemo, useState, useEffect, useCallback, } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { CartProvider, useCart } from "./context/CartContext";
import {
  FaBagShopping,
  FaHeart,
  FaMagnifyingGlass,
  FaBars,
  FaArrowRight,
  FaStar,
  FaRegHeart,
  FaXmark,
  FaWhatsapp,
  FaTruckFast,
  FaShieldHalved,
  FaRotateLeft,
} from "react-icons/fa6";

import "./App.css";
import { AdminAuthProvider } from "./admin/AdminAuth";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminProducts from "./admin/pages/AdminProducts";
import AdminCategories from "./admin/pages/AdminCategories";
import ProductForm from "./admin/pages/ProductForm";
import AdminProtected from "./admin/components/AdminProtected";

const WA = "2347062760201";
const money = (n) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Number(n) || 0);

const API_BASE_URL = (process.env.REACT_APP_API_URL || "http://localhost:5000/api").replace(/\/$/, "");

function useCatalogue() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch(`${API_BASE_URL}/products?limit=200`).then(r => { if (!r.ok) throw new Error("Products could not be loaded"); return r.json(); }),
      fetch(`${API_BASE_URL}/categories`).then(r => { if (!r.ok) throw new Error("Categories could not be loaded"); return r.json(); })
    ]).then(([productData, categoryData]) => {
      if (cancelled) return;

      const cats = Array.isArray(categoryData)
  ? categoryData
  : Array.isArray(categoryData?.categories)
    ? categoryData.categories
    : [];

      setCategories(cats);
      const categoryNames = new Map(cats.map(c => [String(c.slug).toLowerCase(), c.name]));
      setProducts((productData.products || []).map(p => ({
        ...p,
        id: String(p.id || p._id),
        image: p.image || p.images?.[0] || "",
        oldPrice: p.oldPrice ?? p.compareAtPrice ?? null,
        reviews: p.reviews ?? p.reviewCount ?? 0,
        categoryName: categoryNames.get(String(p.category || "").toLowerCase()) || p.category || "Uncategorized"
      })));
    }).catch(error => {
      console.error("Could not load the store catalogue:", error.message);
      if (!cancelled) { setProducts([]); setCategories([]); }
    });
    return () => { cancelled = true; };
  }, []);
  return { products, categories };
}

function Header() {
  const { categories } = useCatalogue();
  const { getCartCount, wishlistItems } = useCart();
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState(false);
  const nav = useNavigate();
  return (
    <>
      <div className="announcement">
        A little luxury, delivered to you
        <span>✦</span> Lagos, Nigeria
      </div>

      <header className="site-header">
        <button
          className="icon-btn mobile-menu"
          onClick={() => setMenu(!menu)}
          aria-label="Toggle menu"
        >
          {menu ? <FaXmark /> : <FaBars />}
        </button>

        <Link to="/" className="brand">
          FABBY <span>LUXE</span>
          <small>STYLE THAT SPEAKS LUXURY</small>
        </Link>
        <nav className={menu ? "nav open" : "nav"}>
          <Link to="/products">Shop all</Link>

          {categories.map((c) => (
            <Link
              key={c.name}
              to={"/products?category=" + encodeURIComponent(c.slug || c.name)}
            >
              {c.name}
            </Link>
          ))}
          <Link to="/policy">Our policies</Link>
        </nav>
        <form
          className="search"
          onSubmit={(e) => {
            e.preventDefault();
            nav("/products?q=" + encodeURIComponent(search));
            setMenu(false);
          }}
        >
          <FaMagnifyingGlass />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find something beautiful..."
          />
          <button aria-label="Search">
            <FaArrowRight />
          </button>
        </form>
        <div className="header-actions">
          <Link className="icon-btn" to="/account" aria-label="Account">
            ♙
          </Link>
          <Link
            className="icon-btn wishlist-action"
            to="/account"
            aria-label="Wishlist"
          >
            <FaRegHeart />
            <i>{wishlistItems.length}</i>
          </Link>
          <Link
            className="icon-btn bag-action"
            to="/cart"
            aria-label="Shopping bag"
          >
            <FaBagShopping />
            <i>{getCartCount()}</i>
          </Link>
        </div>
      </header>
    </>
  );
}

function ProductCard({ product }) {
  const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } =
    useCart();
  const wished = isInWishlist(product.id);
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Link to={"/product/" + product.id}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80";
            }}
          />
        </Link>
        <span className="product-badge">
          {product.badge === "sale" || product.badge === "sales" || (product.oldPrice && product.oldPrice > product.price)
            ? "SPECIAL PRICE"
            : product.badge === "new" || product.newArrival
              ? "JUST IN"
              : product.bestSeller || product.badge === "bestseller"
                ? "BESTSELLER"
                : "CURATED"}
        </span>
        <button
          className={"heart-btn " + (wished ? "active" : "")}
          onClick={() =>
            wished ? removeFromWishlist(product.id) : addToWishlist(product)
          }
          aria-label="Toggle wishlist"
        >
          {wished ? <FaHeart /> : <FaRegHeart />}
        </button>
        <button className="quick-add" disabled={product.inStock === false || Number(product.stock) <= 0} onClick={() => addToCart(product)}>
          {product.inStock === false || Number(product.stock) <= 0 ? "Out of stock" : <>Add to bag <FaArrowRight /></>}
        </button>
      </div>
      <div className="product-info">
        <div className="product-category">{product.categoryName || product.category || "Uncategorized"}</div>
        <Link to={"/product/" + product.id} className="product-name">
          {product.name}
        </Link>
        <div className="rating">
          <FaStar /> {product.rating || 4.7}{" "}
          <span>({product.reviews || 24})</span>
        </div>
        <div className="product-prices">
          <strong>{money(product.price)}</strong>
          <del>{money(product.oldPrice)}</del>
        </div>
      </div>
    </article>
  );
}
function Home() {
  const { products, categories } = useCatalogue();
  const featured = products.filter(p => p.featured || p.newArrival || p.bestSeller || ["new", "bestseller"].includes(p.badge)).slice(0, 8);
  const homeProducts = featured.length ? featured : products.slice(0, 8);
  return (
    <>
      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span /> THE FABBY LUXE EDIT
            </div>
            <h1>
              Luxury is in
              <br />
              <em>the details.</em>
            </h1>
            <p>
              Pieces that bring your personal style into focus. Discover the
              little luxuries that make every day feel extraordinary.
            </p>
            <div className="hero-buttons">
              <Link className="button button-dark" to="/products">
                Explore the collection <FaArrowRight />
              </Link>
              <Link className="text-link" to="/policy">
                The FABBY promise
              </Link>
            </div>
            <div className="hero-foot">
              <div className="avatar-stack">
                <span>F</span>
                <span>L</span>
                <span>✦</span>
              </div>
              <div>
                <b>Chosen with intention</b>
                <small>Style worth coming back for</small>
              </div>
            </div>
          </div>
          <div className="hero-art">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=90"
              alt="Fashion editorial for Fabby Luxe"
            />
            <div className="floating-note">
              <span>THE NEW MOOD</span>
              <b>
                Quiet confidence.
                <br />
                Unmistakable style.
              </b>
              <Link to="/products">Discover more ↗</Link>
            </div>
            <div className="vertical-label">
              STYLE THAT SPEAKS LUXURY · EST. WITH LOVE
            </div>
          </div>
        </section>
        <section className="trust-strip">
          <div>
            <FaTruckFast />
            <span>
              <b>Delivery or pickup</b>
              <small>Your choice, every time</small>
            </span>
          </div>
          <div>
            <FaShieldHalved />
            <span>
              <b>Secure payment</b>
              <small>Verified payment process</small>
            </span>
          </div>
          <div>
            <FaRotateLeft />
            <span>
              <b>Here to help</b>
              <small>Support when you need it</small>
            </span>
          </div>
        </section>
        <section className="section category-section">
          <div className="section-heading">
            <div>
              <div className="eyebrow">FIND YOUR SIGNATURE</div>
              <h2>
                Shop by <em>category</em>
              </h2>
            </div>
            <Link className="text-link" to="/products">
              View everything <FaArrowRight />
            </Link>
          </div>
          <div className="category-grid">
            {categories.map((c, i) => (
              <Link
                className="category-tile"
                key={c.name}
                to={"/products?category=" + encodeURIComponent(c.slug || c.name)}
              >
                <img src={c.image || "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85"} alt={c.name} />
                <div className="category-overlay">
                  <small>0{i + 1} / COLLECTION</small>
                  <h3>{c.name}</h3>
                  <span>
                    {c.description || "Explore the collection"} <FaArrowRight />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section className="editorial">
          <div className="editorial-image">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1100&q=85"
              alt="Fashion editorial"
            />
          </div>
          <div className="editorial-copy">
            <div className="eyebrow">MORE THAN WHAT YOU WEAR</div>
            <h2>
              Your style.
              <br />
              <em>Your signature.</em>
            </h2>
            <p>
              Thoughtfully selected fashion, bags, shoes and jewellery for the
              way you want to show up in the world. No noise. Just pieces that
              feel like you.
            </p>
            <Link className="button button-outline" to="/products">
              Find your next favourite <FaArrowRight />
            </Link>
            <span className="editorial-mark">FL.</span>
          </div>
        </section>
        <section className="section products-section">
          <div className="section-heading">
            <div>
              <div className="eyebrow">THE PIECES EVERYONE LOVES</div>
              <h2>
                Currently <em>coveted</em>
              </h2>
            </div>
            <Link className="text-link" to="/products">
              Shop all products <FaArrowRight />
            </Link>
          </div>
          <div className="product-grid">
            {homeProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
        <section className="newsletter">
          <div className="eyebrow">A NOTE FROM FABBY LUXE</div>
          <h2>
            Good taste, <em>in your inbox.</em>
          </h2>
          <p>
            Be first to discover new arrivals, special edits and little
            luxuries.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert(
                "Thank you for your interest. Newsletter subscription will be connected during production setup.",
              );
            }}
          >
            <input type="email" required placeholder="Your email address" />
            <button>
              Count me in <FaArrowRight />
            </button>
          </form>
          <small>No clutter. Just the good stuff.</small>
        </section>
      </main>
    </>
  );
}
function Products() {
  const { products, categories } = useCatalogue();

  const loc = useLocation();
const params = new URLSearchParams(loc.search);

const categoryFromUrl = params.get("category") || "All";
const queryFromUrl = params.get("q") || "";

const [query, setQuery] = useState(queryFromUrl);
const [cat, setCat] = useState(categoryFromUrl);
const [sort, setSort] = useState("featured");
const [max, setMax] = useState("");

useEffect(() => {
  setCat(categoryFromUrl);
  setQuery(queryFromUrl);
}, [categoryFromUrl, queryFromUrl]);


  // const [sort, setSort] = useState("featured");
  // const [max, setMax] = useState("");
 const normalizeCategory = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const filtered = useMemo(() => {
  let result = products.filter((p) => {
    const productCategory = normalizeCategory(
      p.category || p.categoryName
    );

    const selectedCategory = normalizeCategory(cat);

    const matchesCategory =
      cat === "All" ||
      productCategory === selectedCategory ||
      normalizeCategory(p.categoryName) === selectedCategory ||
      categories.some(
        (c) =>
          normalizeCategory(c.slug) === selectedCategory &&
          normalizeCategory(c.name) === productCategory
      );

    const matchesQuery =
      `${p.name || ""} ${p.categoryName || ""} ${p.category || ""} ${p.description || ""}`
        .toLowerCase()
        .includes(query.toLowerCase());

    const matchesPrice = !max || Number(p.price) <= Number(max);

    return matchesCategory && matchesQuery && matchesPrice;
  });

  if (sort === "low") result.sort((a, b) => a.price - b.price);
  if (sort === "high") result.sort((a, b) => b.price - a.price);
  if (sort === "rating") {
    result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  return result;
}, [cat, query, sort, max, products, categories]);


  return (
    <main className="catalog-page">
      <div className="catalog-intro">
        <div className="eyebrow">THE COLLECTION</div>
        <h1>
          Find your <em>favourite.</em>
        </h1>
        <p>Considered pieces for everyday elegance.</p>
      </div>
      <div className="catalog-controls">
        <div className="catalog-search">
          <FaMagnifyingGlass />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products"
          />
        </div>
        <select value={cat} onChange={(e) => setCat(e.target.value)}>
          <option>All</option>
          {categories.map((c) => (
            <option key={c._id || c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="featured">Featured</option>
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
          <option value="rating">Top rated</option>
        </select>
        <input
          className="price-filter"
          type="number"
          min="0"
          value={max}
          onChange={(e) => setMax(e.target.value)}
          placeholder="Max price ₦"
        />
      </div>
      <div className="catalog-result">
        <span>{filtered.length} pieces to explore</span>
        <span>CURATED FOR YOU ✦</span>
      </div>
      {filtered.length ? (
        <div className="product-grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No pieces found just yet.</h2>
          <p>Try another search or category.</p>
          <button
            className="button button-dark"
            onClick={() => {
              setQuery("");
              setCat("All");
              setMax("");
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </main>
  );
}
function Product() {
  const { id } = useParams();
  const { products } = useCatalogue();
  const p = products.find((x) => x.id === id || x._id === id);
  const { addToCart, addToWishlist, isInWishlist } = useCart();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  if (!p) return <main className="detail-page"><div className="empty-state"><h2>Loading product...</h2><p>If this product does not appear, return to the collection and try again.</p><Link className="button button-dark" to="/products">Back to products</Link></div></main>;
  return (
    <main className="detail-page">
      <div className="breadcrumbs">
        <Link to="/">Home</Link> / <Link to="/products">Shop</Link> / {p.name}
      </div>
      <div className="detail-layout">
        <div className="detail-image">
          <img src={p.image} alt={p.name} />
        </div>
        <div className="detail-copy">
          <div className="eyebrow">FABBY LUXE / SELECTED PIECE</div>
          <h1>{p.name}</h1>
          <div className="rating">
            <FaStar /> {p.rating || 4.7}{" "}
            <span>({p.reviews || 24} reviews)</span>
          </div>
          <div className="detail-price">
            {money(p.price)} <del>{money(p.oldPrice)}</del>
          </div>
          <p>
            {p.description ||
              "A considered piece to complement your personal style. Selected for its look, feel and versatility."}
          </p>
          <label className="field-label">Style / variant</label>
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="">Standard</option>
            {(p.sizes || []).map(v => <option key={v}>{v}</option>)}
            {(p.colors || []).map(v => <option key={v}>{v}</option>)}
          </select>
          <div className="quantity-row">
            <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
            <b>{qty}</b>
            <button onClick={() => setQty(qty + 1)}>+</button>
          </div>
          <button
            className="button button-dark add-detail"
            disabled={p.inStock === false || Number(p.stock) <= 0}
            onClick={() => {
              addToCart({ ...p, selectedVariant: size }, qty);
              alert("Added to your bag.");
            }}
          >
            {p.inStock === false || Number(p.stock) <= 0 ? "Out of stock" : <>Add to bag — {money(p.price * qty)} <FaArrowRight /></>}
          </button>
          <button
            className="button button-outline add-detail"
            onClick={() => (isInWishlist(p.id) ? null : addToWishlist(p))}
          >
            <FaRegHeart /> Save to wishlist
          </button>
          <div className="detail-assurances">
            <span>
              <FaTruckFast /> Delivery or pickup available
            </span>
            <span>
              <FaShieldHalved /> Secure payment after delivery fee confirmation
            </span>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">YOU MAY ALSO LOVE</div>
            <h2>
              Complete the <em>look</em>
            </h2>
          </div>
        </div>
        <div className="product-grid">
          {products
            .filter((x) => x.id !== p.id)
            .slice(0, 4)
            .map((x) => (
              <ProductCard key={x.id} product={x} />
            ))}
        </div>
      </section>
    </main>
  );
}
function Cart() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  return (
    <main className="inner-page">
      <div className="eyebrow">YOUR EDIT</div>
      <h1>
        Your shopping <em>bag.</em>
      </h1>
      {!cartItems.length ? (
        <div className="empty-state">
          <p>Your bag is waiting for something beautiful.</p>
          <Link className="button button-dark" to="/products">
            Explore the collection <FaArrowRight />
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div>
            {cartItems.map((p) => (
              <div className="cart-row" key={p.id}>
                <img src={p.image} alt={p.name} />
                <div className="cart-row-info">
                  <b>{p.name}</b>
                  <small>{p.category}</small>
                  <strong>{money(p.price)}</strong>
                  <button
                    className="remove-link"
                    onClick={() => removeFromCart(p.id)}
                  >
                    Remove
                  </button>
                </div>
                <div className="quantity-row">
                  <button onClick={() => updateQuantity(p.id, p.quantity - 1)}>
                    −
                  </button>
                  <b>{p.quantity}</b>
                  <button onClick={() => updateQuantity(p.id, p.quantity + 1)}>
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <aside className="summary-card">
            <h3>Order summary</h3>
            <div>
              <span>Subtotal</span>
              <b>{money(getCartTotal())}</b>
            </div>
            <div>
              <span>Delivery</span>
              <span>Confirmed before payment</span>
            </div>
            <div className="summary-total">
              <span>Subtotal</span>
              <b>{money(getCartTotal())}</b>
            </div>
            <p>
              Final delivery fee will be confirmed based on your destination
              before payment.
            </p>
            <Link className="button button-dark full-button" to="/checkout">
              Continue to checkout <FaArrowRight />
            </Link>
            <Link className="text-link" to="/products">
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
function Checkout() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    method: "delivery",
    address: "",
    city: "",
    payment: "paystack",
  });
  const [delivery, setDelivery] = useState("");
  const [sent, setSent] = useState(false);
//   const nav = useNavigate();
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    if (!cartItems.length) return;
    const order = {
      reference: "FL-" + Date.now().toString().slice(-8),
      createdAt: new Date().toISOString(),
      customer: form,
      items: cartItems,
      subtotal: getCartTotal(),
      deliveryFee: form.method === "pickup" ? 0 : Number(delivery) || 0,
      status: "awaiting-confirmation",
      paymentStatus: "pending",
    };
    const old = JSON.parse(localStorage.getItem("fabbyOrders") || "[]");
    localStorage.setItem("fabbyOrders", JSON.stringify([order, ...old]));
    const lines = cartItems
      .map((p) => `${p.name} x${p.quantity} — ${money(p.price * p.quantity)}`)
      .join("\n");
    const msg = `Hello FABBY LUXE, I would like to confirm order ${order.reference}.\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nMethod: ${form.method}\nAddress: ${form.method === "pickup" ? "Pickup at Lagos Port Complex, Apapa" : form.address + ", " + form.city}\nItems:\n${lines}\nSubtotal: ${money(order.subtotal)}\nDelivery fee: ${form.method === "pickup" ? "Pickup" : delivery ? "₦" + Number(delivery).toLocaleString() : "Please confirm"}\nPayment preference: ${form.payment}`;
    if (form.payment === "whatsapp") {
      window.open(
        `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,
        "_blank",
      );
    } else if (form.payment === "paystack") {
      alert(
        "Paystack test checkout is not yet connected to a backend in this starter. Your order is saved as pending; use WhatsApp to confirm or complete backend setup first.",
      );
      window.open(
        `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,
        "_blank",
      );
    } else {
      window.open(
        `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,
        "_blank",
      );
    }
    setSent(true);
    clearCart();
  };
  if (sent)
    return (
      <main className="inner-page">
        <div className="success-panel">
          <div className="eyebrow">THANK YOU</div>
          <h1>
            Your order request is <em>received.</em>
          </h1>
          <p>
            FABBY LUXE will confirm your order, delivery fee and payment
            instructions before dispatch.
          </p>
          <Link className="button button-dark" to="/account">
            View order details
          </Link>
        </div>
      </main>
    );
  return (
    <main className="inner-page">
      <div className="eyebrow">THE LAST STEP</div>
      <h1>
        Complete your <em>order.</em>
      </h1>
      {!cartItems.length ? (
        <div className="empty-state">
          <p>Your bag is empty.</p>
          <Link className="button button-dark" to="/products">
            Shop collection
          </Link>
        </div>
      ) : (
        <form className="checkout-layout" onSubmit={submit}>
          <div className="checkout-form">
            <h2>Contact details</h2>
            <div className="form-grid">
              <input
                required
                name="name"
                value={form.name}
                onChange={change}
                placeholder="Full name"
              />
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={change}
                placeholder="Email address"
              />
              <input
                required
                name="phone"
                value={form.phone}
                onChange={change}
                placeholder="Phone number"
              />
            </div>
            <h2>Delivery preference</h2>
            <div className="choice-row">
              <label>
                <input
                  type="radio"
                  name="method"
                  value="delivery"
                  checked={form.method === "delivery"}
                  onChange={change}
                />{" "}
                Delivery
              </label>
              <label>
                <input
                  type="radio"
                  name="method"
                  value="pickup"
                  checked={form.method === "pickup"}
                  onChange={change}
                />{" "}
                Store pickup
              </label>
            </div>
            {form.method === "delivery" ? (
              <>
                <input
                  required
                  name="address"
                  value={form.address}
                  onChange={change}
                  placeholder="Street address"
                />
                <input
                  required
                  name="city"
                  value={form.city}
                  onChange={change}
                  placeholder="Area / city / state"
                />
                <label className="field-label">
                  Estimated delivery fee (optional; confirm with store)
                </label>
                <input
                  type="number"
                  min="0"
                  value={delivery}
                  onChange={(e) => setDelivery(e.target.value)}
                  placeholder="Fee in ₦ — leave blank if not confirmed"
                />
              </>
            ) : (
              <div className="pickup-note">
                Pickup location: Lagos Port Complex, Apapa. We'll confirm
                collection details with you.
              </div>
            )}
            <h2>Payment method</h2>
            <div className="payment-options">
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="paystack"
                  checked={form.payment === "paystack"}
                  onChange={change}
                />{" "}
                Paystack (test integration pending)
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={form.payment === "bank"}
                  onChange={change}
                />{" "}
                Bank transfer — details confirmed by store
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="whatsapp"
                  checked={form.payment === "whatsapp"}
                  onChange={change}
                />{" "}
                Confirm via WhatsApp
              </label>
            </div>
            <p className="fine-print">
              Online orders must be paid for before dispatch. We confirm the
              final delivery fee and payment instructions before collecting
              payment.
            </p>
            <button className="button button-dark full-button">
              Submit order request <FaArrowRight />
            </button>
          </div>
          <aside className="summary-card">
            <h3>Your pieces</h3>
            {cartItems.map((p) => (
              <div className="mini-order" key={p.id}>
                <img src={p.image} alt="" />
                <span>
                  {p.name}
                  <small>Qty {p.quantity}</small>
                </span>
                <b>{money(p.price * p.quantity)}</b>
              </div>
            ))}
            <div className="summary-total">
              <span>Subtotal</span>
              <b>{money(getCartTotal())}</b>
            </div>
            <p>
              Delivery:{" "}
              {form.method === "pickup"
                ? "Free store pickup"
                : delivery
                  ? money(delivery)
                  : "To be confirmed"}
            </p>
            <small>
              Final total is confirmed after delivery fee is agreed.
            </small>
          </aside>
        </form>
      )}
    </main>
  );
}
function Account() {
  const { wishlistItems, removeFromWishlist } = useCart();
  const [orders] = useState(() =>
    JSON.parse(localStorage.getItem("fabbyOrders") || "[]"),
  );
  return (
    <main className="inner-page">
      <div className="eyebrow">YOUR FABBY LUXE</div>
      <h1>
        Your style, <em>your space.</em>
      </h1>
      <p className="page-lede">
        Your saved pieces and recent order requests are shown on this device.
      </p>
      <section className="account-section">
        <h2>Recent order requests</h2>
        {orders.length ? (
          orders.map((o) => (
            <div className="order-card" key={o.reference}>
              <b>{o.reference}</b>
              <span>{new Date(o.createdAt).toLocaleDateString()}</span>
              <span>{o.status}</span>
              <strong>{money(o.subtotal)}</strong>
            </div>
          ))
        ) : (
          <p>No orders yet. Your order requests will appear here.</p>
        )}
      </section>
      <section className="account-section">
        <h2>Your wishlist ({wishlistItems.length})</h2>
        {wishlistItems.length ? (
          <div className="product-grid">
            {wishlistItems.map((p) => (
              <div key={p.id}>
                <ProductCard product={p} />
                <button
                  className="remove-link"
                  onClick={() => removeFromWishlist(p.id)}
                >
                  Remove from wishlist
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>Save pieces you love and they will appear here.</p>
        )}
      </section>
    </main>
  );
}
function Policy() {
  return (
    <main className="inner-page policy-page">
      <div className="eyebrow">THE FABBY PROMISE</div>
      <h1>
        Delivery & <em>payment policy.</em>
      </h1>
      <p className="page-lede">Style That Speaks Luxury.</p>
      {[
        [
          "Payment",
          "We accept bank transfers, POS payments, and approved electronic payment methods. Online orders must be paid for before dispatch.",
        ],
        [
          "Delivery",
          "Customers may choose store pickup or delivery to their preferred address. Delivery fees depend on the destination and will be communicated before payment is completed.",
        ],
        [
          "Order processing",
          "Orders will be processed after payment confirmation. Delivery timelines will be communicated to customers at the point of purchase.",
        ],
        [
          "Returns & exchanges",
          "Customers should report damaged, defective, or incorrect items promptly. Exchanges are subject to our store policy and product availability.",
        ],
        [
          "Customer service",
          "We are committed to providing a smooth, secure, and satisfying shopping experience.",
        ],
      ].map(([h, p]) => (
        <section key={h}>
          <h2>{h}</h2>
          <p>{p}</p>
        </section>
      ))}
      <p>Thank you for shopping with FABBY LUXE.</p>
      <a
        className="button button-dark"
        href={`https://wa.me/${WA}?text=${encodeURIComponent("Hello FABBY LUXE, I have a question about your delivery and payment policy.")}`}
      >
        Contact customer service <FaWhatsapp />
      </a>
    </main>
  );
}
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div>
          <Link to="/" className="brand footer-brand">
            FABBY <span>LUXE</span>
            <small>STYLE THAT SPEAKS LUXURY</small>
          </Link>
          <p>
            Thoughtful details. Everyday confidence.
            <br />
            Luxury that feels like you.
          </p>
          <a className="social-link" href={`https://wa.me/${WA}`}>
            <FaWhatsapp /> WhatsApp us
          </a>
        </div>
        <div>
          <b>EXPLORE</b>
          <Link to="/products">Shop all</Link>
          <Link to="/products?category=Fashion%20%26%20Accessories">
            Fashion & Accessories
          </Link>
          <Link to="/products?category=Shoes%20%26%20Bags">Shoes & Bags</Link>
          <Link to="/products?category=Jewellery">Jewellery</Link>
        </div>
        <div>
          <b>WE'RE HERE TO HELP</b>
          <Link to="/policy">Delivery & payment policy</Link>
          <Link to="/account">Your account</Link>
          <a href="mailto:Agbafabby@outlook.com">Agbafabby@outlook.com</a>
          <span>Lagos Port Complex, Apapa</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} FABBY LUXE. All rights reserved.
        </span>
        <span>
          STYLE THAT SPEAKS LUXURY <i>✦</i> MADE FOR YOU
        </span>
      </div>
    </footer>
  );
}

export function AdminPanel() {
  const [token, setToken] = useState(
    localStorage.getItem("fabbyAdminToken") || "",
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [productsAdmin, setProductsAdmin] = useState([]);
  const [ordersAdmin, setOrdersAdmin] = useState([]);
  const [tab, setTab] = useState("products");
  const [form, setForm] = useState({
    name: "",
    category: "Fashion & Accessories",
    price: "",
    stock: "",
    description: "",
    image: "",
  });




//   const api = (
//     process.env.REACT_APP_API_URL || "http://localhost:5000/api"
//   ).replace(/\/$/, "");
//   const request = async (path, opts = {}) => {
//     const r = await fetch(api + path, {
//       ...opts,
//       headers: {
//         "Content-Type": "application/json",
//         ...(token ? { Authorization: "Bearer " + token } : {}),
//         ...(opts.headers || {}),
//       },
//     });
//     const d = await r.json().catch(() => ({}));
//     if (!r.ok) throw new Error(d.message || "Request failed");
//     return d;
//   };
//   const load = async () => {
//     try {
//       const [p, o] = await Promise.all([
//         request("/products?limit=200"),
//         request("/admin/orders"),
//       ]);
//       setProductsAdmin(p.products || []);
//       setOrdersAdmin(o.orders || []);
//       setError("");
//     } catch (e) {
//       setError(e.message);
//     }
//   };
//   useEffect(() => {
//     if (token) load();
//   }, [token]);


const api = (
  process.env.REACT_APP_API_URL ||
  "https://fabbyserver.onrender.com/api"
).replace(/\/$/, "");

const request = useCallback(
  async (path, opts = {}) => {
    const r = await fetch(api + path, {
      ...opts,
      headers: {
        "Content-Type": "application/json",
        ...(token
          ? { Authorization: "Bearer " + token }
          : {}),
        ...(opts.headers || {}),
      },
    });

    const d = await r.json().catch(() => ({}));

    if (!r.ok) {
      throw new Error(d.message || "Request failed");
    }

    return d;
  },
  [api, token]
);

const load = useCallback(async () => {
  try {
    const [p, o] = await Promise.all([
      request("/products?limit=200"),
      request("/admin/orders"),
    ]);

    setProductsAdmin(p.products || []);
    setOrdersAdmin(o.orders || []);
    setError("");
  } catch (e) {
    setError(e.message);
  }
}, [request]);

useEffect(() => {
  if (token) {
    load();
  }
}, [token, load]);


  const login = async (e) => {
    e.preventDefault();
    try {
      const d = await request("/admin/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem("fabbyAdminToken", d.token);
      setToken(d.token);
      setError("");
    } catch (e) {
      setError(e.message);
    }
  };
  const add = async (e) => {
    e.preventDefault();
    try {
      await request("/admin/products", {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          category: form.category,
          price: Number(form.price),
          stock: Number(form.stock),
          description: form.description,
          images: form.image ? [form.image] : [],
          slug: form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          active: true,
        }),
      });
      setForm({
        name: "",
        category: "Fashion & Accessories",
        price: "",
        stock: "",
        description: "",
        image: "",
      });
      await load();
    } catch (e) {
      setError(e.message);
    }
  };
  if (!token)
    return (
      <main className="inner-page admin-page">
        <div className="eyebrow">STORE MANAGEMENT</div>
        <h1>
          FABBY LUXE <em>admin.</em>
        </h1>
        <p className="page-lede">
          Sign in with credentials configured in server/.env.
        </p>
        <form className="checkout-form admin-login" onSubmit={login}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button className="button button-dark">
            Sign in <FaArrowRight />
          </button>
          {error && <p className="admin-error">{error}</p>}
        </form>
      </main>
    );
  return (
    <main className="inner-page admin-page">
      <div className="admin-top">
        <div>
          <div className="eyebrow">STORE MANAGEMENT</div>
          <h1>
            Control <em>room.</em>
          </h1>
        </div>
        <button
          className="button button-outline"
          onClick={() => {
            localStorage.removeItem("fabbyAdminToken");
            setToken("");
          }}
        >
          Sign out
        </button>
      </div>
      <div className="admin-tabs">
        <button
          className={tab === "products" ? "selected" : ""}
          onClick={() => setTab("products")}
        >
          Products ({productsAdmin.length})
        </button>
        <button
          className={tab === "orders" ? "selected" : ""}
          onClick={() => setTab("orders")}
        >
          Orders ({ordersAdmin.length})
        </button>
        <button
          className={tab === "add" ? "selected" : ""}
          onClick={() => setTab("add")}
        >
          Add product
        </button>
      </div>
      {error && <p className="admin-error">{error}</p>}
      {tab === "products" && (
        <div className="admin-table">
          <div className="admin-table-head">
            <span>PRODUCT</span>
            <span>PRICE</span>
            <span>STOCK</span>
            <span>STATUS</span>
          </div>
          {productsAdmin.map((p) => (
            <div className="admin-table-row" key={p._id}>
              <span>
                {p.name}
                <small>{p.category}</small>
              </span>
              <b>{money(p.price)}</b>
              <span>{p.stock}</span>
              <span>{p.active ? "Active" : "Hidden"}</span>
            </div>
          ))}
        </div>
      )}
      {tab === "orders" && (
        <div className="admin-table">
          <div className="admin-table-head">
            <span>ORDER</span>
            <span>CUSTOMER</span>
            <span>TOTAL</span>
            <span>STATUS</span>
          </div>
          {ordersAdmin.map((o) => (
            <div className="admin-table-row" key={o._id}>
              <span>
                {o.reference}
                <small>{new Date(o.createdAt).toLocaleDateString()}</small>
              </span>
              <span>
                {o.customer?.name}
                <small>{o.customer?.phone}</small>
              </span>
              <b>{money(o.subtotal + o.deliveryFee)}</b>
              <span>{o.orderStatus}</span>
            </div>
          ))}
        </div>
      )}
      
      {tab === "add" && (
        <form className="checkout-form admin-add" onSubmit={add}>
          <input
            required
            placeholder="Product name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option>Fashion & Accessories</option>
            <option>Shoes & Bags</option>
            <option>Jewellery</option>
          </select>
          <div className="form-grid">
            <input
              required
              type="number"
              min="0"
              placeholder="Price in NGN"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <input
              required
              type="number"
              min="0"
              placeholder="Stock quantity"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />
          </div>
          <input
            placeholder="Image URL (or upload integration later)"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <button className="button button-dark">
            Save product <FaArrowRight />
          </button>
        </form>
      )}
      <p className="fine-print">
        This admin screen requires the API to be running and admin credentials
        configured. Image uploads, order status editing, and richer analytics
        remain future integration tasks.
      </p>
    </main>
  );
}

function AppFrame() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  return (
    <div className="App">
      {!isAdmin && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account" element={<Account />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminProtected><AdminDashboard /></AdminProtected>} />
        <Route path="/admin/products" element={<AdminProtected><AdminProducts /></AdminProtected>} />
        <Route path="/admin/categories" element={<AdminProtected><AdminCategories /></AdminProtected>} />
        <Route path="/admin/products/new" element={<AdminProtected><ProductForm /></AdminProtected>} />
        <Route path="/admin/products/edit/:id" element={<AdminProtected><ProductForm /></AdminProtected>} />
        <Route path="*" element={<Home />} />
      </Routes>
      {!isAdmin && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <CartProvider>
        <AdminAuthProvider>
          <AppFrame />
        </AdminAuthProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
export default App;
