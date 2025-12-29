import { useState, useEffect } from 'react';
import api from '../apiClient';

export default function MinistryPage({ category, title, description, image }) {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const { data } = await api.get(`/ministries/${category}`);
        setUpdates(data);
      } catch (error) { console.error('Error fetching updates'); }
    };
    fetchUpdates();
  }, [category]);

  return (
    <div>
      {/* Hero */}
      <div style={{ 
        height: '300px', backgroundImage: `url('${image}')`, backgroundSize: 'cover', backgroundPosition: 'center',
        position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <div style={{position: 'absolute', inset: 0, backgroundColor: 'rgba(24,44,91,0.7)'}}></div>
        <div style={{position: 'relative', zIndex: 1, textAlign: 'center', color: 'white', padding: '20px'}}>
          <h1 style={{fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold'}}>{title}</h1>
          <p style={{fontSize: 'clamp(1rem, 2vw, 1.2rem)', maxWidth: '600px', margin: '0 auto'}}>{description}</p>
        </div>
      </div>

      <div className="container" style={{padding: '40px 20px'}}>
        <div style={{display: 'flex', gap: '40px', flexWrap: 'wrap'}}> {/* Flex Wrap for Mobile */}
          
          {/* LEFT: Updates Feed */}
          <div style={{flex: 2, minWidth: '300px'}}>
            <h2 style={{color: 'var(--church-blue)', borderBottom: '2px solid var(--church-gold)', display: 'inline-block', marginBottom: '20px'}}>Latest Updates</h2>
            
            {updates.length === 0 ? (
              <p style={{fontStyle: 'italic', color: '#666'}}>No recent updates posted.</p>
            ) : (
              <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                {updates.map(update => (
                  <div key={update._id} style={{backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)'}}>
                    <h3 style={{color: 'var(--church-blue)', marginBottom: '10px'}}>{update.title}</h3>
                    <p style={{color: '#444', lineHeight: '1.6'}}>{update.content}</p>
                    <small style={{color: '#999', display: 'block', marginTop: '15px'}}>{new Date(update.createdAt).toLocaleDateString()}</small>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Sidebar */}
          <div style={{flex: 1, minWidth: '250px'}}>
            <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', borderTop: '4px solid var(--church-blue)'}}>
              <h3 style={{marginBottom: '15px'}}>Meeting Times</h3>
              <ul style={{paddingLeft: '20px', lineHeight: '1.8', color: '#555'}}>
                <li><strong>Weekly:</strong> Contact Leader for details</li>
                <li><strong>Location:</strong> Church Main Hall</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}