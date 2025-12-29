import { useState } from 'react';
import api from '../apiClient';
import { Phone, MapPin, Mail, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', contactNumber: '', request: '', isAnonymous: false });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/prayers', formData);
      setSubmitted(true);
    } catch (error) {
      alert('Error sending request. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="container" style={{padding: '60px 20px', textAlign: 'center'}}>
        <div style={{backgroundColor: '#d1fae5', padding: '40px', borderRadius: '10px', display: 'inline-block'}}>
          <h2 style={{color: '#065f46'}}>Request Received</h2>
          <p>We are standing in agreement with you. Your request has been sent to our prayer team.</p>
          <button onClick={() => setSubmitted(false)} className="btn btn-primary" style={{marginTop: '20px'}}>Send Another</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <div style={{height: '250px', backgroundColor: 'var(--church-blue)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
        <div>
          <h1 style={{fontSize: '2.5rem'}}>Contact & Prayer</h1>
          <p>How can we serve you today?</p>
        </div>
      </div>

      <div className="container" style={{padding: '60px 20px', display: 'flex', gap: '50px', flexWrap: 'wrap'}}>
        
        {/* Contact Info */}
        <div style={{flex: 1, minWidth: '300px'}}>
          <h2 style={{color: 'var(--church-blue)', marginBottom: '20px'}}>Get in Touch</h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            <div className="card" style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
              <Phone color="var(--church-gold)"/> <div><strong>Counseling Hotline:</strong><br/>+27 76 144 1433</div>
            </div>
            <div className="card" style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
              <MapPin color="var(--church-gold)"/> <div><strong>Visit Us:</strong><br/>12669 Umsimbithi Dr, Vosloorus</div>
            </div>
            <div className="card" style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
              <Mail color="var(--church-gold)"/> <div><strong>Email:</strong><br/>info@abundantrain.com</div>
            </div>
          </div>
        </div>

        {/* Prayer Form */}
        <div style={{flex: 1, minWidth: '300px'}}>
          <div className="card" style={{borderTop: '5px solid var(--church-gold)'}}>
            <h2 style={{marginBottom: '15px'}}>Send a Prayer Request</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', cursor: 'pointer'}}>
                  <input type="checkbox" checked={formData.isAnonymous} onChange={e => setFormData({...formData, isAnonymous: e.target.checked})} />
                  Keep this Anonymous
                </label>
              </div>

              {!formData.isAnonymous && (
                <>
                  <div className="form-group">
                    <input className="form-control" placeholder="Your Name" required 
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <input className="form-control" placeholder="Phone Number (Optional)" 
                      value={formData.contactNumber} onChange={e => setFormData({...formData, contactNumber: e.target.value})} />
                  </div>
                </>
              )}

              <div className="form-group">
                <textarea className="form-control" placeholder="How can we pray for you?" required style={{height: '150px'}}
                  value={formData.request} onChange={e => setFormData({...formData, request: e.target.value})}></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{width: '100%', justifyContent: 'center'}}>
                <Send size={18}/> Send Request
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}