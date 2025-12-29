import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, LogOut, ChevronDown, Menu, X } from 'lucide-react';
import logo from '../images/Logo.png';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const navigate = useNavigate();
  const location = useLocation();

  // 1. PREVENT CLASH: Do not show this Navbar on Admin pages
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    setUser(null);
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        
        {/* LOGO SECTION */}
        <Link to="/" className="nav-logo">
          <div className="logo-circle">
            <img src={logo} alt="Abundant Rain Logo" className="logo-img" />
          </div>
          <span className="logo-text">Abundant Rain</span>
        </Link>

        {/* HAMBURGER BUTTON (Visible only on Mobile) */}
        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} color="white" /> : <Menu size={28} color="white" />}
        </button>

        {/* LINKS SECTION (Collapsible on Mobile) */}
        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-item">Home</Link>

          {/* About Dropdown */}
          <div className="dropdown">
            <span className="dropdown-trigger">About <ChevronDown size={14} /></span>
            <div className="dropdown-content">
              <Link to="/history">Our History</Link>
              <Link to="/leadership">Leadership</Link>
              <Link to="/contact">Contact & Location</Link>
            </div>
          </div>

          {/* Ministries Dropdown */}
          <div className="dropdown">
            <span className="dropdown-trigger">Ministries <ChevronDown size={14} /></span>
            <div className="dropdown-content">
              <Link to="/ministries/men">Men's Ministry</Link>
              <Link to="/ministries/women">Women's Ministry</Link>
              <Link to="/ministries/youth">Youth</Link>
              <Link to="/ministries/children">Children</Link>
            </div>
          </div>

          {/* Media Dropdown */}
          <div className="dropdown">
            <span className="dropdown-trigger">Media <ChevronDown size={14} /></span>
            <div className="dropdown-content">
              <Link to="/sermons">Sermons</Link>
              <Link to="/announcements">News</Link>
              <Link to="/gallery">Gallery</Link>
            </div>
          </div>

          <Link to="/events" className="nav-item">Events</Link>

          {/* Action Buttons */}
          <Link to="/get-involved" className="btn btn-outline mobile-btn">Get Involved</Link>

          {user ? (
            <div className="user-actions">
              <Link to="/admin" className="btn btn-gold mobile-btn">
                <User size={16} /> Panel
              </Link>
              <button onClick={handleLogout} className="btn-logout" title="Logout">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/give" className="btn btn-gold mobile-btn">Give</Link>
          )}
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        /* BASE STYLES */
        .navbar {
          background-color: var(--church-blue);
          padding: 10px 20px;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        .nav-container {
          max-width: 1200px;
          margin: 0 auto; /* Centers the navbar on full-screen */
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }
        .logo-circle {
          width: 50px; height: 50px;
          border-radius: 50%;
          background: white;
          border: 2px solid var(--church-gold);
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }
        .logo-img { width: 90%; height: 90%; object-fit: contain; }
        .logo-text { font-size: 1.5rem; font-weight: bold; color: white; }
        
        .mobile-menu-btn { display: none; background: none; border: none; cursor: pointer; }

        /* DESKTOP LINKS */
        .nav-links { display: flex; align-items: center; gap: 20px; }
        .nav-item, .dropdown-trigger { color: white; font-weight: 500; cursor: pointer; text-decoration: none; display: flex; align-items: center; gap: 5px; }
        
        /* DROPDOWNS */
        .dropdown { position: relative; }
        .dropdown-content {
          display: none; position: absolute; top: 100%; left: 0;
          background: white; min-width: 180px;
          box-shadow: 0 8px 16px rgba(0,0,0,0.15);
          border-radius: 8px; overflow: hidden;
          z-index: 1001;
        }
        .dropdown:hover .dropdown-content { display: block; }
        .dropdown-content a { display: block; padding: 12px 15px; color: var(--church-blue); text-decoration: none; transition: 0.2s; }
        .dropdown-content a:hover { background: #f4f4f4; padding-left: 20px; }

        /* BUTTONS */
        .btn-outline { border: 1px solid var(--church-gold); color: var(--church-gold); padding: 8px 15px; background: transparent; text-decoration: none; border-radius: 5px; }
        .btn-gold { background: var(--church-gold); color: var(--church-blue); padding: 8px 15px; text-decoration: none; border-radius: 5px; display: flex; align-items: center; gap: 5px; }
        .btn-logout { background: none; border: none; color: white; cursor: pointer; }
        .user-actions { display: flex; align-items: center; gap: 10px; }

        /* ================= MOBILE STYLES ================= */
        @media (max-width: 900px) {
          .mobile-menu-btn { display: block; margin-left: auto; } /* Push hamburger to right */
          
          /* Hide links by default */
          .nav-links {
            display: none; 
            width: 100%;
            flex-direction: column;
            align-items: center; /* Center text on mobile */
            gap: 0;
            margin-top: 15px;
            border-top: 1px solid rgba(255,255,255,0.1);
            padding-top: 10px;
          }

          /* Show links when active */
          .nav-links.active { display: flex; animation: slideDown 0.3s ease-out; }

          .nav-item, .dropdown { width: 100%; padding: 15px 0; border-bottom: 1px solid rgba(255,255,255,0.05); text-align: center; justify-content: center; }
          .dropdown-trigger { justify-content: center; }

          /* Mobile Dropdowns */
          .dropdown-content {
            position: static;
            display: none; /* Tap to open logic handled by CSS hover on mobile usually requires double tap or JS, but basic hover works for simple setup */
            width: 100%;
            box-shadow: none;
            background: rgba(0,0,0,0.1);
            color: white;
            text-align: center;
          }
          .dropdown:hover .dropdown-content { display: block; }
          .dropdown-content a { color: #ddd; padding: 10px; }

          /* Mobile Buttons */
          .mobile-btn { width: 80%; text-align: center; margin-top: 15px; display: block; }
          .user-actions { width: 100%; justify-content: center; margin-top: 15px; }
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
}