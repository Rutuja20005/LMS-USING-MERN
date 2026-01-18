import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useState, useEffect } from "react";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { getCart } from "../services/cartService.js";

function Navbar() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // ✅ Fetch cart items count whenever user changes
  useEffect(() => {
    const fetchCartCount = async () => {
      if (!user) {
        setCartCount(0);
        return;
      }
      try {
        const cart = await getCart();
        setCartCount(cart.items.length);
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    };

    fetchCartCount();
  }, [user]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">LMS</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/courses">Courses</Link>
            </li>

            {/* Profile Icon */}
            <li className="nav-item position-relative">
              <button
                onClick={toggleDropdown}
                className="btn btn-dark position-relative"
                style={{ fontSize: "1.5rem" }}
              >
                <FaUserCircle />
              </button>

              {dropdownOpen && (
                <div
                  className="dropdown-menu dropdown-menu-end show mt-2"
                  style={{ minWidth: "180px" }}
                >
                  {!user ? (
                    <>
                      <Link className="dropdown-item" to="/login" onClick={() => setDropdownOpen(false)}>Sign In</Link>
                      <Link className="dropdown-item" to="/signup" onClick={() => setDropdownOpen(false)}>Sign Up</Link>
                    </>
                  ) : (
                    <>
                      <span className="dropdown-item text-muted">Hello, {user.name}</span>
                      <Link className="dropdown-item d-flex justify-content-between align-items-center" to="/cart" onClick={() => setDropdownOpen(false)}>
                        <div>
                          <FaShoppingCart className="me-2" /> Cart
                        </div>
                        {cartCount > 0 && (
                          <span className="badge bg-primary rounded-pill">{cartCount}</span>
                        )}
                      </Link>
                      <button
                        className="dropdown-item text-danger"
                        onClick={() => { logout(); setDropdownOpen(false); }}
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
