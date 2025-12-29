import React from 'react';
import Praise from '../images/Praise.jpeg';

export default function History() {
  const sectionTitle = { color: 'var(--church-blue)', marginBottom: '15px', fontSize: 'clamp(1.5rem, 4vw, 2rem)', borderLeft: '4px solid var(--church-gold)', paddingLeft: '15px' };
  const para = { fontSize: '1rem', lineHeight: '1.7', color: '#444', marginBottom: '20px' };

  return (
    <div>
      {/* Hero */}
      <div style={{
        height: '300px',
        backgroundImage: `linear-gradient(rgba(24, 44, 91, 0.8), rgba(24, 44, 91, 0.6)), url(${Praise})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', textAlign: 'center', padding: '0 20px'
      }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 'bold' }}>Our History</h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)', color: 'var(--church-gold)' }}>A Legacy of Faith and Transformation</p>
        </div>
      </div>

      <div className="container" style={{ padding: '60px 20px', maxWidth: '900px' }}>
        
        {/* The Commission */}
        <div style={{ marginBottom: '50px' }}>
          <h2 style={sectionTitle}>The Divine Commission</h2>
          <p style={para}>In December 2006, Abundant Rain Church was established through a sovereign call of God upon the lives of Pastor Ernest and Dr. Tebogo Umanah.</p>
          <p style={para}>Like the prophet Elijah who discerned the sound of abundant rain before its manifestation, our founders received divine revelation concerning a coming revival in Vosloorus.</p>
        </div>

        {/* Vision */}
        <div style={{ marginBottom: '50px', backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '10px' }}>
          <h2 style={sectionTitle}>Our Vision Statement</h2>
          <h3 style={{ color: 'var(--church-blue)', marginTop: 0, fontSize: '1.3rem' }}>To Raise Winners and Build Destinies</h3>
          <p style={para}>This vision drives everything we do. We are dedicated to developing spiritually mature, successful believers.</p>
        </div>

        {/* Theology Grid */}
        <div style={{ marginBottom: '50px' }}>
          <h2 style={sectionTitle}>Our Theological Foundation</h2>
          <p style={para}>Abundant Rain Church stands firmly on the proclamation of the complete gospel message.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
            {[
              { t: 'Salvation', d: 'Reconciliation with God through Jesus Christ' },
              { t: 'Divine Healing', d: 'Physical and emotional restoration' },
              { t: 'Spiritual Deliverance', d: 'Freedom from bondage and oppression' },
              { t: 'Biblical Prosperity', d: "God's provision across every dimension of life" },
              { t: 'Mental Renewal', d: 'Transformation through the renewing of the mind' }
            ].map((item, i) => (
              <div key={i} style={{ border: '1px solid #eee', padding: '15px', borderRadius: '8px', backgroundColor: 'white' }}>
                <strong style={{ color: 'var(--church-blue)' }}>{item.t}:</strong>
                <p style={{ color: '#666', fontSize: '0.9rem', margin: '5px 0 0' }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}