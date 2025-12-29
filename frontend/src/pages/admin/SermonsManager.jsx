import { useState, useEffect } from 'react';
import api from '../../apiClient';
import { Trash2, Video, User, Calendar } from 'lucide-react';

export default function SermonsManager() {
  const [sermons, setSermons] = useState([]);
  const [formData, setFormData] = useState({
    title: '', preacher: 'Pastor Ernest Umanuah', date: '', videoUrl: '', description: ''
  });

  useEffect(() => { fetchSermons(); }, []);

  const fetchSermons = async () => {
    try {
      const { data } = await api.get('/sermons');
      setSermons(data);
    } catch (error) { console.error(error); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/sermons', formData);
      alert('Sermon Added!');
      setFormData({ title: '', preacher: 'Pastor Ernest Umanuah', date: '', videoUrl: '', description: '' });
      fetchSermons();
    } catch (error) { alert('Error adding sermon'); }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Delete this sermon?')) {
      await api.delete(`/sermons/${id}`);
      fetchSermons();
    }
  };

  return (
    <div>
      <h1 style={{marginBottom: '20px'}}>Manage Sermons</h1>

      {/* Upload Form */}
      <div className="card" style={{marginBottom: '30px'}}>
        <h3 style={{marginBottom: '15px'}}>Upload New Sermon</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input className="form-control" type="text" placeholder="Sermon Title" required 
              value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            <input className="form-control" type="text" placeholder="Preacher" required 
              value={formData.preacher} onChange={e => setFormData({...formData, preacher: e.target.value})} />
          </div>
          <div className="form-row" style={{marginTop: '10px'}}>
            <input className="form-control" type="date" required 
              value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
            <input className="form-control" type="text" placeholder="Video URL (YouTube/Facebook)" 
              value={formData.videoUrl} onChange={e => setFormData({...formData, videoUrl: e.target.value})} />
          </div>
          <textarea className="form-control" style={{marginTop: '10px', height: '80px'}} placeholder="Description..."
            value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
          
          <button type="submit" className="btn btn-primary" style={{marginTop: '15px'}}>Add Sermon</button>
        </form>
      </div>

      {/* List */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px'}}>
        {sermons.map(sermon => (
          <div key={sermon._id} className="card">
            <h4 style={{fontSize: '1.1rem', marginBottom: '5px'}}>{sermon.title}</h4>
            <p style={{color: '#666', fontSize: '0.9rem', marginBottom: '10px'}}>
              <User size={14}/> {sermon.preacher} <br/>
              <Calendar size={14}/> {new Date(sermon.date).toLocaleDateString()}
            </p>
            {sermon.videoUrl && (
              <a href={sermon.videoUrl} target="_blank" rel="noreferrer" style={{display: 'block', color: 'blue', marginBottom: '10px', fontSize: '0.9rem'}}>
                <Video size={14}/> Watch Link
              </a>
            )}
            <button onClick={() => handleDelete(sermon._id)} className="btn btn-red" style={{width: '100%', justifyContent: 'center'}}>
              <Trash2 size={16}/> Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}