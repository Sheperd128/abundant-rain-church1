import React from 'react';
import { Users, Heart, BookOpen, Flame, Music, Video, Star, Hand } from 'lucide-react';

export default function Ministries() {
  const ministries = [
    {
      title: "Men’s Ministry",
      icon: <Users size={32} />,
      desc: "Raising strong, responsible, and spiritually grounded men who lead with integrity in their homes and society.",
      focus: "Leadership, Mentorship, Fatherhood"
    },
    {
      title: "Women’s Ministry",
      icon: <Heart size={32} />,
      desc: "Empowering women to grow spiritually, discover their purpose, and walk boldly in God’s calling.",
      focus: "Prayer, Identity, Marriage & Family"
    },
    {
      title: "Children’s Ministry",
      icon: <Star size={32} />,
      desc: "Teaching children the love of God in a safe, joyful environment to help them develop a personal relationship with Jesus.",
      focus: "Bible Teaching, Character Formation, Fun"
    },
    {
      title: "Youth Ministry",
      icon: <Flame size={32} />,
      desc: "Equipping young people to know Christ, stand firm in their faith, and impact their world positively.",
      focus: "Discipleship, Life Skills, Peer Mentorship"
    },
    {
      title: "Home Cells",
      icon: <Users size={32} />,
      desc: "The heartbeat of our church. Small groups meeting in homes for prayer, study, and family-like support.",
      focus: "Fellowship, Care, Spiritual Growth"
    },
    {
      title: "Bible School",
      icon: <BookOpen size={32} />,
      desc: "Training believers in the Word of God to prepare them for effective Christian living and ministry.",
      focus: "Theology, Doctrine, Leadership Training"
    },
    {
      title: "Worship Ministry",
      icon: <Music size={32} />,
      desc: "Leading the congregation into deep, Spirit-filled worship through music and excellence.",
      focus: "Vocal Training, Spiritual Formation"
    },
    {
      title: "Media Ministry",
      icon: <Video size={32} />,
      desc: "Using technology, cameras, and social media to extend God’s Kingdom locally and globally.",
      focus: "Live Streaming, Sound Engineering, Graphics"
    },
    {
      title: "Prayer Ministry",
      icon: <Flame size={32} />,
      desc: "Standing in the gap through intercession. The spiritual engine of Abundant Rain Church.",
      focus: "Intercession, Spiritual Warfare, Fasting"
    },
    {
      title: "Ushering Ministry",
      icon: <Hand size={32} />,
      desc: "Serving with excellence and hospitality to ensure a welcoming and orderly worship experience.",
      focus: "Hospitality, Order, Visitor Care"
    }
  ];

  return (
    <div style={{backgroundColor: '#f9f9f9', minHeight: '100vh'}}>
      {/* Header */}
      <div style={{ 
        backgroundColor: 'var(--church-blue)', 
        color: 'white', 
        padding: '80px 20px', 
        textAlign: 'center',
        backgroundImage: 'linear-gradient(to bottom, var(--church-blue), #0f1c3f)'
      }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '15px', fontWeight: 'bold' }}>Our Ministries</h1>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--church-gold)', maxWidth: '600px', margin: '0 auto' }}>
          A Place for Everyone to Serve & Grow
        </p>
      </div>

      <div className="container" style={{ padding: '60px 20px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '30px' 
        }}>
          {ministries.map((min, index) => (
            <div 
              key={index} 
              className="card" 
              style={{ 
                padding: '30px', 
                borderTop: '5px solid var(--church-gold)', 
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ 
                color: 'var(--church-blue)', 
                marginBottom: '20px', 
                backgroundColor: '#eef2ff', 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                {min.icon}
              </div>
              
              <h3 style={{ color: 'var(--church-blue)', marginBottom: '15px', fontSize: '1.4rem' }}>{min.title}</h3>
              
              <p style={{ color: '#555', marginBottom: '20px', lineHeight: '1.6', fontSize: '0.95rem', flex: 1 }}>
                {min.desc}
              </p>
              
              <div style={{ 
                backgroundColor: '#fff9e6', 
                padding: '12px', 
                borderRadius: '8px', 
                fontSize: '0.85rem', 
                color: '#856404',
                borderLeft: '3px solid var(--church-gold)'
              }}>
                <strong>Focus:</strong> {min.focus}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}