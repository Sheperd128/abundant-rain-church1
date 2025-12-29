import React from 'react';
import { Users, Heart, BookOpen, Flame, Music, Video, Star, Hand } from 'lucide-react';

export default function Ministries() {
  const ministries = [
    {
      title: "Men’s Ministry",
      icon: <Users size={30} />,
      desc: "Raising strong, responsible, and spiritually grounded men who lead with integrity in their homes and society.",
      focus: "Leadership, Mentorship, Fatherhood"
    },
    {
      title: "Women’s Ministry",
      icon: <Heart size={30} />,
      desc: "Empowering women to grow spiritually, discover their purpose, and walk boldly in God’s calling.",
      focus: "Prayer, Identity, Marriage & Family"
    },
    {
      title: "Children’s Ministry",
      icon: <Star size={30} />,
      desc: "Teaching children the love of God in a safe, joyful environment to help them develop a personal relationship with Jesus.",
      focus: "Bible Teaching, Character Formation, Fun"
    },
    {
      title: "Youth Ministry",
      icon: <Flame size={30} />,
      desc: "Equipping young people to know Christ, stand firm in their faith, and impact their world positively.",
      focus: "Discipleship, Life Skills, Peer Mentorship"
    },
    {
      title: "Home Cells",
      icon: <Users size={30} />,
      desc: "The heartbeat of our church. Small groups meeting in homes for prayer, study, and family-like support.",
      focus: "Fellowship, Care, Spiritual Growth"
    },
    {
      title: "Bible School",
      icon: <BookOpen size={30} />,
      desc: "Training believers in the Word of God to prepare them for effective Christian living and ministry.",
      focus: "Theology, Doctrine, Leadership Training"
    },
    {
      title: "Worship Ministry",
      icon: <Music size={30} />,
      desc: "Leading the congregation into deep, Spirit-filled worship through music and excellence.",
      focus: "Vocal Training, Spiritual Formation"
    },
    {
      title: "Media Ministry",
      icon: <Video size={30} />,
      desc: "Using technology, cameras, and social media to extend God’s Kingdom locally and globally.",
      focus: "Live Streaming, Sound Engineering, Graphics"
    },
    {
      title: "Prayer Ministry",
      icon: <Flame size={30} />,
      desc: "Standing in the gap through intercession. The spiritual engine of Abundant Rain Church.",
      focus: "Intercession, Spiritual Warfare, Fasting"
    },
    {
      title: "Ushering Ministry",
      icon: <Hand size={30} />,
      desc: "Serving with excellence and hospitality to ensure a welcoming and orderly worship experience.",
      focus: "Hospitality, Order, Visitor Care"
    }
  ];

  return (
    <div>
      <div style={{ backgroundColor: 'var(--church-blue)', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>Our Ministries</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--church-gold)' }}>A Place for Everyone to Serve & Grow</p>
      </div>

      <div className="container" style={{ padding: '60px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {ministries.map((min, index) => (
            <div key={index} className="card" style={{ padding: '30px', borderTop: '4px solid var(--church-gold)' }}>
              <div style={{ color: 'var(--church-blue)', marginBottom: '20px' }}>{min.icon}</div>
              <h3 style={{ color: 'var(--church-blue)', marginBottom: '10px' }}>{min.title}</h3>
              <p style={{ color: '#555', marginBottom: '20px', lineHeight: '1.6' }}>{min.desc}</p>
              <div style={{ backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '5px', fontSize: '0.85rem', color: '#666' }}>
                <strong>Focus:</strong> {min.focus}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}