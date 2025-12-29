import { useState, useEffect } from 'react';
import api from '../../apiClient';
import { Radio, Save, Youtube, Facebook } from 'lucide-react';

export default function LivestreamManager() {
  const [formData, setFormData] = useState({
    platform: 'YouTube',
    embedUrl: '',
    isActive: false
  });

  useEffect(() => {
    fetchStreamSettings();
  }, []);

  const fetchStreamSettings = async () => {
    try {
      const { data } = await api.get('/live');
      if (data && data.embedUrl) {
        setFormData({
          platform: data.platform,
          embedUrl: data.embedUrl,
          isActive: data.isActive
        });
      }
    } catch (error) { console.error(error); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/live', formData);
      alert('Livestream settings updated!');
    } catch (error) {
      alert('Error updating settings');
    }
  };

  return (
    <div>
      <h1>Livestream Setup</h1>
      <p style={{marginBottom: '20px', color: '#666'}}>
        Paste your YouTube or Facebook video link here. This will update the "Watch Live" page.
      </p>

      <div className="card">
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label style={{fontWeight: 'bold', display: 'block', marginBottom: '10px'}}>Step 1: Select Platform</label>
            <div style={{display: 'flex', gap: '20px'}}>
              <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '10px', border: formData.platform === 'YouTube' ? '2px solid red' : '1px solid #ddd', borderRadius: '5px'}}>
                <input 
                  type="radio" 
                  name="platform" 
                  value="YouTube" 
                  checked={formData.platform === 'YouTube'}
                  onChange={e => setFormData({...formData, platform: e.target.value})}
                />
                <Youtube color="red" /> YouTube Live
              </label>

              <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '10px', border: formData.platform === 'Facebook' ? '2px solid blue' : '1px solid #ddd', borderRadius: '5px'}}>
                <input 
                  type="radio" 
                  name="platform" 
                  value="Facebook" 
                  checked={formData.platform === 'Facebook'}
                  onChange={e => setFormData({...formData, platform: e.target.value})}
                />
                <Facebook color="blue" /> Facebook Live
              </label>
            </div>
          </div>

          <div className="form-group" style={{marginTop: '20px'}}>
            <label style={{fontWeight: 'bold'}}>Step 2: Paste Video Link</label>
            <input 
              className="form-control" 
              placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              value={formData.embedUrl}
              onChange={e => setFormData({...formData, embedUrl: e.target.value})}
            />
            <small style={{color: '#666'}}>Copy the link from your browser address bar when watching your stream.</small>
          </div>

          <div className="form-group" style={{marginTop: '20px'}}>
            <label style={{display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold', cursor: 'pointer'}}>
              <input 
                type="checkbox" 
                checked={formData.isActive}
                onChange={e => setFormData({...formData, isActive: e.target.checked})}
                style={{width: '20px', height: '20px'}}
              />
              Step 3: Switch "ON AIR" (Show on website)
            </label>
          </div>

          <button type="submit" className="btn btn-primary" style={{marginTop: '15px'}}>
            <Save size={18} /> Save Settings
          </button>

        </form>
      </div>
    </div>
  );
}