import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Dev Super Mart</h3>
          <p>
            Your one-stop destination for quality products at affordable prices.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/" className="footer-link">
              Home
            </Link></li>
            <li><Link to="/products" className="footer-link">
              Products
            </Link></li>
            <li><Link to="/cart" className="footer-link">
              Cart
            </Link></li>
            <li><Link to="/contact" className="footer-link">
              Contact
            </Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>📧 info@devsupermart.com</p>
          <p>📞 +91 98765 43210</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Dev Super Mart. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
