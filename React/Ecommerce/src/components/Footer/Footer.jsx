import "./Footer.css";

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
            <li>Home</li>
            <li>Products</li>
            <li>Cart</li>
            <li>Contact</li>
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
