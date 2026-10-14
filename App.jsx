import { useState } from "react";
import "./App.css";

function App() {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 1999,
      category: "Electronics",
      description: "High quality wireless headphones with excellent sound.",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      name: "Smartphone",
      price: 14999,
      category: "Electronics",
      description: "Powerful smartphone with excellent camera and battery.",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      name: "Smart Watch",
      price: 2999,
      category: "Electronics",
      description: "Stylish smartwatch with fitness tracking features.",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      name: "Running Shoes",
      price: 2499,
      category: "Fashion",
      description: "Comfortable running shoes for everyday workouts.",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 5,
      name: "Backpack",
      price: 1299,
      category: "Fashion",
      description: "Durable backpack suitable for college and travel.",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 6,
      name: "T-Shirt",
      price: 799,
      category: "Fashion",
      description: "Comfortable cotton T-shirt for everyday wear.",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [checkout, setCheckout] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  // Search + Category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  // Add to Cart
  const addToCart = (product) => {
    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Increase
  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease
  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Cart Count
  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Total
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Buy Now
  const buyNow = (product) => {
    setCart([{ ...product, quantity: 1 }]);
    setSelectedProduct(null);
    setCheckout(true);
  };

  // Customer input
  const handleCustomerChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  // Place Order
  const placeOrder = (e) => {
    e.preventDefault();

    setOrderPlaced(true);
    setCart([]);
  };

  // Back to Shopping
  const backToShopping = () => {
    setCheckout(false);
    setOrderPlaced(false);

    setCustomer({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  // Checkout Page
  if (checkout) {
    return (
      <div className="checkout-page">

        <div className="checkout-box">

          {!orderPlaced ? (
            <>
              <h1>🛒 Checkout</h1>

              <div className="checkout-content">

                {/* Customer Details */}
                <div className="customer-form">

                  <h2>Customer Details</h2>

                  <form onSubmit={placeOrder}>

                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={customer.name}
                      onChange={handleCustomerChange}
                      required
                    />

                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={customer.email}
                      onChange={handleCustomerChange}
                      required
                    />

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={customer.phone}
                      onChange={handleCustomerChange}
                      required
                    />

                    <textarea
                      name="address"
                      placeholder="Delivery Address"
                      value={customer.address}
                      onChange={handleCustomerChange}
                      required
                    ></textarea>

                    <button
                      type="submit"
                      className="place-order-btn"
                    >
                      ✅ Place Order
                    </button>

                  </form>

                </div>

                {/* Order Summary */}
                <div className="order-summary">

                  <h2>Order Summary</h2>

                  {cart.map((item) => (
                    <div
                      className="summary-item"
                      key={item.id}
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div>
                        <h3>{item.name}</h3>

                        <p>
                          ₹{item.price} × {item.quantity}
                        </p>

                        <strong>
                          ₹{item.price * item.quantity}
                        </strong>
                      </div>

                    </div>
                  ))}

                  <hr />

                  <h2 className="checkout-total">
                    Total: ₹{total}
                  </h2>

                </div>

              </div>

              <button
                className="back-btn"
                onClick={() => setCheckout(false)}
              >
                ← Back to Shopping
              </button>
            </>
          ) : (
            <div className="success-box">

              <div className="success-icon">
                ✅
              </div>

              <h1>Order Placed Successfully!</h1>

              <p>
                Thank you, {customer.name}!
              </p>

              <p>
                Your order has been received successfully.
              </p>

              <button
                className="back-btn"
                onClick={backToShopping}
              >
                🛍️ Continue Shopping
              </button>

            </div>
          )}

        </div>

      </div>
    );
  }

  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">

        <h2>🛍️ MyShop</h2>

        <div className="cart-count">
          🛒 Cart: {cartCount}
        </div>

      </nav>

      <h1>Our Products</h1>

      {/* Search + Filter */}
      <div className="filters">

        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
        </select>

      </div>

      {/* Products */}
      <div className="products">

        {filteredProducts.length === 0 ? (
          <p className="no-products">
            No products found 😔
          </p>
        ) : (
          filteredProducts.map((product) => (
            <div
              className="product-card"
              key={product.id}
            >

              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />

              <span className="category">
                {product.category}
              </span>

              <h2>{product.name}</h2>

              <h3>₹{product.price}</h3>

              <p>{product.description}</p>

              <div className="product-buttons">

                <button
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>

                <button
                  className="details-btn"
                  onClick={() => setSelectedProduct(product)}
                >
                  View Details
                </button>

              </div>

            </div>
          ))
        )}

      </div>

      {/* Product Details */}
      {selectedProduct && (
        <div className="details-box">

          <button
            className="close-btn"
            onClick={() => setSelectedProduct(null)}
          >
            ✕
          </button>

          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
          />

          <div className="details-content">

            <span className="category">
              {selectedProduct.category}
            </span>

            <h2>{selectedProduct.name}</h2>

            <h3>₹{selectedProduct.price}</h3>

            <p>{selectedProduct.description}</p>

            <p>⭐⭐⭐⭐⭐</p>

            <button
              className="buy-btn"
              onClick={() => buyNow(selectedProduct)}
            >
              🛒 Buy Now
            </button>

          </div>

        </div>
      )}

      {/* Cart */}
      <div className="cart">

        <h2>🛒 My Cart</h2>

        {cart.length === 0 ? (
          <p className="empty-cart">
            Your cart is empty
          </p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                className="cart-item"
                key={item.id}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-details">

                  <h3>{item.name}</h3>

                  <p>₹{item.price}</p>

                  <div className="quantity">

                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                    >
                      +
                    </button>

                  </div>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  >
                    🗑️ Remove
                  </button>

                </div>

              </div>
            ))}

            <h2 className="total">
              Total: ₹{total}
            </h2>

            <button
              className="checkout-btn"
              onClick={() => setCheckout(true)}
            >
              💳 Proceed to Checkout
            </button>

          </>
        )}

      </div>

    </div>
  );
}

export default App;