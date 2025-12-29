import React, { useState } from 'react';
import { Music, Video, HandHeart, CheckCircle, Users, BookOpen, Flame, Heart } from 'lucide-react';
import api from '../apiClient'; 

export default function GetInvolved() {
  const sectionHeaderStyle = { color: 'var(--church-blue)', fontSize: '2rem', marginBottom: '20px', textAlign: 'center' };
  
  // ALL MINISTRY DATA FROM YOUR TEXT
  const ministryList = [
    {
      title: "Men’s Ministry",
      subtitle: "Raising Godly Men of Faith, Character, and Influence",
      desc: "Committed to raising strong, responsible, and spiritually grounded men who lead with integrity. We equip men to walk in biblical masculinity.",
      focus: ["Spiritual growth", "Leadership & Mentorship", "Family & Fatherhood", "Brotherhood"],
      icon: <Users size={30} color="var(--church-blue)"/>
    },
    {
      title: "Women’s Ministry",
      subtitle: "Empowering Women to Live, Lead, and Flourish",
      desc: "Nurturing and equipping women of all ages to grow spiritually and discover their purpose. A supportive environment strengthened through the Word.",
      focus: ["Spiritual growth", "Identity in Christ", "Marriage & Family", "Compassion & Outreach"],
      icon: <Heart size={30} color="var(--church-blue)"/>
    },
    {
      title: "Children’s Ministry",
      subtitle: "Building a Godly Foundation",
      desc: "Dedicated to teaching children the love of God in a safe, joyful environment. Helping every child develop a personal relationship with Jesus.",
      focus: ["Bible teaching", "Worship for kids", "Character formation", "Fun & Creativity"],
      icon: <HandHeart size={30} color="var(--church-blue)"/>
    },
    {
      title: "Youth Ministry",
      subtitle: "Raising Purposeful, Passionate Leaders",
      desc: "Equipping young people to know Christ and impact their world. Through relevant teaching and mentorship, we help them discover their destiny.",
      focus: ["Faith & Discipleship", "Leadership skills", "Peer fellowship", "Evangelism"],
      icon: <Flame size={30} color="var(--church-blue)"/>
    },
    {
      title: "Home Cells",
      subtitle: "Growing Together in Faith and Fellowship",
      desc: "The heartbeat of Abundant Rain Church. Small groups meeting in homes for prayer, Bible study, and mutual support in a family-like setting.",
      focus: ["Bible Study", "Fellowship & Care", "Accountability", "Integration"],
      icon: <Users size={30} color="var(--church-blue)"/>
    },
    {
      title: "Bible School",
      subtitle: "Equipping Believers with Sound Doctrine",
      desc: "Training believers in the Word of God. We combine solid biblical teaching with practical application to prepare students for effective ministry.",
      focus: ["Theology", "Leadership", "Spiritual Discipline", "Practical Ministry"],
      icon: <BookOpen size={30} color="var(--church-blue)"/>
    },
    {
      title: "Prayer Ministry",
      subtitle: "Standing in the Gap",
      desc: "The spiritual engine of the church. Committed to interceding for leadership, families, and nations through corporate prayer and fasting.",
      focus: ["Corporate Prayer", "Intercession", "Spiritual Warfare", "Fasting"],
      icon: <Flame size={30} color="var(--church-blue)"/>
    },
    {
      title: "Ushering Ministry",
      subtitle: "Serving with Excellence and Love",
      desc: "The first point of contact for worshippers. Serving with joy and hospitality to ensure a welcoming and orderly worship experience.",
      focus: ["Hospitality", "Order & Assistance", "Care for visitors", "Excellence"],
      icon: <HandHeart size={30} color="var(--church-blue)"/>
    }
  ];

  return (
    <div>
      {/* Hero */}
      <div style={{ backgroundColor: 'var(--church-blue)', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Get Involved</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--church-gold)', maxWidth: '600px', margin: '10px auto' }}>
          You Belong. You Are Needed. You Can Make a Difference.
        </p>
      </div>

      <div className="container" style={{ padding: '60px 20px' }}>
        
        {/* Intro */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p style={{ fontSize: '1.1rem', color: '#555', maxWidth: '800px', margin: '0 auto' }}>
            At Abundant Rain Church, we believe that church is not just a place to attend, but a family to belong to. 
            God has placed gifts inside you, and there is a place for you to grow, serve, and thrive.
          </p>
        </div>

        {/* 1. SPECIALIZED MINISTRIES (Worship & Media - Highlighted) */}
        <h2 style={sectionHeaderStyle}>Creative & Technical Arts</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginBottom: '80px' }}>
          
          {/* Worship */}
          <div className="card" style={{ padding: '30px', borderTop: '5px solid var(--church-gold)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <Music size={30} color="var(--church-blue)" />
              <h2 style={{ margin: 0, color: 'var(--church-blue)' }}>Worship Ministry</h2>
            </div>
            <p style={{ fontStyle: 'italic', color: '#666' }}>Leading God’s People into His Presence</p>
            <p style={{ margin: '15px 0', fontSize: '0.95rem', lineHeight: '1.6' }}>
              We believe worship is more than music—it is a lifestyle. Our team creates an atmosphere where lives are transformed.
            </p>
            <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: '#555' }}>
              <li>Vocalists & Choir</li>
              <li>Instrumentalists (Keyboard, Drums, Bass, Guitar)</li>
              <li>Worship Leaders</li>
            </ul>
          </div>

          {/* Media */}
          <div className="card" style={{ padding: '30px', borderTop: '5px solid var(--church-gold)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <Video size={30} color="var(--church-blue)" />
              <h2 style={{ margin: 0, color: 'var(--church-blue)' }}>Media Ministry</h2>
            </div>
            <p style={{ fontStyle: 'italic', color: '#666' }}>Using Technology to Extend God’s Kingdom</p>
            <p style={{ margin: '15px 0', fontSize: '0.95rem', lineHeight: '1.6' }}>
              We leverage technology to glorify God, enhancing worship experiences and extending our reach globally.
            </p>
            <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: '#555' }}>
              <li>Live Streaming & Camera Ops</li>
              <li>Sound Engineering</li>
              <li>Graphic Design & Social Media</li>
            </ul>
          </div>
        </div>

        {/* 2. ALL OTHER MINISTRIES (Grid) */}
        <h2 style={sectionHeaderStyle}>Ministry Directory</h2>
        <p style={{textAlign:'center', marginBottom: '40px', color: '#666'}}>Find where you fit in the body of Christ.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '80px' }}>
          {ministryList.map((min, index) => (
            <div key={index} style={{backgroundColor: 'white', padding: '25px', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 10px rgba(0,0,0,0.05)'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px'}}>
                {min.icon}
                <h3 style={{margin: 0, fontSize: '1.2rem', color: 'var(--church-blue)'}}>{min.title}</h3>
              </div>
              <h5 style={{color: 'var(--church-gold)', fontSize: '0.9rem', marginBottom: '10px'}}>{min.subtitle}</h5>
              <p style={{fontSize: '0.9rem', color: '#555', marginBottom: '15px', lineHeight: '1.5'}}>{min.desc}</p>
              <div style={{background: '#f9f9f9', padding: '10px', borderRadius: '5px'}}>
                 <strong style={{fontSize: '0.8rem', color: '#333'}}>Focus:</strong>
                 <div style={{display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '5px'}}>
                   {min.focus.map((f, i) => (
                     <span key={i} style={{fontSize: '0.75rem', background: '#eef2ff', padding: '2px 8px', borderRadius: '4px', color: 'var(--church-blue)'}}>{f}</span>
                   ))}
                 </div>
              </div>
            </div>
          ))}
        </div>

        {/* 3. VOLUNTEER FORM */}
        <div id="volunteer-form" style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#f9fafb', padding: '40px', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', borderTop: '5px solid var(--church-blue)' }}>
          <h2 style={{ ...sectionHeaderStyle, marginBottom: '10px' }}>Ministry Sign-Up Form</h2>
          <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666' }}>Thank you for your desire to serve. Please complete this form.</p>
          
          <VolunteerForm />
        </div>

      </div>
    </div>
  );
}

// REPLACE THE OLD VolunteerForm FUNCTION WITH THIS ONE:
function VolunteerForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // State for all fields
  const [formData, setFormData] = useState({
    fullName: '', phone: '', email: '', address: '', ageGroup: '18-25',
    attendanceDuration: 'First time visitor', isMember: 'No',
    skills: '', availability: 'Sundays Only'
  });

  // State for checkboxes
  const [selectedMinistries, setSelectedMinistries] = useState([]);

  const handleMinistryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedMinistries([...selectedMinistries, value]);
    } else {
      setSelectedMinistries(selectedMinistries.filter(m => m !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Combine data
    const submissionData = {
      ...formData,
      ministries: selectedMinistries
    };

    try {
      await api.post('/volunteers', submissionData);
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch (error) {
      alert('Error sending application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <CheckCircle size={60} color="green" style={{ margin: '0 auto 20px' }} />
        <h3 style={{ color: 'var(--church-blue)' }}>Application Received!</h3>
        <p>Thank you for stepping up to serve. A ministry leader will contact you soon.</p>
        <button onClick={() => window.location.reload()} className="btn btn-gold" style={{ marginTop: '20px' }}>Back to Home</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* SECTION 1 */}
      <h4 style={{ color: 'var(--church-gold)', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginTop: '20px' }}>1. Personal Info</h4>
      <div className="form-row">
        <input
          className="form-control" placeholder="Full Name *" required 
          value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} 
          style={{flex: 1}} 
        />
        <input
          className="form-control" placeholder="Phone (WhatsApp) *" required 
          value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} 
          style={{flex: 1}} 
        />
      </div>
      <input
        className="form-control" placeholder="Email Address *" type="email" required 
        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} 
        style={{ width: '100%', marginTop: '15px' }} 
      />
      <input
        className="form-control" placeholder="Home Address / Area" 
        value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} 
        style={{ width: '100%', marginTop: '15px' }} 
      />
      
      <div style={{ marginTop: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Age Group *</label>
        <select className="form-control" style={{ width: '100%' }} value={formData.ageGroup} onChange={e => setFormData({...formData, ageGroup: e.target.value})}>
          <option>Under 18</option>
          <option>18-25</option>
          <option>26-40</option>
          <option>41-60</option>
          <option>60+</option>
        </select>
      </div>

      {/* SECTION 2 */}
      <h4 style={{ color: 'var(--church-gold)', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginTop: '30px' }}>2. Church Connection</h4>
      <div className="form-row">
         <div style={{flex:1}}>
           <label style={{fontSize:'0.8rem'}}>Attendance</label>
           <select className="form-control" value={formData.attendanceDuration} onChange={e => setFormData({...formData, attendanceDuration: e.target.value})}>
             <option>First time visitor</option>
             <option>Less than 3 months</option>
             <option>Over 6 months</option>
           </select>
         </div>
         <div style={{flex:1}}>
           <label style={{fontSize:'0.8rem'}}>Are you in a Home Cell?</label>
           <select className="form-control" value={formData.isMember} onChange={e => setFormData({...formData, isMember: e.target.value})}>
             <option>No</option>
             <option>Yes</option>
           </select>
         </div>
      </div>

      {/* SECTION 3 */}
      <h4 style={{ color: 'var(--church-gold)', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginTop: '30px' }}>3. Ministry Interest</h4>
      <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '10px' }}>Check all that apply:</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {['Men’s Ministry', 'Women’s Ministry', 'Youth Ministry', 'Children’s Ministry', 'Worship / Music', 'Media / Tech', 'Ushering', 'Prayer', 'Evangelism', 'Bible School Support'].map(m => (
          <label key={m} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
            <input type="checkbox" value={m} onChange={handleMinistryChange} /> {m}
          </label>
        ))}
      </div>

      {/* SECTION 4 */}
      <h4 style={{ color: 'var(--church-gold)', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginTop: '30px' }}>4. Skills & Availability</h4>
      <textarea 
        className="form-control" placeholder="Skills or talents..." 
        value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})}
        style={{ width: '100%', height: '80px', marginTop: '10px' }}
      ></textarea>
      
      <div style={{ marginTop: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Availability:</label>
        <select className="form-control" style={{ width: '100%' }} value={formData.availability} onChange={e => setFormData({...formData, availability: e.target.value})}>
          <option>Sundays Only</option>
          <option>Weekdays & Sundays</option>
          <option>Special Events Only</option>
        </select>
      </div>

      <div style={{marginTop: '30px', padding: '15px', background: '#eef2ff', borderRadius: '5px', fontSize: '0.8rem', color: '#444'}}>
        <strong>Declaration:</strong> I understand that serving in ministry is a spiritual responsibility. I commit to serving faithfully.
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '15px', fontSize: '1.1rem' }}>
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </form>
  );
}