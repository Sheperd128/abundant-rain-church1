import { Link } from 'react-router-dom';
import { Facebook, Youtube, MapPin, Phone } from 'lucide-react'; // Removed Mail import

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ 
      backgroundColor: 'var(--church-blue)', 
      color: 'white', 
      marginTop: 'auto',
      backgroundImage: 'linear-gradient(to bottom, var(--church-blue), #0f1c3f)'
    }}>
      <div className="container" style={{ 
        padding: '60px 20px', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '40px',
        textAlign: 'center', 
      }}>
        
        {/* Column 1: Identity */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '15px', color: 'var(--church-gold)', letterSpacing: '1px' }}>Abundant Rain</h3>
          <p style={{ lineHeight: '1.6', color: '#ccc', fontSize: '0.95rem', maxWidth: '300px' }}>
            Raising Winners, Building Destinies through the power of the Word and the Spirit.
          </p>
          <div style={{ display: 'flex', gap: '20px', marginTop: '20px', justifyContent: 'center' }}>
            <a href="https://www.facebook.com/share/14QEDnwsXVu/" className="social-icon"><Facebook size={20} /> </a>
            <a href="https://youtube.com/@abundant_rainvosloorus?si=utVuxW1wqboaDILU" className="social-icon"><Youtube size={20} /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'var(--church-gold)', textTransform: 'uppercase', letterSpacing: '1px' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '1rem' }}>
            <li><Link to="/about" className="footer-link">About Us</Link></li>
            <li><Link to="/sermons" className="footer-link">Sermons</Link></li>
            <li><Link to="/give" className="footer-link">Ways to Give</Link></li>
            <li><Link to="/contact" className="footer-link">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'var(--church-gold)', textTransform: 'uppercase', letterSpacing: '1px' }}>Contact Us</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '0.95rem', alignItems: 'center' }}>
            <p style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ccc' }}>
              <MapPin size={18} color="var(--church-gold)" /> 
              <span>12669 Umsimbithi Dr, Vosloorus Ext 23</span>
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ccc' }}>
              <Phone size={18} color="var(--church-gold)" /> 
              <span>+27 76 144 1433</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ 
        borderTop: '1px solid rgba(255,255,255,0.1)', 
        padding: '25px 20px', 
        textAlign: 'center', 
        fontSize: '0.85rem', 
        color: '#888',
        backgroundColor: 'rgba(0,0,0,0.2)' 
      }}>
        <p style={{ marginBottom: '10px' }}>&copy; {currentYear} Abundant Rain Church. All rights reserved.</p>
        
        <div>
          <Link to="/login" style={{ color: '#555', textDecoration: 'none', transition: '0.3s' }} onMouseOver={e => e.target.style.color='#aaa'} onMouseOut={e => e.target.style.color='#555'}>
            Staff Portal
          </Link>
        </div>
      </div>

      <style>{`
        .footer-link { color: #ccc; text-decoration: none; transition: 0.3s; display: inline-block; }
        .footer-link:hover { color: var(--church-gold); transform: translateX(5px); }
        
        .social-icon { 
          color: white; 
          padding: 10px; 
          background: rgba(255,255,255,0.1); 
          border-radius: 50%; 
          transition: 0.3s; 
          display: flex; 
          align-items: center; 
          justify-content: center;
        }
        .social-icon:hover { background: var(--church-gold); color: var(--church-blue); transform: translateY(-3px); }

        /* On larger screens, align left for better readability */
        @media (min-width: 768px) {
          .container { text-align: left !important; }
          .container > div { alignItems: flex-start !important; text-align: left !important; }
          .social-icon { margin-right: 10px; }
        }
      `}</style>
    </footer>
  );
}