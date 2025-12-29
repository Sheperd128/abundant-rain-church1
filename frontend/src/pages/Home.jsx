import { Link } from 'react-router-dom';
import { MapPin, Clock, Calendar, PlayCircle, ArrowRight } from 'lucide-react';
import HomeImage from '../images/Homepage.jpeg';
import Worship from '../images/PrayerHome.jpeg';

export default function Home() {
  return (
    <div>
      {/* ================= HERO SECTION ================= */}
      <div className="hero-section" style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
        minHeight: '85vh', // Taller for better impact
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        position: 'relative',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed' // Parallax effect
      }}>
        <div className="hero-overlay" style={{
          position: 'absolute', inset: 0, backgroundColor: 'rgba(24, 44, 91, 0.75)'
        }}></div>
        
        <div className="hero-content" style={{ position: 'relative', zIndex: 2, padding: '20px', maxWidth: '900px' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
            fontWeight: '800', 
            lineHeight: 1.1, 
            marginBottom: '15px',
            textShadow: '0 4px 15px rgba(0,0,0,0.3)'
          }}>
            Welcome to <br/> <span style={{color: 'var(--church-gold)'}}>Abundant Rain Church</span>
          </h1>
          <h2 style={{
            fontSize: 'clamp(1.2rem, 3vw, 2rem)', 
            fontWeight: '300', 
            marginBottom: '25px', 
            letterSpacing: '1px'
          }}>
            Vosloorus Campus
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.4rem)', 
            marginBottom: '40px', 
            opacity: 0.9, 
            maxWidth: '600px', 
            margin: '0 auto 40px auto'
          }}>
            Raising Winners, Building Destinies through the power of the Word.
          </p>
          
          <div style={{display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap'}}>
            <Link to="/live" className="btn btn-red" style={{padding: '15px 30px', fontSize: '1.1rem', borderRadius: '50px'}}>
              <PlayCircle size={22} fill="white" /> Watch Live
            </Link>
            <Link to="/contact" className="btn" style={{
              backgroundColor: 'white', 
              color: 'var(--church-blue)', 
              padding: '15px 30px', 
              fontSize: '1.1rem', 
              borderRadius: '50px'
            }}>
              Plan a Visit
            </Link>
          </div>
        </div>
      </div>

      {/* ================= VERSE SECTION ================= */}
      <div style={{ backgroundColor: 'var(--church-blue)', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
        <div className="container">
          <h4 style={{ color: 'var(--church-gold)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.85rem', marginBottom: '15px', fontWeight: 'bold' }}>
            Verse of the Day
          </h4>
          <p style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontStyle: 'italic', fontFamily: 'serif', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
            "But those who wait on the Lord shall renew their strength; They shall mount up with wings like eagles."
          </p>
          <p style={{ marginTop: '20px', fontWeight: 'bold', color: '#ccc' }}>— Isaiah 40:31</p>
        </div>
      </div>

      {/* ================= INFO CARDS ================= */}
      <div className="container" style={{ marginTop: '-50px', position: 'relative', zIndex: 10, padding: '0 20px' }}>
        <div className="info-cards" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {/* Card 1 */}
          <div className="card" style={{ padding: '40px 30px', backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', borderTop: '5px solid var(--church-gold)' }}>
            <h3 style={{ color: 'var(--church-blue)', fontSize: '1.5rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={24} color="var(--church-gold)" /> Service Times
            </h3>
            <div style={{ color: '#555', lineHeight: '1.8' }}>
              <p><strong>Sunday:</strong> 10:00 AM - 12:00 PM</p>
              <p><strong>Thursday:</strong> 06:00 PM (Home Cell)</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card" style={{ padding: '40px 30px', backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', borderTop: '5px solid var(--church-blue)' }}>
            <h3 style={{ color: 'var(--church-blue)', fontSize: '1.5rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={24} color="var(--church-blue)" /> Visit Us
            </h3>
            <p style={{ color: '#555', marginBottom: '15px' }}>12669 Umsimbithi Dr,<br/> Vosloorus, 1486</p>
            <a 
              href="https://goo.gl/maps/placeholder" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: 'var(--church-blue)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              Get Directions <ArrowRight size={16} />
            </a>
          </div>

          {/* Card 3 */}
          <div className="card" style={{ padding: '40px 30px', backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', borderTop: '5px solid var(--church-gold)' }}>
            <h3 style={{ color: 'var(--church-blue)', fontSize: '1.5rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Calendar size={24} color="var(--church-gold)" /> Next Event
            </h3>
            <p style={{ color: '#555', marginBottom: '15px' }}>Join us for our next gathering. Everyone is welcome.</p>
            <Link to="/events" style={{ color: 'var(--church-blue)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
              View Calendar <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* ================= MAP SECTION ================= */}
      <div style={{ padding: '100px 20px 60px 20px' }}>
        <div className="container map-container" style={{ 
          display: 'flex', 
          gap: '50px', 
          alignItems: 'center',
          flexWrap: 'wrap' // Ensures stacking on mobile
        }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h2 style={{ color: 'var(--church-blue)', fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '20px', fontWeight: 'bold' }}>Welcome Home</h2>
            <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--church-gold)', marginBottom: '30px' }}></div>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#555', marginBottom: '30px' }}>
              At Abundant Rain Church, we believe in the power of God to transform lives. Whether you are visiting for the first time or looking for a spiritual home, our doors are always open to you.
            </p>
            <Link to="/contact" className="btn btn-primary">Contact Us</Link>
          </div>
          <div style={{ 
            flex: 1, 
            minWidth: '300px', 
            height: '400px', 
            borderRadius: '20px', 
            overflow: 'hidden', 
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)' 
          }}>
            {/* Real Google Maps Embed for Vosloorus */}
            <iframe 
              title="Church Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3576.626607297926!2d28.2044!3d-26.3069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDE4JzI0LjgiUyAyOMKwMTInMTUuOCJF!5e0!3m2!1sen!2sza!4v1600000000000!5m2!1sen!2sza"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* ================= WHO WE ARE ================= */}
      <div style={{ padding: '80px 20px', backgroundColor: '#f9fafb' }}>
        <div className="container" style={{ display: 'flex', gap: '60px', alignItems: 'center', flexWrap: 'wrap-reverse' }}>
          
          {/* Image Collage */}
          <div style={{ flex: 1, minWidth: '300px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
            <img src={HomeImage} alt="Pastor Ernest" style={{ width: '100%', borderRadius: '15px', height: '250px', objectFit: 'cover', marginTop: '30px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} />
            <img src={Worship} alt="Worship" style={{ width: '100%', borderRadius: '15px', height: '250px', objectFit: 'cover', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} />
          </div>

          {/* Text Content */}
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h2 style={{ color: 'var(--church-blue)', fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '20px', fontWeight: 'bold' }}>Who We Are</h2>
            <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--church-gold)', marginBottom: '30px' }}></div>
            <p style={{ marginBottom: '20px', color: '#555', fontSize: '1.1rem', lineHeight: '1.7' }}>
              Abundant Rain Church is more than just a building; we are a community of believers passionate about God's presence.
              Our mission is to change lives and build destinies through the power of the Word.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '30px', color: '#555' }}>
              <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--church-gold)' }}></div> Spirit-Filled Worship
              </li>
              <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--church-gold)' }}></div> Biblical Teaching
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--church-gold)' }}></div> Community Impact
              </li>
            </ul>
            <Link to="/about" className="btn btn-primary" style={{ padding: '12px 25px' }}>Read Our Story</Link>
          </div>
        </div>
      </div>
    </div>
  );
}