import "./Login.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";

function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    navigate(isAuthenticated ? "/" : "/login");
  }, []);

  const { setIsAuthenticated, setUser, user} =
    useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user?.name === "admin" && user?.password === "admin") {
      setUser({
        name: "Admin",
        email: "admin@gmail.com",
        role: "admin",
      });
      localStorage.setItem(
        
        "user",
        JSON.stringify({
          name: "Admin",
          email: "admin@gmail.com",
          role: "admin",
        }),
      );
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      navigate("/admin/dashboard");
    } else if (user?.name === "dev" && user?.password === "dev") {
      setUser({
        name: "Deva",
        email: "deva@gmail.com",
        role: "user",
      });
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: "Deva",
          email: "deva@gmail.com",
          role: "user",
        }),
      );
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      navigate("/");
    } else {
      alert("Invalid Username or Password");
      setIsAuthenticated(false);
    }
  };

  return (
    <>
      <div className="login-page">
        <div className="form-group">
          <h1>Login Form</h1>

          <form>
            <div className="form-items">
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                  alt="Login Icon"
                  className="login-icon"
                />
              </div>

              <div>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="username"
                  required
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                  required
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>

              <button type="submit" onClick={handleSubmit}>
                Login
              </button>

              <Link to="/forget-password">Forget Password</Link>
            </div>

            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
