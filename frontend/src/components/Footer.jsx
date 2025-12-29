import { Link } from 'react-router-dom';
import { Facebook, Youtube, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: 'var(--church-blue)', color: 'white', marginTop: 'auto' }}>
      <div className="container" style={{ padding: '40px 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
        
        {/* Column 1: Identity */}
        <div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--church-gold)' }}>Abundant Rain</h3>
          <p>Changing Lives, Building Destinies.</p>
          <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
            <a href="#" style={{ color: 'white' }}><Facebook /></a>
            <a href="#" style={{ color: 'white' }}><Youtube /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '20px', borderBottom: '2px solid var(--church-gold)', display: 'inline-block' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '10px' }}><Link to="/about">About Us</Link></li>
            <li style={{ marginBottom: '10px' }}><Link to="/sermons">Sermons</Link></li>
            <li style={{ marginBottom: '10px' }}><Link to="/give">Ways to Give</Link></li>
            <li style={{ marginBottom: '10px' }}><Link to="/contact">Contact & Counselling</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '20px', borderBottom: '2px solid var(--church-gold)', display: 'inline-block' }}>Contact Us</h4>
          <p style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <MapPin size={18} color="var(--church-gold)" /> 12669, umsimbithi drive, Eastfield, vosloorus extention 23
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <Phone size={18} color="var(--church-gold)" /> +27 76 144 1433
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Mail size={18} color="var(--church-gold)" /> info@abundantrain.com
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '20px', textAlign: 'center', fontSize: '0.9rem', color: '#ccc' }}>
        <p>&copy; {currentYear} Abundant Rain Church. All rights reserved.</p>
        
        {/* THIS IS YOUR LOGIN BUTTON */}
        <div style={{ marginTop: '10px' }}>
          <Link to="/login" style={{ color: '#666', textDecoration: 'none', fontSize: '0.8rem' }}>Staff Portal</Link>
        </div>
      </div>
    </footer>
  );
}