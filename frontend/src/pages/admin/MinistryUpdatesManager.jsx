import { useState, useEffect } from 'react';
import api from '../../apiClient';
import { Send, Trash2, Megaphone } from 'lucide-react';

export default function MinistryUpdatesManager() {
  const [updates, setUpdates] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [ministry, setMinistry] = useState('General'); // Default to General for Admin

  // Get current user to check permissions
  const user = JSON.parse(localStorage.getItem('userInfo') || '{}');

  useEffect(() => {
    fetchUpdates();
    // If not admin, lock the dropdown to their specific ministry
    if (user.role === 'ministry_leader' && user.ministry) {
      setMinistry(user.ministry);
    }
  }, []);

  const fetchUpdates = async () => {
    try {
      const { data } = await api.get('/ministries'); 
      setUpdates(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/ministries', { title, content, ministry });
      alert('Announcement Posted!');
      setTitle('');
      setContent('');
      // Don't reset ministry if they are a leader, keep it locked
      if(user.role === 'superadmin' || user.role === 'admin') {
        setMinistry('General');
      }
      fetchUpdates();
    } catch (error) {
      alert('Error posting update');
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Delete this announcement?')) {
      try {
        await api.delete(`/ministries/${id}`);
        fetchUpdates();
      } catch (error) {
        alert('Error deleting item');
      }
    }
  };

  return (
    <div>
      <h1>Ministry Updates & News</h1>
      <p style={{color: '#666', marginBottom: '20px'}}>Post announcements for your specific ministry group or the whole church.</p>

      {/* POST FORM */}
      <div className="card" style={{marginBottom: '30px', borderTop: '5px solid var(--church-blue)'}}>
        <h3>Create New Announcement</h3>
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>Select Target Audience</label>
            <select 
              className="form-control" 
              value={ministry} 
              onChange={(e) => setMinistry(e.target.value)}
              disabled={user.role === 'ministry_leader'} // Lock if not admin
            >
              {/* Only Admins/Pastors see General option */}
              {(user.role === 'superadmin' || user.role === 'admin') && (
                <option value="General">General / Church-wide (News Page)</option>
              )}
              
              <option value="Men">Men's Ministry</option>
              <option value="Women">Women's Ministry</option>
              <option value="Youth">Youth Ministry</option>
              <option value="Children">Children's Ministry</option>
            </select>
          </div>

          <div className="form-group">
            <label>Title / Headline</label>
            <input 
              className="form-control" 
              placeholder="e.g. Sunday Service Time Change" 
              required 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label>Message Content</label>
            <textarea 
              className="form-control" 
              placeholder="Type your announcement details here..." 
              required 
              rows="4"
              value={content} 
              onChange={e => setContent(e.target.value)} 
            />
          </div>

          <button type="submit" className="btn btn-primary">
            <Send size={18} /> Post Update
          </button>
        </form>
      </div>

      {/* LIST OF POSTS */}
      <h3>Previous Posts</h3>
      <div style={{display: 'grid', gap: '15px'}}>
        {updates.map(item => (
          <div key={item._id} className="card" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
            <div>
              <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'5px'}}>
                <span style={{
                  fontSize:'0.7rem', fontWeight:'bold', textTransform:'uppercase', 
                  backgroundColor: item.ministry === 'General' ? 'var(--church-gold)' : '#eee',
                  color: item.ministry === 'General' ? 'white' : '#333',
                  padding:'2px 8px', borderRadius:'4px'
                }}>
                  {item.ministry}
                </span>
                <span style={{fontSize:'0.8rem', color:'#999'}}>{new Date(item.createdAt).toLocaleDateString()}</span>
              </div>
              <h4 style={{margin: '0 0 5px 0'}}>{item.title}</h4>
              <p style={{fontSize: '0.9rem', color: '#555', margin: 0}}>{item.content.substring(0, 100)}...</p>
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