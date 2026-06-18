import './HeroBanner.css';
import { useNavigate } from 'react-router-dom';
function HeroBanner() {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('isAuthenticated') !== null;
    return (
        <div className="hero-banner">
            <h1>Welcome to Our Store</h1>
            <p>Discover the best products at unbeatable prices.</p>
            <button className="shop-now-btn" onClick={() => navigate(isAuthenticated ? '/products' : '/login')}>
                Shop Now
            </button>
        </div>
    );
}
export default HeroBanner;