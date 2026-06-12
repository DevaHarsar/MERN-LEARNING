import "./Login.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

function Login() {
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);

    setUser({
      name: "Deva",
      email: "deva@gmail.com",
    });
    console.log("Login Submitted");
    navigate("/");
  };

  return (
    <>
      <div className="login-page">
        <div className="form-group">
          <h1>Login Form</h1>

          <form onSubmit={handleSubmit}>
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
