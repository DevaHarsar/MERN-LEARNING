import './HeroBanner.css';
import { useNavigate } from 'react-router-dom';
function HeroBanner() {
    const navigate = useNavigate();
    return (
        <div className="hero-banner">
            <h1>Welcome to Our Store</h1>
            <p>Discover the best products at unbeatable prices.</p>
            <button className="shop-now-btn" onClick={()=>navigate('/login')}>Shop Now</button>
        </div>
    );
}
export default HeroBanner;