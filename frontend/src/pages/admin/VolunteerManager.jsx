import { useState, useEffect } from 'react';
import api from '../../apiClient';
import { User, CheckCircle, Phone, Mail } from 'lucide-react';

export default function VolunteerManager() {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => { fetchVolunteers(); }, []);

  const fetchVolunteers = async () => {
    try {
      const { data } = await api.get('/volunteers');
      setVolunteers(data);
    } catch (error) { console.error(error); }
  };

  const markContacted = async (id) => {
    try {
      await api.put(`/volunteers/${id}`, { status: 'Contacted' });
      fetchVolunteers();
    } catch (error) { alert('Error updating status'); }
  };

  return (
    <div>
      <h1>Ministry Applications</h1>
      <p style={{color: '#666', marginBottom: '20px'}}>Manage new volunteers and sign-ups.</p>

      <div style={{display: 'grid', gap: '20px'}}>
        {volunteers.map(vol => (
          <div key={vol._id} className="card" style={{borderLeft: vol.status === 'New' ? '5px solid var(--church-gold)' : '5px solid green'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px'}}>
              
              <div style={{flex: 1}}>
                <h3 style={{margin: 0, color: 'var(--church-blue)'}}>{vol.fullName}</h3>
                <div style={{display: 'flex', gap: '15px', marginTop: '5px', fontSize: '0.9rem', color: '#555'}}>
                  <span style={{display:'flex', alignItems:'center', gap:'5px'}}><Phone size={14}/> {vol.phone}</span>
                  <span style={{display:'flex', alignItems:'center', gap:'5px'}}><Mail size={14}/> {vol.email}</span>
                </div>
                
                <div style={{marginTop: '15px'}}>
                  <strong>Interested In:</strong>
                  <div style={{display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '5px'}}>
                    {vol.ministries.map((m, i) => (
                      <span key={i} style={{background: '#eef2ff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem'}}>{m}</span>
                    ))}
                  </div>
                </div>

                <div style={{marginTop: '10px', fontSize: '0.9rem'}}>
                  <strong>Skills:</strong> {vol.skills || 'None listed'}
                </div>
              </div>

              <div style={{textAlign: 'right', minWidth: '150px'}}>
                <div style={{marginBottom: '10px'}}>
                  <span style={{background: '#f0f0f0', padding: '5px 10px', borderRadius: '15px', fontSize: '0.8rem'}}>Age: {vol.ageGroup}</span>
                </div>
                {vol.status === 'New' ? (
                  <button onClick={() => markContacted(vol._id)} className="btn btn-primary" style={{fontSize: '0.8rem'}}>
                    Mark as Contacted
                  </button>
                ) : (
                  <span style={{color: 'green', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '5px'}}>
                    <CheckCircle size={16}/> Contacted
                  </span>
                )}
                <div style={{marginTop: '10px', fontSize: '0.8rem', color: '#999'}}>
                  {new Date(vol.createdAt).toLocaleDateString()}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}