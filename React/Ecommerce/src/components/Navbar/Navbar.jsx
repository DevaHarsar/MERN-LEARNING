import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect } from "react";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
function Navbar() {
  const { isAuthenticated, user, setIsAuthenticated, setUser } =
    useContext(AuthContext);

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
        <div className="nav-btns">
          {isLoggedIn ? (
            <>
              <li onClick={() => navigate("/products")}>Products</li>

              {user?.role === "user" && (
                <li onClick={() => navigate("/cart")} className="cart-button">
                  <FontAwesomeIcon icon={faShoppingCart} />
                </li>
              )}

              {user?.role === "admin" && (
                <li onClick={() => navigate("/admin/dashboard")}>Dashboard</li>
              )}

              <div className="profile-container" ref={dropdownRef}>
                <li
                  className="profile-section"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <span>Welcome,{user?.name}</span>
                  {user?.avatar ? (
                    <img src={user.avatar} alt="avatar" className="avatar" />
                  ) : (
                    <div className="avatar-placeholder">
                      {user?.name?.[0]?.toUpperCase()}
                    </div>
                  )}
                </li>

                {showDropdown && (
                  <div className="dropdown-menu">
                    <button onClick={() => navigate("/profile")}>
                      Profile
                    </button>

                    <button onClick={logout}>Logout</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <li onClick={() => navigate("/login")}>Login</li>

              <li onClick={() => navigate("/signup")}>Sign Up</li>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
