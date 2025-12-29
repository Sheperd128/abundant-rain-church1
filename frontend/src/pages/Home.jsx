import { Link } from 'react-router-dom';
import { MapPin, Clock, Calendar, PlayCircle } from 'lucide-react';
import HomeImage from '../images/Homepage.jpeg';
import Worship from '../images/PrayerHome.jpeg';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title" style={{fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '20px'}}>Welcome to <br/> Abundant Rain Church</h1>
          <h2 style={{fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: 'var(--church-gold)', marginBottom: '20px'}}>Vosloorus Campus</h2>
          <p style={{fontSize: 'clamp(1rem, 2vw, 1.3rem)', marginBottom: '30px'}}>Rasisng Winners, Building Destinies.</p>
          <div style={{display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap'}}>
            <Link to="/live" className="btn btn-red"><PlayCircle size={20}/> Watch Live</Link>
            <Link to="/contact" className="btn" style={{backgroundColor: 'white', color: 'var(--church-blue)'}}>Plan a Visit</Link>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--church-blue)', color: 'white', padding: '40px 20px', textAlign: 'center' }}>
        <div className="container">
          <h4 style={{ color: 'var(--church-gold)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '10px' }}>Verse of the Day</h4>
          <p style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontStyle: 'italic', fontFamily: 'serif', maxWidth: '800px', margin: '0 auto' }}>
            "But those who wait on the Lord shall renew their strength; They shall mount up with wings like eagles."
          </p>
          <p style={{ marginTop: '15px', fontWeight: 'bold' }}>— Isaiah 40:31</p>
        </div>
      </div>

      {/* Info Cards - Responsive Grid */}
      <div className="info-cards">
        <div className="card">
          <h3><Clock size={20}/> Service Times</h3>
          <p><strong>Sunday:</strong> 10:00 AM - 12:00 PM</p>
          <p><strong>Thursday:</strong> 06:00 PM (Home Cell)</p>
        </div>

        <div className="card">
          <h3><MapPin size={20}/> Visit Us</h3>
          <p>12669 Umsimbithi Dr, Vosloorus, 1486</p>
          <a href="https://goo.gl/maps/placeholder" target="_blank" rel="noopener noreferrer" style={{color: 'var(--church-blue)', marginTop: '10px', display: 'block', fontWeight: 'bold'}}>Get Directions →</a>
        </div>

        <div className="card">
          <h3><Calendar size={20}/> Next Event</h3>
          <p>Join us for our next gathering.</p>
          <Link to="/events" style={{color: 'var(--church-blue)', marginTop: '10px', display: 'block', fontWeight: 'bold'}}>View Calendar →</Link>
        </div>
      </div>

      {/* Map Section */}
      <div className="map-section">
        <div className="map-container">
          <div style={{flex: 1, padding: '20px'}}>
            <h2 style={{color: 'var(--church-blue)', fontSize: '2rem', marginBottom: '15px'}}>Welcome Home</h2>
            <p style={{fontSize: '1rem', lineHeight: '1.6'}}>At Abundant Rain Church, we believe in the power of God to transform lives. Our doors are always open to you.</p>
          </div>
          <div style={{flex: 1, height: '300px', width: '100%', background: '#ddd', borderRadius: '10px', overflow: 'hidden'}}>
            <iframe title="Church Location" src="https://www.google.com/maps?q=12669+Umsimbithi+Dr,+Vosloorus,+1486&output=embed" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
          </div>
        </div>
      </div>

      <div style={{ padding: '60px 20px', backgroundColor: '#f9fafb' }}>
        <div className="container" style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h2 style={{ color: 'var(--church-blue)', fontSize: '2.5rem', marginBottom: '15px' }}>Who We Are</h2>
            <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--church-gold)', marginBottom: '20px' }}></div>
            <p style={{ marginBottom: '20px', color: '#555', fontSize: '1rem', lineHeight: '1.6' }}>
              Abundant Rain Church is more than just a building; we are a community of believers passionate about God's presence.
              Our mission is to raising winners and build destinies through the power of the Word.
            </p>
            <Link to="/history" className="btn btn-primary">Read Our Story</Link>
          </div>
          
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <img src={HomeImage} alt="Pastor Ernest" style={{ width: '100%', borderRadius: '10px', height: '200px', objectFit: 'cover' }} />
            <img src={Worship} alt="Worship" style={{ width: '100%', borderRadius: '10px', height: '200px', objectFit: 'cover' }} />
          </div>
        </div>
      </div>
    </div>
  );
}