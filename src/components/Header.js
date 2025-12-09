// FILE: src/components/Header.jsx
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            National Scholarship Portal
          </Link>
          
          <nav className="nav-links">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/apply" 
              className={`nav-link ${location.pathname === '/apply' ? 'active' : ''}`}
            >
              Apply Now
            </Link>
            <Link 
              to="/admin/login" 
              className={`nav-link ${location.pathname.includes('/admin') ? 'active' : ''}`}
            >
              Admin
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;