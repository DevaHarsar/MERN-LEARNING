import { Link } from "react-router-dom";
import "./SignUp.css";
function SignUp() {
  return (
    <>
      <form>
        <div className="form-group">
          <h1>Sign Up Form</h1>
          <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" alt="Sign Up Icon" className="signup-icon"/>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
          />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="text"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm password"
            required
          />
          <button type="submit">Sign Up</button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </>
  );
}

export default SignUp;
