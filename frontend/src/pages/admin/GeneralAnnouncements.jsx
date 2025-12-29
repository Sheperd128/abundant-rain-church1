import { useState, useEffect } from 'react';
import api from '../../apiClient';
import { Send, Trash2, Bell } from 'lucide-react';

export default function GeneralAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      // Fetch ONLY 'General' updates
      const { data } = await api.get('/ministries/General');
      setAnnouncements(data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Automatically tag as 'General'
      await api.post('/ministries', { 
        title, 
        content, 
        ministry: 'General' 
      });
      
      alert('Church Announcement Posted!');
      setTitle('');
      setContent('');
      fetchAnnouncements();
    } catch (error) {
      alert('Error posting announcement. Ensure you are logged in as Admin/Pastor.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Delete this announcement?')) {
      try {
        await api.delete(`/ministries/${id}`);
        fetchAnnouncements();
      } catch (error) {
        alert('Error deleting item');
      }
    }
  };

  return (
    <div>
      <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px'}}>
        <div style={{padding: '10px', background: 'var(--church-gold)', borderRadius: '50%', color: 'white'}}>
          <Bell size={24} />
        </div>
        <div>
          <h1 style={{margin: 0, fontSize: '1.8rem'}}>General Announcements</h1>
          <p style={{margin: 0, color: '#666'}}>Post news for the entire church (Main News Page).</p>
        </div>
      </div>

      {/* POST FORM */}
      <div className="card" style={{marginBottom: '30px', borderTop: '5px solid var(--church-gold)'}}>
        <h3>Write New Announcement</h3>
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>Headline</label>
            <input 
              className="form-control" 
              placeholder="e.g. Special Easter Service" 
              required 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea 
              className="form-control" 
              placeholder="Write your message here..." 
              required 
              rows="5"
              value={content} 
              onChange={e => setContent(e.target.value)} 
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            <Send size={18} /> {loading ? 'Posting...' : 'Post to Website'}
          </button>
        </form>
      </div>

      {/* LIST */}
      <h3>Active Announcements</h3>
      <div style={{display: 'grid', gap: '15px'}}>
        {announcements.length === 0 ? <p style={{color: '#999'}}>No active announcements.</p> : null}
        
        {announcements.map(item => (
          <div key={item._id} className="card" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
            <div>
              <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'5px'}}>
                <span style={{fontSize:'0.7rem', fontWeight:'bold', textTransform:'uppercase', backgroundColor: 'var(--church-gold)', color: 'white', padding:'2px 8px', borderRadius:'4px'}}>
                  GENERAL
                </span>
                <span style={{fontSize:'0.8rem', color:'#999'}}>
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h4 style={{margin: '0 0 5px 0'}}>{item.title}</h4>
              <p style={{fontSize: '0.9rem', color: '#555', margin: 0}}>{item.content}</p>
            </div>
            <button onClick={() => handleDelete(item._id)} className="btn btn-red" style={{padding:'5px 10px'}}>
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}