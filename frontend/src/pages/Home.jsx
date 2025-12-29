import { Link } from 'react-router-dom';
import { MapPin, Clock, Calendar, PlayCircle, ArrowRight } from 'lucide-react';
import HomeImage from '../images/Homepage.jpeg';
import Worship from '../images/PrayerHome.jpeg';

// --- VERSES DATA ---
const verses = [
  { text: "But those who wait on the Lord shall renew their strength; They shall mount up with wings like eagles.", ref: "Isaiah 40:31" },
  { text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you.", ref: "Jeremiah 29:11" },
  { text: "The Lord is my shepherd; I shall not want.", ref: "Psalm 23:1" },
  { text: "I can do all things through Christ who strengthens me.", ref: "Philippians 4:13" },
  { text: "Trust in the Lord with all your heart and lean not on your own understanding.", ref: "Proverbs 3:5" },
  { text: "And we know that in all things God works for the good of those who love him.", ref: "Romans 8:28" },
  { text: "Be strong and courageous. Do not be afraid; do not be discouraged.", ref: "Joshua 1:9" },
  { text: "The joy of the Lord is your strength.", ref: "Nehemiah 8:10" },
  { text: "Cast all your anxiety on him because he cares for you.", ref: "1 Peter 5:7" },
  { text: "The Lord will fight for you; you need only to be still.", ref: "Exodus 14:14" },
  { text: "Let all that you do be done in love.", ref: "1 Corinthians 16:14" },
  { text: "This is the day that the Lord has made; let us rejoice and be glad in it.", ref: "Psalm 118:24" },
  { text: "If God is for us, who can be against us?", ref: "Romans 8:31" },
  { text: "He heals the brokenhearted and binds up their wounds.", ref: "Psalm 147:3" },
  { text: "For we walk by faith, not by sight.", ref: "2 Corinthians 5:7" },
  { text: "Be still, and know that I am God.", ref: "Psalm 46:10" },
  { text: "The name of the Lord is a strong tower; the righteous run to it and are safe.", ref: "Proverbs 18:10" },
  { text: "Come to me, all you who are weary and burdened, and I will give you rest.", ref: "Matthew 11:28" },
  { text: "My grace is sufficient for you, for my power is made perfect in weakness.", ref: "2 Corinthians 12:9" },
  { text: "Do not be anxious about anything, but in every situation, by prayer and petition, present your requests to God.", ref: "Philippians 4:6" },
  { text: "We love because he first loved us.", ref: "1 John 4:19" },
  { text: "Give thanks to the Lord, for he is good; his love endures forever.", ref: "Psalm 107:1" },
  { text: "Let your light shine before others, that they may see your good deeds and glorify your Father in heaven.", ref: "Matthew 5:16" },
  { text: "The grass withers and the flowers fall, but the word of our God endures forever.", ref: "Isaiah 40:8" },
  { text: "Commit your way to the Lord; trust in him and he will do this.", ref: "Psalm 37:5" },
  { text: "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.", ref: "2 Timothy 1:7" },
  { text: "The Lord is near to all who call on him, to all who call on him in truth.", ref: "Psalm 145:18" },
  { text: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.", ref: "Colossians 3:23" },
  { text: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness.", ref: "Galatians 5:22" },
  { text: "In the beginning was the Word, and the Word was with God, and the Word was God.", ref: "John 1:1" },
  { text: "Surely your goodness and love will follow me all the days of my life.", ref: "Psalm 23:6" }
];

export default function Home() {
  // Logic to pick a verse based on the day of the month (1-31)
  const todayIndex = new Date().getDate() - 1; // 1st = index 0
  // Fallback to index 0 if something goes wrong, or cycle if array is shorter
  const todaysVerse = verses[todayIndex % verses.length]; 

  return (
    <div>
      {/* ================= HERO SECTION ================= */}
      <div className="hero-section" style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        position: 'relative',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
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

      {/* ================= VERSE SECTION (DYNAMIC) ================= */}
      <div style={{ backgroundColor: 'var(--church-blue)', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
        <div className="container">
          <h4 style={{ color: 'var(--church-gold)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.85rem', marginBottom: '15px', fontWeight: 'bold' }}>
            Verse of the Day
          </h4>
          <p style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontStyle: 'italic', fontFamily: 'serif', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
            "{todaysVerse.text}"
          </p>
          <p style={{ marginTop: '20px', fontWeight: 'bold', color: '#ccc' }}>— {todaysVerse.ref}</p>
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
              href="https://www.google.com/maps/search/?api=1&query=12669+Umsimbithi+Dr,+Vosloorus" 
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
          flexWrap: 'wrap'
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
            {/* CORRECTED MAP IFRAME FOR VOSLOORUS ADDRESS */}
            <iframe 
              title="Church Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3576.264789874567!2d28.2036733!3d-26.317565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9518ec8933f37b%3A0x8e6e5806655c65c3!2s12669%20Umsimbithi%20Dr%2C%20Vosloorus%2C%201475!5e0!3m2!1sen!2sza!4v1709123456789!5m2!1sen!2sza"
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
            <img src={HomeImage} alt="Pastor Ernest" style={{ width: '100%', borderRadius: '15px', height: '250px', objectFit: 'cover', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} />
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