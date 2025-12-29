import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, ChevronDown } from 'lucide-react';
import logo from '../images/Logo.png';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
    <nav className="navbar" style={{ backgroundColor: 'var(--church-blue)', padding: '12px 20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="nav-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Logo */}
        <Link to="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid var(--church-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 5px 20px rgba(255, 215, 0, 0.4)',
            marginRight: '12px',
            backgroundColor: 'white'
          }}>
            <img src={logo} alt="Abundant Rain Logo" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', textShadow: '0 0 12px rgba(255,255,255,0.6)' }}>Abundant Rain</span>
        </Link>

        {/* Links */}
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <Link to="/" className="nav-link">Home</Link>

          {/* About Dropdown */}
          <div className="dropdown">
            <span>About <ChevronDown size={14} /></span>
            <div className="dropdown-content">
              <Link to="/history">Our History</Link>
              <Link to="/leadership">Leadership</Link>
              <Link to="/contact">Contact & Location</Link>
            </div>
          </div>

          {/* Ministries Dropdown */}
          <div className="dropdown">
            <span>Ministries <ChevronDown size={14} /></span>
            <div className="dropdown-content">
              <Link to="/ministries/men">Men's Ministry</Link>
              <Link to="/ministries/women">Women's Ministry</Link>
              <Link to="/ministries/youth">Youth</Link>
              <Link to="/ministries/children">Children</Link>
            </div>
          </div>

          {/* Media Dropdown */}
          <div className="dropdown">
            <span>Media <ChevronDown size={14} /></span>
            <div className="dropdown-content">
              <Link to="/sermons">Sermons</Link>
              <Link to="/announcements">News</Link>
              <Link to="/gallery">Gallery</Link>
            </div>
          </div>

          <Link to="/events" className="nav-link">Events</Link>

          {/* Action Buttons */}
          <Link to="/get-involved" className="btn" style={{ backgroundColor: 'transparent', border: '1px solid var(--church-gold)', color: 'var(--church-gold)', padding: '8px 15px' }}>Get Involved</Link>

          {user ? (
            <>
              <Link to="/admin" className="btn btn-gold">
                <User size={16} /> Panel
              </Link>
              <button onClick={handleLogout} className="btn" style={{ color: 'white', padding: '0 10px', background: 'none', border: 'none', cursor: 'pointer' }}>
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <Link to="/give" className="btn btn-gold">Give</Link>
          )}
        </div>
      </div>

      {/* CSS for Dropdown hover */}
      <style>{`
        .nav-links .nav-link, .dropdown span {
          color: white;
          text-decoration: none;
          font-weight: 500;
          cursor: pointer;
        }
        .dropdown {
          position: relative;
        }
        .dropdown-content {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          background-color: white;
          min-width: 180px;
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
          border-radius: 8px;
          z-index: 10;
        }
        .dropdown-content a {
          display: block;
          padding: 10px 15px;
          color: var(--church-blue);
          text-decoration: none;
        }
        .dropdown-content a:hover {
          background-color: rgba(24,44,91,0.05);
        }
        .dropdown:hover .dropdown-content {
          display: block;
        }
      `}</style>
    </nav>
  );
}
