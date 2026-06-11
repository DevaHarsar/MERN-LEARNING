import "./Navbar.css";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const isLoggedIn = false;
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <div>
          <h1>Dev Super Mart</h1>
        </div>
        <div className="nav-btns">
          {isLoggedIn ? (
            <button>Logout</button>
          ) : (
            <>
              <button onClick = {() => navigate("/login")}>Login</button>
              <button>Sign Up</button>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
