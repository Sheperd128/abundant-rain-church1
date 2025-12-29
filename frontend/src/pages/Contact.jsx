import { useState } from 'react';
import api from '../apiClient';
import { Phone, MapPin, Send, MessageCircle } from 'lucide-react'; // Removed Mail icon

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', contactNumber: '', request: '', isAnonymous: false });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/prayers', formData);
      setSubmitted(true);
      setFormData({ name: '', contactNumber: '', request: '', isAnonymous: false });
    } catch (error) {
      alert('Error sending request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="container" style={{padding: '100px 20px', textAlign: 'center'}}>
        <div style={{backgroundColor: '#ecfdf5', padding: '50px', borderRadius: '15px', display: 'inline-block', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', maxWidth: '500px'}}>
          <div style={{background: '#10b981', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px'}}>
            <Send color="white" size={30} />
          </div>
          <h2 style={{color: '#065f46', marginBottom: '10px'}}>Request Received</h2>
          <p style={{color: '#4b5563', marginBottom: '25px', fontSize: '1.1rem'}}>
            We are standing in agreement with you. Your request has been sent securely to our prayer team.
          </p>
          <button onClick={() => setSubmitted(false)} className="btn btn-primary">Send Another Request</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Header */}
      <div style={{
        backgroundColor: 'var(--church-blue)', 
        color: 'white', 
        padding: '80px 20px', 
        textAlign: 'center',
        backgroundImage: 'linear-gradient(to bottom, var(--church-blue), #0f1c3f)'
      }}>
        <h1 style={{fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 'bold', marginBottom: '10px'}}>Contact & Prayer</h1>
        <p style={{fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--church-gold)'}}>How can we serve you today?</p>
      </div>

      <div className="container" style={{padding: '60px 20px', display: 'flex', gap: '60px', flexWrap: 'wrap'}}>
        
        {/* LEFT COLUMN: Contact Info */}
        <div style={{flex: 1, minWidth: '300px'}}>
          <h2 style={{color: 'var(--church-blue)', marginBottom: '30px', fontSize: '2rem'}}>Get in Touch</h2>
          
          <div style={{display: 'flex', flexDirection: 'column', gap: '25px'}}>
            
            <div className="card" style={{display: 'flex', alignItems: 'flex-start', gap: '20px', padding: '25px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)'}}>
              <div style={{background: '#eef2ff', padding: '12px', borderRadius: '50%'}}>
                <Phone color="var(--church-blue)" size={24}/>
              </div>
              <div>
                <h4 style={{margin: '0 0 5px 0', fontSize: '1.1rem'}}>Counseling Hotline</h4>
                <p style={{margin: 0, color: '#555', fontSize: '1rem'}}>+27 76 144 1433</p>
                <small style={{color: '#888'}}>Available for prayer and support.</small>
              </div>
            </div>

            <div className="card" style={{display: 'flex', alignItems: 'flex-start', gap: '20px', padding: '25px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)'}}>
              <div style={{background: '#fff9e6', padding: '12px', borderRadius: '50%'}}>
                <MapPin color="var(--church-gold)" size={24}/>
              </div>
              <div>
                <h4 style={{margin: '0 0 5px 0', fontSize: '1.1rem'}}>Visit Us</h4>
                <p style={{margin: 0, color: '#555', fontSize: '1rem', lineHeight: '1.5'}}>
                  12669 Umsimbithi Dr,<br/> Vosloorus Ext 23, 1486
                </p>
                <a 
                  href="https://goo.gl/maps/placeholder" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{color: 'var(--church-blue)', fontWeight: 'bold', fontSize: '0.9rem', marginTop: '10px', display: 'inline-block'}}
                >
                  Get Directions →
                </a>
              </div>
            </div>

            {/* Additional Info Box */}
            <div style={{background: '#f9fafb', padding: '25px', borderRadius: '10px', marginTop: '10px'}}>
              <h4 style={{color: '#333', marginBottom: '10px'}}>Service Times</h4>
              <ul style={{paddingLeft: '20px', color: '#555', lineHeight: '1.8'}}>
                <li><strong>Sunday:</strong> 10:00 AM - 12:00 PM</li>
                <li><strong>Thursday:</strong> 06:00 PM (Home Cell)</li>
              </ul>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Prayer Form */}
        <div style={{flex: 1, minWidth: '300px'}}>
          <div className="card" style={{borderTop: '5px solid var(--church-gold)', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px'}}>
              <MessageCircle size={28} color="var(--church-gold)" />
              <h2 style={{margin: 0, fontSize: '1.8rem'}}>Send Prayer Request</h2>
            </div>
            <p style={{color: '#666', marginBottom: '25px'}}>
              Our intercessory team prays daily. You can choose to remain anonymous.
            </p>

            <form onSubmit={handleSubmit}>
              
              <div className="form-group" style={{marginBottom: '20px'}}>
                <label style={{display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none', background: '#f9f9f9', padding: '10px', borderRadius: '5px'}}>
                  <input 
                    type="checkbox" 
                    checked={formData.isAnonymous} 
                    onChange={e => setFormData({...formData, isAnonymous: e.target.checked})} 
                    style={{width: '18px', height: '18px'}}
                  />
                  <span style={{fontSize: '0.95rem', color: '#333'}}>Keep this request Anonymous</span>
                </label>
              </div>

              {!formData.isAnonymous && (
                <div style={{display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '15px'}}>
                  <div className="form-group">
                    <label style={{fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '5px', display: 'block'}}>Your Name</label>
                    <input 
                      className="form-control" 
                      placeholder="John Doe" 
                      required 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})} 
                    />
                  </div>
                  <div className="form-group">
                    <label style={{fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '5px', display: 'block'}}>Phone Number (Optional)</label>
                    <input 
                      className="form-control" 
                      placeholder="+27..." 
                      value={formData.contactNumber} 
                      onChange={e => setFormData({...formData, contactNumber: e.target.value})} 
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label style={{fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '5px', display: 'block'}}>How can we pray for you?</label>
                <textarea 
                  className="form-control" 
                  placeholder="Share your prayer request or testimony here..." 
                  required 
                  style={{height: '150px', resize: 'vertical'}}
                  value={formData.request} 
                  onChange={e => setFormData({...formData, request: e.target.value})}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{width: '100%', justifyContent: 'center', marginTop: '20px', padding: '12px'}}
                disabled={loading}
              >
                {loading ? 'Sending...' : <><Send size={18}/> Send Request</>}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}