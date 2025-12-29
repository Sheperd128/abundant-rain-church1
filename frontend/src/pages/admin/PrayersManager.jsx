import { useState, useEffect } from 'react';
import api from '../../apiClient';
import { CheckCircle, Clock } from 'lucide-react';

export default function PrayersManager() {
  const [prayers, setPrayers] = useState([]);

  useEffect(() => { fetchPrayers(); }, []);

  const fetchPrayers = async () => {
    try {
      const { data } = await api.get('/prayers');
      setPrayers(data);
    } catch (error) { console.error(error); }
  };

  const markRead = async (id) => {
    try {
      await api.put(`/prayers/${id}`, { status: 'Prayed For' });
      fetchPrayers();
    } catch (error) { alert('Error updating status'); }
  };

  return (
    <div>
      <h1>Prayer Wall (Confidential)</h1>
      <div style={{marginTop: '20px', display: 'grid', gap: '15px'}}>
        {prayers.map(prayer => (
          <div key={prayer._id} className="card" style={{borderLeft: prayer.status === 'New' ? '5px solid red' : '5px solid green'}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <div>
                <h4 style={{fontSize: '1.1rem'}}>
                  {prayer.isAnonymous ? "Anonymous Request" : prayer.name}
                </h4>
                {!prayer.isAnonymous && <p style={{color: '#666', fontSize: '0.9rem'}}>Contact: {prayer.contactNumber}</p>}
                <p style={{marginTop: '10px', fontSize: '1.05rem', fontStyle: 'italic'}}>"{prayer.request}"</p>
                <small style={{color: '#999', display: 'block', marginTop: '10px'}}>
                  {new Date(prayer.createdAt).toLocaleString()}
                </small>
              </div>
              <div>
                {prayer.status === 'New' ? (
                  <button onClick={() => markRead(prayer._id)} className="btn btn-gold" style={{fontSize: '0.8rem'}}>
                    <Clock size={14}/> Mark as Prayed
                  </button>
                ) : (
                  <span style={{color: 'green', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold'}}>
                    <CheckCircle size={16}/> Prayed For
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}