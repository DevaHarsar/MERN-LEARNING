import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect } from "react";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCart } from "../../redux/cartSlice";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
function Navbar() {
  const { isAuthenticated, user, setIsAuthenticated, setUser } =
    useContext(AuthContext);

  const cartItems = useSelector((state) => state.cart.items);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isLoggedIn = isAuthenticated;
  const navigate = useNavigate();

  const logout = () => {
    dispatch(setCart({ items: [] }));
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    setShowDropdown(false);
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <div>
          <h1 onClick={() => navigate("/")}>Dev Super Mart</h1>
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>
        <div className={`nav-btns ${menuOpen ? "active" : ""}`}>
          {isLoggedIn ? (
            <>
              <li
                onClick={() =>{
                  navigate(
                    user?.role === "admin" ? "/admin/products" : "/products",
                  )
                  setMenuOpen(false);
                }

                }
              >
                Products
              </li>

              {user?.role === "user" && (
                <li
                  onClick={() =>{setMenuOpen(false); navigate("/cartPage")}}
                  className="cart-button"
                >
                  <FontAwesomeIcon icon={faShoppingCart} />

                  {cartCount > 0 && (
                    <span className="cart-badge">{cartCount}</span>
                  )}
                </li>
              )}

              {user?.role === "admin" && (
                <li onClick={() => { setMenuOpen(false); navigate("/admin/dashboard"); }}>Dashboard</li>
              )}

              <div className="profile-container" ref={dropdownRef}>
                <li
                  className="profile-section"
                  onClick={() => {setShowDropdown(!showDropdown); }}
                >
                  <span>Welcome,{user?.fullName?.firstName}</span>
                  {user?.avatar ? (
                    <img src={user.avatar} alt="avatar" className="avatar" />
                  ) : (
                    <div className="avatar-placeholder">
                      {user?.fullName?.firstName?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </li>

                {showDropdown && (
                  <div className="dropdown-menu">
                    <button onClick={() => { setMenuOpen(false); navigate("/profile"); }}>
                      Profile
                    </button>

                    <button onClick={() => { setMenuOpen(false); logout(); }}>Logout</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <li onClick={() => { setMenuOpen(false); navigate("/login"); }}>Login</li>

              <li onClick={() => { setMenuOpen(false); navigate("/signup"); }}>Sign Up</li>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
