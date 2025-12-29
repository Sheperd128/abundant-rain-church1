import { useState, useEffect } from 'react';
import api from '../../apiClient';
import { Trash2, Plus, Upload, LayoutTemplate, Film, Grid, Loader, Video as VideoIcon } from 'lucide-react';

export default function GalleryManager() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [section, setSection] = useState('General'); 

  const API_URL = import.meta.env.VITE_API_URL.replace('/api', '');

  useEffect(() => { fetchGallery(); }, []);

  const fetchGallery = async () => {
    try {
      const { data } = await api.get('/gallery');
      setPhotos(data);
    } catch (error) { console.error(error); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file.");

    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('section', section);
    formData.append('image', file);

    try {
      await api.post('/gallery', formData);
      alert('Success! Media uploaded.');
      setTitle('');
      setCategory('General');
      setFile(null);
      const fileInput = document.getElementById('fileInput');
      if(fileInput) fileInput.value = '';
      fetchGallery();
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || 'Upload failed.'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Delete this item?')) {
      await api.delete(`/gallery/${id}`);
      fetchGallery();
    }
  };

  const getImageUrl = (url) => {
    if (url && url.startsWith('/uploads')) return `${API_URL}${url}`;
    return url;
  };

  const isVideo = (url) => url && (url.endsWith('.mp4') || url.endsWith('.mov') || url.endsWith('.avi'));

  return (
    <div>
      <div className="admin-page-header">
        <h1>Gallery & Media</h1>
        <p>Manage photos, videos, and the home page carousel.</p>
      </div>
      
      {/* ADD FORM */}
      <div className="admin-card">
        <h3>Add New Media</h3>
        <form onSubmit={handleSubmit} style={{marginTop:'20px'}}>
          
          <div className="form-group">
            <label>1. Select Section</label>
            <div style={{display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap'}}>
              {/* Radio buttons - using flexWrap to stack on phone */}
              {[
                {val:'Hero', icon:<LayoutTemplate size={20}/>, label:'Home Carousel'},
                {val:'Video', icon:<Film size={20}/>, label:'Video Section'},
                {val:'General', icon:<Grid size={20}/>, label:'Photo Gallery'}
              ].map(opt => (
                <label key={opt.val} style={{
                  flex: '1 1 100px', /* Allow shrinking/growing */
                  padding: '15px', 
                  border: section === opt.val ? '2px solid var(--church-blue)' : '1px solid #ddd',
                  borderRadius: '8px', 
                  cursor: 'pointer', 
                  textAlign: 'center', 
                  backgroundColor: section === opt.val ? '#eef2ff' : 'white'
                }}>
                  <input type="radio" name="section" value={opt.val} checked={section === opt.val} onChange={e => setSection(e.target.value)} style={{display:'none'}} />
                  <div className="text-church-blue" style={{marginBottom: '5px', display:'flex', justifyContent:'center'}}>{opt.icon}</div>
                  <div style={{fontWeight: 'bold', fontSize: '0.8rem'}}>{opt.label}</div>
                </label>
              ))}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>2. Title / Caption</label>
              <input className="form-control" placeholder="e.g. Youth Night Highlights" required value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="form-group">
              <label>4. Category (Filter)</label>
              <select className="form-control" value={category} onChange={e => setCategory(e.target.value)}>
                <option value="General">General</option>
                <option value="Worship">Worship</option>
                <option value="Events">Events</option>
                <option value="Youth">Youth</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>3. Upload File</label>
            <div style={{border: '2px dashed #ccc', padding: '20px', borderRadius: '5px', textAlign: 'center', backgroundColor: '#fafafa'}}>
              <input id="fileInput" type="file" accept="image/*,video/*" onChange={e => setFile(e.target.files[0])} style={{display: 'none'}} />
              <label htmlFor="fileInput" style={{cursor: 'pointer', display: 'block'}}>
                <Upload size={30} color="#666" style={{marginBottom: '10px'}} />
                <p style={{color: '#666'}}>Click to select file</p>
                {file && <p style={{color: 'green', fontWeight: 'bold', marginTop: '10px'}}>Selected: {file.name}</p>}
              </label>
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={loading} style={{width:'100%', justifyContent:'center'}}>
            {loading ? <Loader className="animate-spin" size={18} /> : <Plus size={18}/>} 
            {loading ? ' Uploading...' : ' Upload Media'}
          </button>
        </form>
      </div>

      {/* GRID LIST */}
      <h3>Library</h3>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(160px, 1fr))', gap:'15px'}}>
        {photos.map(photo => (
          <div key={photo._id} className="admin-card" style={{padding:0, overflow:'hidden', position:'relative', marginBottom:0}}>
            {isVideo(photo.imageUrl) ? (
              <div style={{width:'100%', height:'120px', background:'#000', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <VideoIcon size={30} color="white" />
              </div>
            ) : (
              <img src={getImageUrl(photo.imageUrl)} alt={photo.title} style={{width:'100%', height:'120px', objectFit:'cover'}} />
            )}
            <div style={{padding:'10px'}}>
              <span style={{fontSize:'0.6rem', padding:'2px 6px', borderRadius:'4px', backgroundColor:'var(--church-gold)', color:'white'}}>{photo.section}</span>
              <p style={{fontWeight:'bold', fontSize:'0.8rem', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', marginTop:'5px'}}>{photo.title}</p>
            </div>
            <button onClick={() => handleDelete(photo._id)} style={{position:'absolute', top:'5px', right:'5px', background:'rgba(255,0,0,0.8)', color:'white', border:'none', borderRadius:'50%', width:'25px', height:'25px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}