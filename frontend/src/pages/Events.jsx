import { useState, useEffect } from 'react';
import api from '../apiClient';
import { Calendar, MapPin, Clock, Loader } from 'lucide-react';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await api.get('/events');
        setEvents(data);
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <div style={{padding:'50px', textAlign:'center'}}><Loader className="animate-spin" /></div>;

  return (
    <div>
      {/* Header */}
      <div style={{backgroundColor: 'var(--church-blue)', color: 'white', padding: '60px 20px', textAlign: 'center'}}>
        <h1 style={{fontSize: '3rem', marginBottom: '10px'}}>Upcoming Events</h1>
        <p style={{fontSize: '1.2rem', color: 'var(--church-gold)'}}>Join us in fellowship</p>
      </div>

      <div className="container" style={{padding: '60px 20px'}}>
        {events.length === 0 ? (
          <div style={{textAlign: 'center', padding: '40px', backgroundColor: '#f9f9f9', borderRadius: '10px'}}>
            <h3>No upcoming events scheduled.</h3>
            <p>Check back soon for updates!</p>
          </div>
        ) : (
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px'}}>
            {events.map(event => (
              <div key={event._id} className="card" style={{padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
                <div style={{backgroundColor: 'var(--church-gold)', padding: '15px', color: 'var(--church-blue)', textAlign: 'center', fontWeight: 'bold'}}>
                  {new Date(event.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                </div>
                <div style={{padding: '25px', flex: 1}}>
                  <h3 style={{color: 'var(--church-blue)', marginBottom: '15px', fontSize: '1.4rem'}}>{event.title}</h3>
                  
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#555'}}>
                    <Clock size={18} color="var(--church-gold)" />
                    <span>{new Date(event.startDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                  
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: '#555'}}>
                    <MapPin size={18} color="var(--church-gold)" />
                    <span>{event.location}</span>
                  </div>

                  <p style={{color: '#666', lineHeight: '1.6'}}>{event.description}</p>
                  
                  {/* Ministry Tag */}
                  <span style={{display: 'inline-block', marginTop: '20px', padding: '5px 10px', backgroundColor: '#eee', borderRadius: '15px', fontSize: '0.8rem', fontWeight: 'bold', color: '#666'}}>
                    {event.ministry} Ministry
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}