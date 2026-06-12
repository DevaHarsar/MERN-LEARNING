import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import{AuthContext} from "../../context/AuthContext";
import { useContext } from "react";
function Navbar() {

  const {isAuthenticated,user,setIsAuthenticated,setUser} = useContext(AuthContext);

  const isLoggedIn = isAuthenticated;
  const navigate = useNavigate();

  const logout = () =>{
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar">
        <div>
          <h1>Dev Super Mart</h1>
        </div>
        <div className="nav-btns">
          {isLoggedIn ? (
            <>
            <h3>Welcome, {user.name}</h3>
            <button onClick={logout}>Logout</button>
            </>
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
