import { Link } from 'react-router-dom';
import { Facebook, Youtube, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: 'var(--church-blue)', color: 'white', marginTop: 'auto' }}>
      <div className="container" style={{ 
        padding: '50px 20px', 
        display: 'grid', 
        // FIX: Using 160px allows 2 columns to fit on a mobile screen side-by-side
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', 
        gap: '30px' 
      }}>
        
        {/* Column 1: Identity (Spans full width on very small screens if needed) */}
        <div style={{ minWidth: '200px' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: 'var(--church-gold)' }}>Abundant Rain</h3>
          <p style={{ lineHeight: '1.5', color: '#ccc', fontSize: '0.9rem' }}>
            Rasing Winnerss, Building Destinies through the power of the Word and the Spirit.
          </p>
          <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
            <a href="#" style={{ color: 'white', padding: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}><Facebook size={18} /></a>
            <a href="#" style={{ color: 'white', padding: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}><Youtube size={18} /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '15px', color: 'var(--church-gold)', textTransform: 'uppercase' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '8px', fontSize: '0.9rem' }}>
            <li><Link to="/about" className="footer-link">About Us</Link></li>
            <li><Link to="/sermons" className="footer-link">Sermons</Link></li>
            <li><Link to="/give" className="footer-link">Ways to Give</Link></li>
            <li><Link to="/contact" className="footer-link">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '15px', color: 'var(--church-gold)', textTransform: 'uppercase' }}>Contact Us</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
            <p style={{ display: 'flex', alignItems: 'start', gap: '10px', color: '#ccc' }}>
              <MapPin size={16} color="var(--church-gold)" style={{flexShrink: 0, marginTop: '3px'}} /> 
              <span>12669 Umsimbithi Dr,<br/> Vosloorus Ext 23</span>
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ccc' }}>
              <Phone size={16} color="var(--church-gold)" /> 
              <span>+27 76 144 1433</span>
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ccc' }}>
              <Mail size={16} color="var(--church-gold)" /> 
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '20px', textAlign: 'center', fontSize: '0.8rem', color: '#999' }}>
        <p>&copy; {currentYear} Abundant Rain Church. All rights reserved.</p>
        
        <div style={{ marginTop: '10px' }}>
          <Link to="/login" style={{ color: '#555', textDecoration: 'none', transition: '0.3s' }} onMouseOver={e => e.target.style.color='#888'} onMouseOut={e => e.target.style.color='#555'}>
            Staff Portal
          </Link>
        </div>
      </div>

      <style>{`
        .footer-link { color: #ccc; text-decoration: none; transition: 0.3s; }
        .footer-link:hover { color: var(--church-gold); padding-left: 5px; }
      `}</style>
    </footer>
  );
}