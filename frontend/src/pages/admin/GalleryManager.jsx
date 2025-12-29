import { useState, useEffect } from 'react';
import api from '../../apiClient';
import { Trash2, Plus, Upload, LayoutTemplate, Film, Grid, Loader, Video as VideoIcon } from 'lucide-react';

export default function GalleryManager() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Form State
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

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setLoading(true);
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('section', section);
    formData.append('image', file);

    try {
      await api.post('/gallery', formData);
      alert('Success! Media uploaded.');
      
      // --- CRITICAL FIX: RESET FORM COMPLETELY ---
      setTitle('');
      setCategory('General');
      // We keep the section (e.g., Hero) so you can upload multiple to the same place
      setFile(null);
      
      // Force clear the HTML input so "onChange" triggers again for new files
      const fileInput = document.getElementById('fileInput');
      if(fileInput) fileInput.value = '';
      
      fetchGallery();
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || 'Upload failed. Check if file is > 500MB.';
      alert(`Error: ${message}`);
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
    if (url && url.startsWith('/uploads')) {
      return `${API_URL}${url}`;
    }
    return url;
  };

  // Helper to decide if we show an Image preview or a Video icon
  const isVideo = (url) => {
    if(!url) return false;
    return url.endsWith('.mp4') || url.endsWith('.mov') || url.endsWith('.avi');
  }

  return (
    <div>
      <h1>Gallery & Media Manager</h1>
      
      {/* ADD FORM */}
      <div className="card" style={{marginBottom: '30px', borderTop: '5px solid var(--church-blue)'}}>
        <h3>Add New Media</h3>
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label style={{fontWeight: 'bold'}}>1. Select Section</label>
            <div style={{display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap'}}>
              
              <label style={{
                flex: 1, padding: '15px', border: section === 'Hero' ? '2px solid var(--church-blue)' : '1px solid #ddd',
                borderRadius: '8px', cursor: 'pointer', textAlign: 'center', backgroundColor: section === 'Hero' ? '#eef2ff' : 'white'
              }}>
                <input type="radio" name="section" value="Hero" checked={section === 'Hero'} onChange={e => setSection(e.target.value)} style={{display:'none'}} />
                <LayoutTemplate size={24} className="text-church-blue" style={{marginBottom: '5px', margin: '0 auto'}}/>
                <div style={{fontWeight: 'bold', fontSize: '0.9rem'}}>Hero Carousel</div>
              </label>

              <label style={{
                flex: 1, padding: '15px', border: section === 'Video' ? '2px solid var(--church-blue)' : '1px solid #ddd',
                borderRadius: '8px', cursor: 'pointer', textAlign: 'center', backgroundColor: section === 'Video' ? '#eef2ff' : 'white'
              }}>
                <input type="radio" name="section" value="Video" checked={section === 'Video'} onChange={e => setSection(e.target.value)} style={{display:'none'}} />
                <Film size={24} className="text-church-blue" style={{marginBottom: '5px', margin: '0 auto'}}/>
                <div style={{fontWeight: 'bold', fontSize: '0.9rem'}}>Video Section</div>
              </label>

              <label style={{
                flex: 1, padding: '15px', border: section === 'General' ? '2px solid var(--church-blue)' : '1px solid #ddd',
                borderRadius: '8px', cursor: 'pointer', textAlign: 'center', backgroundColor: section === 'General' ? '#eef2ff' : 'white'
              }}>
                <input type="radio" name="section" value="General" checked={section === 'General'} onChange={e => setSection(e.target.value)} style={{display:'none'}} />
                <Grid size={24} className="text-church-blue" style={{marginBottom: '5px', margin: '0 auto'}}/>
                <div style={{fontWeight: 'bold', fontSize: '0.9rem'}}>Photo Grid</div>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>2. Title / Caption</label>
            <input 
              className="form-control" 
              placeholder="e.g. Youth Night Highlights" 
              required 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label>3. Upload File (Image or Video)</label>
            <div style={{border: '2px dashed #ccc', padding: '20px', borderRadius: '5px', textAlign: 'center', backgroundColor: '#fafafa'}}>
              <input 
                id="fileInput"
                type="file" 
                accept="image/*,video/*"
                onChange={e => setFile(e.target.files[0])} 
                style={{display: 'none'}}
              />
              <label htmlFor="fileInput" style={{cursor: 'pointer', display: 'block'}}>
                <Upload size={30} color="#666" style={{marginBottom: '10px'}} />
                <p style={{color: '#666'}}>Click to select file</p>
                {file ? (
                  <p style={{color: 'green', fontWeight: 'bold', marginTop: '10px'}}>Selected: {file.name}</p>
                ) : (
                  <p style={{fontSize: '0.8rem', color: '#999'}}>Max 500MB</p>
                )}
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>4. Category</label>
            <select className="form-control" value={category} onChange={e => setCategory(e.target.value)}>
              <option value="General">General</option>
              <option value="Worship">Worship</option>
              <option value="Events">Events</option>
              <option value="Youth">Youth</option>
            </select>
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={loading} style={{width:'100%', justifyContent:'center'}}>
            {loading ? <Loader className="animate-spin" size={18} /> : <Plus size={18}/>} 
            {loading ? ' Uploading... (Please Wait)' : ' Upload Media'}
          </button>
        </form>
      </div>

      {/* LIST */}
      <h3>Managed Media</h3>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:'20px'}}>
        {photos.map(photo => (
          <div key={photo._id} className="card" style={{padding:0, overflow:'hidden', position:'relative'}}>
            
            {/* Show Video Icon or Image */}
            {isVideo(photo.imageUrl) ? (
              <div style={{width:'100%', height:'150px', background:'#000', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <VideoIcon size={40} color="white" />
              </div>
            ) : (
              <img 
                src={getImageUrl(photo.imageUrl)} 
                alt={photo.title} 
                style={{width:'100%', height:'150px', objectFit:'cover'}} 
              />
            )}

            <div style={{padding:'10px'}}>
              <div style={{display:'flex', justifyContent:'space-between', marginBottom:'5px'}}>
                 <span style={{fontSize:'0.7rem', padding:'2px 6px', borderRadius:'4px', backgroundColor:'var(--church-gold)', color:'white', fontWeight:'bold'}}>{photo.section}</span>
              </div>
              <p style={{fontWeight:'bold', fontSize:'0.9rem', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{photo.title}</p>
            </div>
            <button 
              onClick={() => handleDelete(photo._id)}
              style={{position:'absolute', top:'5px', right:'5px', background:'red', color:'white', border:'none', borderRadius:'50%', width:'30px', height:'30px', cursor:'pointer'}}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}