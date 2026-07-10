import "./Login.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import axios from "axios";
import { getCart } from "../../../service/cartService";
import { useDispatch } from "react-redux";
import { setCart } from "../../../redux/cartSlice";
import { toast } from "react-toastify";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    navigate(isAuthenticated ? "/" : "/login");
  }, []);

  const { setIsAuthenticated, setUser, user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email: user.email,
          password: user.password,
        },
      );

      const { token, user: loggedInUser } = response.data;

      localStorage.setItem("token", token);

      localStorage.setItem("user", JSON.stringify(loggedInUser));

      localStorage.setItem("isAuthenticated", "true");

      const cartResponse = await getCart(token);

      dispatch(
        setCart(
          cartResponse.data || {
            items: [],
          },
        ),
      );

      setUser(loggedInUser);

      setIsAuthenticated(true);

      if (loggedInUser.role === "admin") {
        navigate("/admin/dashboard");
        toast.success("Admin login successful");

      } else {
        navigate("/");
        toast.success("Login successful");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
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
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email"
                  required
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
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
