import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./product.css";
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../app/cartSlice";

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);
  const cart = useSelector((state) => state.cart.cart);

  // Local UI State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState({ text: "", type: "" });
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [orderReference, setOrderReference] = useState("");

  // Categories list
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Filtered Products
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Cart calculations
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discountAmount = (subtotal * discountPercent) / 100;
  const isFreeShipping = subtotal > 50000 || subtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 499;
  const tax = Math.round((subtotal - discountAmount) * 0.18); // 18% GST
  const grandTotal = subtotal === 0 ? 0 : subtotal - discountAmount + shippingFee + tax;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === "SAVE10") {
      setDiscountPercent(10);
      setCouponMessage({ text: "🎉 10% coupon applied successfully!", type: "success" });
    } else if (code === "SAVE20") {
      setDiscountPercent(20);
      setCouponMessage({ text: "🔥 20% MEGA coupon applied!", type: "success" });
    } else if (code === "") {
      setDiscountPercent(0);
      setCouponMessage({ text: "Please enter a coupon code.", type: "error" });
    } else {
      setDiscountPercent(0);
      setCouponMessage({ text: "Invalid code. Try SAVE10 or SAVE20", type: "error" });
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setOrderReference(`#AUR-${Math.floor(100000 + Math.random() * 900000)}`);
    setCheckoutComplete(true);
  };

  const handleFinishOrder = () => {
    dispatch(clearCart());
    setDiscountPercent(0);
    setCouponCode("");
    setCouponMessage({ text: "", type: "" });
    setOrderReference("");
    setCheckoutComplete(false);
  };

  // Helper to get cart item for a product
  const getCartItem = (productId) => cart.find((item) => item.id === productId);

  return (
    <div className="store-wrapper">
      {/* Top Navigation Bar */}
      <header className="store-navbar">
        <div className="nav-container">
          <div className="brand-logo">
            <span className="logo-icon">⚡</span>
            <div className="brand-text">
              <span className="brand-title">AuraStore</span>
              <span className="brand-subtitle">Premium Electronics</span>
            </div>
          </div>

          <div className="search-bar">
            <svg
              className="search-icon"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search laptops, smartphones, audio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchQuery("")}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="nav-actions">
            <a href="#cart-sidebar" className="cart-pill-btn">
              <span className="cart-icon">🛒</span>
              <span className="cart-pill-text">Cart</span>
              <span className="cart-badge">{totalItemsCount}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area: 2-Column Storefront */}
      <main className="main-content">
        {/* Left Column: Catalog */}
        <section className="catalog-section">
          {/* Category Filter Pills */}
          <div className="category-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-pill ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="catalog-header">
            <div>
              <h2 className="catalog-title">
                {selectedCategory === "All" ? "Featured Products" : selectedCategory}
              </h2>
              <p className="catalog-subtitle">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="empty-catalog-state">
              <span className="empty-icon">🔍</span>
              <h3>No products found</h3>
              <p>We couldn't find any products matching "{searchQuery}".</p>
              <button
                className="btn-secondary"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((p) => {
                const itemInCart = getCartItem(p.id);
                const discount = p.originalPrice
                  ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
                  : 0;

                return (
                  <article key={p.id} className="store-product-card">
                    <div className="card-image-wrap">
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=600&q=80";
                        }}
                      />
                      <div className="image-badges">
                        {p.badge && (
                          <span className="badge badge-featured">{p.badge}</span>
                        )}
                        {discount > 0 && (
                          <span className="badge badge-discount">-{discount}%</span>
                        )}
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="product-category">{p.category}</div>
                      <h3 className="product-heading">{p.name}</h3>
                      <p className="product-desc">{p.description}</p>

                      <div className="rating-row">
                        <span className="stars">⭐ {p.rating}</span>
                        <span className="reviews">({p.reviewsCount} reviews)</span>
                      </div>

                      <div className="price-row">
                        <div className="price-info">
                          <span className="current-price">₹{p.price.toLocaleString("en-IN")}</span>
                          {p.originalPrice && (
                            <span className="original-price">
                              ₹{p.originalPrice.toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Dynamic Cart Action Button */}
                      <div className="card-actions">
                        {itemInCart ? (
                          <div className="quantity-stepper">
                            <button
                              className="stepper-btn"
                              onClick={() => dispatch(decreaseQuantity(p.id))}
                              title="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="stepper-count">{itemInCart.quantity} in cart</span>
                            <button
                              className="stepper-btn"
                              onClick={() => dispatch(increaseQuantity(p.id))}
                              title="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            className="btn-add-cart"
                            onClick={() => dispatch(addToCart(p))}
                          >
                            <span>Add to Cart</span>
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                              <line x1="3" y1="6" x2="21" y2="6"></line>
                              <path d="M16 10a4 4 0 0 1-8 0"></path>
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Right Column: Sticky Cart & Order Summary */}
        <aside id="cart-sidebar" className="cart-sidebar">
          <div className="sidebar-card">
            <div className="sidebar-header">
              <div className="sidebar-header-left">
                <h2 className="sidebar-title">Order Summary</h2>
                <span className="sidebar-counter-badge">{totalItemsCount} items</span>
              </div>
              {cart.length > 0 && (
                <button
                  className="btn-text-danger"
                  onClick={() => dispatch(clearCart())}
                  title="Remove all items"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="empty-cart-container">
                <div className="empty-cart-illustration">🛍️</div>
                <h4 className="empty-cart-title">Your Cart is Empty</h4>
                <p className="empty-cart-desc">
                  Looks like you haven't added any products to your shopping bag yet.
                </p>
              </div>
            ) : (
              <>
                <div className="cart-items-scroll">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item-card">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="item-thumbnail"
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=150&q=80";
                        }}
                      />
                      <div className="item-details">
                        <div className="item-name-row">
                          <h4 className="item-title">{item.name}</h4>
                          <button
                            className="item-delete-btn"
                            onClick={() => dispatch(removeFromCart(item.id))}
                            title="Remove item"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="item-price-unit">
                          ₹{item.price.toLocaleString("en-IN")} each
                        </div>

                        <div className="item-bottom-row">
                          <div className="mini-stepper">
                            <button
                              onClick={() => dispatch(decreaseQuantity(item.id))}
                              title="Decrease"
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => dispatch(increaseQuantity(item.id))}
                              title="Increase"
                            >
                              +
                            </button>
                          </div>
                          <div className="item-subtotal">
                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Code Section */}
                <form onSubmit={handleApplyCoupon} className="coupon-form">
                  <div className="coupon-input-group">
                    <input
                      type="text"
                      placeholder="Coupon: SAVE10 or SAVE20"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button type="submit" className="btn-coupon">
                      Apply
                    </button>
                  </div>
                  {couponMessage.text && (
                    <p className={`coupon-feedback ${couponMessage.type}`}>
                      {couponMessage.text}
                    </p>
                  )}
                </form>

                {/* Pricing Breakdown */}
                <div className="summary-breakdown">
                  <div className="summary-row">
                    <span className="summary-label">Subtotal</span>
                    <span className="summary-val">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="summary-row discount-row">
                      <span className="summary-label">Discount ({discountPercent}%)</span>
                      <span className="summary-val">-₹{Math.round(discountAmount).toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="summary-row">
                    <span className="summary-label">Shipping</span>
                    <span className="summary-val">
                      {isFreeShipping ? (
                        <span className="free-shipping-tag">FREE</span>
                      ) : (
                        `₹${shippingFee}`
                      )}
                    </span>
                  </div>

                  <div className="summary-row">
                    <span className="summary-label">Estimated Tax (18% GST)</span>
                    <span className="summary-val">₹{tax.toLocaleString("en-IN")}</span>
                  </div>

                  <hr className="summary-divider" />

                  <div className="summary-row total-row">
                    <div>
                      <span className="total-title">Total</span>
                      <span className="total-tax-note">Including all taxes</span>
                    </div>
                    <span className="total-val">₹{grandTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button className="btn-checkout" onClick={handleCheckout}>
                  <span>Proceed to Checkout</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>

                <div className="secure-badge">
                  <span>🔒 256-Bit SSL Encrypted & Secure Checkout</span>
                </div>
              </>
            )}
          </div>
        </aside>
      </main>

      {/* Checkout Success Modal */}
      {checkoutComplete && (
        <div className="modal-backdrop" onClick={() => setCheckoutComplete(false)}>
          <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-success-icon">✨</div>
            <h2 className="modal-title">Order Placed Successfully!</h2>
            <p className="modal-desc">
              Thank you for shopping with AuraStore. Your order containing{" "}
              <strong>{totalItemsCount} item(s)</strong> has been confirmed.
            </p>

            <div className="modal-receipt">
              <div className="receipt-row">
                <span>Order Reference:</span>
                <strong>{orderReference}</strong>
              </div>
              <div className="receipt-row">
                <span>Amount Paid:</span>
                <strong>₹{grandTotal.toLocaleString("en-IN")}</strong>
              </div>
              <div className="receipt-row">
                <span>Payment Method:</span>
                <span>Prepaid (Credit/UPI)</span>
              </div>
            </div>

            <button className="btn-modal-close" onClick={handleFinishOrder}>
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;