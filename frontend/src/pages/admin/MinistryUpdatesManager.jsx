import { useState, useEffect } from 'react';
import api from '../../apiClient';
import { Send, Trash2, Upload } from 'lucide-react';

export default function MinistryUpdatesManager() {
  const [updates, setUpdates] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [ministry, setMinistry] = useState('General');
  const [file, setFile] = useState(null); // State for image
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem('userInfo') || '{}');

  useEffect(() => {
    fetchUpdates();
    if (user.role === 'ministry_leader' && user.ministry) {
      setMinistry(user.ministry);
    }
  }, []);

  const fetchUpdates = async () => {
    try {
      const { data } = await api.get('/ministries'); 
      setUpdates(data);
    } catch (error) { console.error(error); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // CRITICAL: Use FormData for file uploads
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('ministry', ministry);
    if (file) {
      formData.append('image', file);
    }

    try {
      await api.post('/ministries', formData); // Send FormData
      alert('Announcement Posted!');
      // Reset Form
      setTitle('');
      setContent('');
      setFile(null);
      document.getElementById('fileInput').value = ''; // Clear input visually
      if(user.role === 'superadmin' || user.role === 'admin') setMinistry('General');
      
      fetchUpdates();
    } catch (error) {
      alert('Error posting update. Check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Delete this announcement?')) {
      try {
        await api.delete(`/ministries/${id}`);
        fetchUpdates();
      } catch (error) { alert('Error deleting item'); }
    }
  };

  return (
    <div>
      <h1>Ministry Updates & News</h1>
      
      {/* POST FORM */}
      <div className="admin-card">
        <h3>Create New Announcement</h3>
        <form onSubmit={handleSubmit} style={{marginTop:'20px'}}>
          
          <div className="form-group">
            <label>Target Audience</label>
            <select className="form-control" value={ministry} onChange={(e) => setMinistry(e.target.value)} disabled={user.role === 'ministry_leader'}>
              {(user.role === 'superadmin' || user.role === 'admin') && <option value="General">General / Church-wide</option>}
              <option value="Men">Men's Ministry</option>
              <option value="Women">Women's Ministry</option>
              <option value="Youth">Youth Ministry</option>
              <option value="Children">Children's Ministry</option>
            </select>
          </div>

          <div className="form-group">
            <label>Headline</label>
            <input className="form-control" placeholder="e.g. Youth Camp Registration" required value={title} onChange={e => setTitle(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea className="form-control" placeholder="Details..." required rows="4" value={content} onChange={e => setContent(e.target.value)} />
          </div>

          {/* IMAGE UPLOAD */}
          <div className="form-group">
            <label>Attach Image / Poster (Optional)</label>
            <div style={{border:'2px dashed #ddd', padding:'20px', borderRadius:'8px', textAlign:'center', background:'#fafafa'}}>
              <input 
                id="fileInput"
                type="file" 
                accept="image/*" 
                onChange={e => setFile(e.target.files[0])} 
                style={{display:'none'}}
              />
              <label htmlFor="fileInput" style={{cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:'10px'}}>
                <Upload size={24} color="#666"/>
                <span style={{color:'#666', fontSize:'0.9rem'}}>{file ? file.name : "Click to upload a poster"}</span>
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{width:'100%'}}>
            <Send size={18} /> {loading ? 'Posting...' : 'Post Update'}
          </button>
        </form>
      </div>

      {/* LIST */}
      <h3>Previous Posts</h3>
      <div style={{display: 'grid', gap: '15px'}}>
        {updates.map(item => (
          <div key={item._id} className="list-item">
            <div>
              <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'5px'}}>
                <span style={{fontSize:'0.7rem', fontWeight:'bold', textTransform:'uppercase', backgroundColor: item.ministry === 'General' ? 'var(--church-gold)' : '#eee', color: item.ministry === 'General' ? 'white' : '#333', padding:'2px 8px', borderRadius:'4px'}}>
                  {item.ministry}
                </span>
                <span style={{fontSize:'0.8rem', color:'#999'}}>{new Date(item.createdAt).toLocaleDateString()}</span>
              </div>
              <h4 style={{margin: '0 0 5px 0'}}>{item.title}</h4>
              {item.image && <span style={{fontSize:'0.8rem', color:'green', display:'block', marginBottom:'5px'}}>🖼️ Contains Image</span>}
              <p style={{fontSize: '0.9rem', color: '#555', margin: 0}}>{item.content.substring(0, 60)}...</p>
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