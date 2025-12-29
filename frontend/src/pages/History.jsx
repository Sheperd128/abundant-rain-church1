import React from 'react';
import Praise from '../images/Praise.jpeg';

export default function History() {
  const sectionTitle = { color: 'var(--church-blue)', marginBottom: '15px', fontSize: 'clamp(1.5rem, 4vw, 2rem)', borderLeft: '4px solid var(--church-gold)', paddingLeft: '15px' };
  const subHeader = { color: 'var(--church-blue)', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px', marginTop: '25px' };
  const para = { fontSize: '1rem', lineHeight: '1.7', color: '#444', marginBottom: '20px' };

  return (
    <div>
      {/* Hero */}
      <div style={{
        height: '350px',
        backgroundImage: `linear-gradient(rgba(24, 44, 91, 0.8), rgba(24, 44, 91, 0.6)), url(${Praise})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', textAlign: 'center', padding: '0 20px'
      }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 'bold' }}>Our Heritage</h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)', color: 'var(--church-gold)' }}>A Legacy of Faith and Transformation</p>
        </div>
      </div>

      <div className="container" style={{ padding: '60px 20px', maxWidth: '900px' }}>
        
        {/* The Commission */}
        <div style={{ marginBottom: '50px' }}>
          <h2 style={sectionTitle}>The Divine Commission</h2>
          <p style={para}>In December 2006, Abundant Rain Church was established through a sovereign call of God upon the lives of Pastor Ernest and Dr. Tebogo Umanah. Following a clear biblical mandate to resign from their positions at Blessed Hope Fellowship, they embarked on a journey of faith that would impact generations.</p>
          <p style={para}>Like the prophet Elijah who discerned the sound of abundant rain before its manifestation, our founders received divine revelation concerning a coming revival in Vosloorus, a spiritual awakening that would transcend geographical and cultural boundaries.</p>
        </div>

        {/* Vision */}
        <div style={{ marginBottom: '50px', backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '10px', borderLeft: '5px solid var(--church-gold)' }}>
          <h2 style={{color: 'var(--church-blue)', fontSize: '1.8rem', marginBottom: '10px'}}>Our Vision Statement</h2>
          <h3 style={{ color: 'var(--church-gold)', marginTop: 0, fontSize: '1.4rem', textTransform: 'uppercase' }}>To Raise Winners and Build Destinies</h3>
          <p style={para}>This vision drives everything we do. We are dedicated to developing spiritually mature, successful believers who excel in their God-given assignments, while simultaneously creating environments where people encounter God's presence and discover their divine purpose.</p>
        </div>

        {/* Theology Grid */}
        <div style={{ marginBottom: '50px' }}>
          <h2 style={sectionTitle}>Our Theological Foundation</h2>
          <p style={para}>Abundant Rain Church stands firmly on the proclamation of the complete gospel message. We are committed to presenting the full counsel of God's Word, equipping believers for victorious Christian living.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
            {[
              { t: 'Comprehensive Salvation', d: 'Reconciliation with God through Jesus Christ' },
              { t: 'Divine Healing', d: 'Physical and emotional restoration' },
              { t: 'Spiritual Deliverance', d: 'Freedom from bondage and oppression' },
              { t: 'Biblical Prosperity', d: "God's provision across every dimension of life" },
              { t: 'Mental Renewal', d: 'Transformation through the renewing of the mind' }
            ].map((item, i) => (
              <div key={i} style={{ border: '1px solid #eee', padding: '20px', borderRadius: '8px', backgroundColor: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                <strong style={{ color: 'var(--church-blue)', fontSize: '1.1rem' }}>{item.t}</strong>
                <p style={{ color: '#666', fontSize: '0.95rem', margin: '5px 0 0' }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Growth & Influence */}
        <div style={{ marginBottom: '50px' }}>
          <h2 style={sectionTitle}>Our Growth and Influence</h2>
          <p style={para}>Since our inception, Abundant Rain Church has experienced exponential growth and established a reputation for excellence in ministry.</p>

          <h4 style={subHeader}>Leadership Development Excellence</h4>
          <p style={para}>Our Bible school has distinguished itself as a premier training institution, graduating hundreds of Christian leaders who now serve throughout South Africa and internationally. These men and women carry forward the vision of biblical empowerment and practical ministry.</p>

          <h4 style={subHeader}>Multi-Ethnic Congregation</h4>
          <p style={para}>We proudly celebrate our diverse community, where people from various ethnic backgrounds worship together as one family. This reflects our commitment to the biblical vision of unity in the body of Christ.</p>

          <h4 style={subHeader}>Community Revitalization</h4>
          <p style={para}>Our presence has catalyzed significant transformation in Vosloorus. What was once a neglected area has been revitalized through our investment, with our state-of-the-art campus serving as a landmark of hope and progress.</p>

          <h4 style={subHeader}>Global Reach</h4>
          <p style={para}>While rooted locally, our influence extends internationally, with ministry connections and impact across multiple nations.</p>
        </div>

        {/* Join Us CTA */}
        <div style={{ backgroundColor: 'var(--church-blue)', padding: '40px', borderRadius: '15px', color: 'white', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '15px', color: 'var(--church-gold)' }}>Join Our Community</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>
            For nearly two decades, Abundant Rain Church has stood as an institution of faith, excellence, and transformation.
            We invite you to become part of this distinguished legacy and experience the abundant life Christ promised.
          </p>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Abundant Rain Church: Where Excellence Meets Faith.
          </p>
        </div>

      </div>
    </div>
  );
}