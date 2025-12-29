import { useState, useEffect } from 'react';
import api from '../../apiClient';
import { Trash2, Calendar, MapPin } from 'lucide-react';

export default function EventsManager() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: '', description: '', startDate: '', 
    location: '12669 Umsimbithi Dr, Vosloorus', ministry: 'All'
  });

  useEffect(() => { fetchEvents(); }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await api.get('/events');
      setEvents(data);
    } catch (error) { console.error(error); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/events', formData);
      alert('Event Created!');
      fetchEvents();
    } catch (error) { alert('Error'); }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Delete this event?')) {
      await api.delete(`/events/${id}`);
      fetchEvents();
    }
  };

  return (
    <div>
      <h1 style={{marginBottom: '20px'}}>Manage Events</h1>

      {/* Create Form */}
      <div className="card" style={{marginBottom: '30px'}}>
        <h3 style={{marginBottom: '15px'}}>Add New Event</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input className="form-control" type="text" placeholder="Title" required 
              value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            <select className="form-control" value={formData.ministry} onChange={e => setFormData({...formData, ministry: e.target.value})}>
              <option value="All">General</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Youth">Youth</option>
            </select>
          </div>
          <div className="form-row" style={{marginTop: '10px'}}>
            <input className="form-control" type="datetime-local" required 
              value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} />
            <input className="form-control" type="text" placeholder="Location" 
              value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
          </div>
          <button type="submit" className="btn btn-primary" style={{marginTop: '15px'}}>Publish Event</button>
        </form>
      </div>

      {/* List */}
      <div>
        {events.map(event => (
          <div key={event._id} className="card" style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px', padding: '15px'}}>
            <div>
              <h4 style={{fontSize: '1.1rem'}}>{event.title}</h4>
              <p style={{color: '#666', fontSize: '0.9rem'}}>
                <Calendar size={14}/> {new Date(event.startDate).toLocaleString()} | <MapPin size={14}/> {event.location}
              </p>
            </div>
            <button onClick={() => handleDelete(event._id)} className="btn btn-red" style={{padding: '5px 10px'}}><Trash2 size={16}/></button>
          </div>
        ))}
      </div>
    </div>
  );
}