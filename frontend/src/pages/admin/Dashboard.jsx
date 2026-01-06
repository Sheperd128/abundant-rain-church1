import { useState, useEffect } from 'react';
import api from '../../apiClient';
import { Video, Calendar, MessageSquare, PlusCircle, Radio, Save, ExternalLink, Loader, Youtube, Facebook } from 'lucide-react';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('userInfo') || '{"name": "Admin"}');
  const [stats, setStats] = useState({ events: 0, prayers: 0, sermons: 0 });
  const [loading, setLoading] = useState(true);
  
  // Live Stream State
  const [streamUrl, setStreamUrl] = useState('');
  const [isLive, setIsLive] = useState(false);
  const [platform, setPlatform] = useState('YouTube');
  
  // Social Links State
  const [youtubeLink, setYoutubeLink] = useState('');
  const [facebookLink, setFacebookLink] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, prayersRes, sermonsRes, liveRes] = await Promise.all([
          api.get('/events'),
          api.get('/prayers'),
          api.get('/sermons'),
          api.get('/live')
        ]);

        setStats({
          events: eventsRes.data.length,
          prayers: prayersRes.data.length,
          sermons: sermonsRes.data.length
        });

        if (liveRes.data) {
          setStreamUrl(liveRes.data.embedUrl || '');
          setIsLive(liveRes.data.isActive || false);
          setPlatform(liveRes.data.platform || 'YouTube');
          // Load existing links or default empty string
          setYoutubeLink(liveRes.data.youtubeLink || '');
          setFacebookLink(liveRes.data.facebookLink || '');
        }
      } catch (error) {
        console.error("Error loading dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSaveStream = async (e) => {
    e.preventDefault();
    
    // Auto-detect platform logic
    let currentPlatform = platform;
    if (streamUrl.includes('facebook')) currentPlatform = 'Facebook';
    
    try {
      await api.post('/live', { 
        platform: currentPlatform, 
        embedUrl: streamUrl, 
        isActive: isLive,
        youtubeLink, // Send to backend
        facebookLink // Send to backend
      });
      alert(`Settings updated! Status: ${isLive ? 'ON AIR' : 'OFFLINE'}`);
    } catch (error) {
      alert('Error saving live settings.');
    }
  };

  if (loading) return <div className="p-10 flex justify-center"><Loader className="animate-spin" size={40} /></div>;

  return (
    <div>
      {/* HEADER SECTION */}
      <div className="dashboard-header" style={{
        backgroundColor: 'white', 
        padding: '25px', 
        borderRadius: '12px', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)', 
        marginBottom: '30px',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderLeft: '5px solid var(--church-blue)'
      }}>
        <div>
          <h1 style={{fontSize: '1.8rem', margin: 0, color: '#333'}}>Welcome back, {user.name}</h1>
          <p style={{color:'#666', margin: '5px 0 0 0'}}>Manage your church content and live streams.</p>
        </div>
        <div className="date-badge" style={{background:'var(--church-grey)', padding:'8px 15px', borderRadius:'8px', fontWeight: 'bold', color: 'var(--church-blue)'}}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* STATS GRID */}
      <div className="dashboard-grid">
        <div className="stat-card" style={{borderLeft: '5px solid var(--church-blue)'}}>
          <div>
            <p>Upcoming Events</p>
            <h2 style={{fontSize: '2rem'}}>{stats.events}</h2>
          </div>
          <div style={{background: '#eef2ff', padding:'10px', borderRadius:'50%'}}>
            <Calendar size={24} color="var(--church-blue)" />
          </div>
        </div>

        <div className="stat-card" style={{borderLeft: '5px solid var(--church-gold)'}}>
          <div>
            <p>Prayer Requests</p>
            <h2 style={{fontSize: '2rem'}}>{stats.prayers}</h2>
          </div>
          <div style={{background: '#fff9e6', padding:'10px', borderRadius:'50%'}}>
            <MessageSquare size={24} color="var(--church-gold)" />
          </div>
        </div>

        <div className="stat-card" style={{borderLeft: '5px solid var(--danger)'}}>
          <div>
            <p>Total Sermons</p>
            <h2 style={{fontSize: '2rem'}}>{stats.sermons}</h2>
          </div>
          <div style={{background: '#ffebeb', padding:'10px', borderRadius:'50%'}}>
            <Video size={24} color="var(--danger)" />
          </div>
        </div>
      </div>

      <div className="dashboard-split">
        
        {/* LIVE STREAM CARD */}
        <div className="admin-card" style={{flex: 2}}>
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'20px', borderBottom: '1px solid #eee', paddingBottom: '15px'}}>
            <h3 style={{display:'flex', gap:'10px', margin: 0}}><Radio size={24} className={isLive ? "animate-pulse text-red" : ""} /> Live Stream Setup</h3>
            <span style={{background: isLive ? '#ffebeb' : '#eee', color: isLive ? 'red' : '#666', padding:'5px 12px', borderRadius:'15px', fontSize:'0.8rem', fontWeight:'bold'}}>
              {isLive ? '● ON AIR' : '○ OFFLINE'}
            </span>
          </div>
          
          <form onSubmit={handleSaveStream}>
            <div className="form-group" style={{marginBottom: '20px'}}>
              <label>1. Current Stream URL (Video Link)</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Paste YouTube link (e.g. https://youtu.be/...)" 
                value={streamUrl} 
                onChange={(e) => setStreamUrl(e.target.value)} 
              />
              <small style={{color: '#888'}}>Copy this from YouTube when you go live via OBS.</small>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>2. Channel Link (YouTube)</label>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <Youtube size={20} color="red" style={{marginRight: '10px'}}/>
                  <input type="text" className="form-control" value={youtubeLink} onChange={(e) => setYoutubeLink(e.target.value)} placeholder="https://youtube.com/..." />
                </div>
              </div>
              <div className="form-group">
                <label>3. Page Link (Facebook)</label>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <Facebook size={20} color="blue" style={{marginRight: '10px'}}/>
                  <input type="text" className="form-control" value={facebookLink} onChange={(e) => setFacebookLink(e.target.value)} placeholder="https://facebook.com/..." />
                </div>
              </div>
            </div>
            
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'20px', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px'}}>
              <label style={{display:'flex', gap:'10px', cursor:'pointer', alignItems:'center'}}>
                <input type="checkbox" checked={isLive} onChange={(e) => setIsLive(e.target.checked)} style={{width:'20px', height:'20px'}} />
                <span style={{fontWeight: 'bold'}}>Switch to "ON AIR"</span>
              </label>
              <button type="submit" className="btn btn-primary"><Save size={18} /> Update Settings</button>
            </div>
          </form>
        </div>

        {/* QUICK ACTIONS */}
        <div style={{flex: 1, display:'flex', flexDirection:'column', gap:'15px'}}>
           <div className="admin-card" style={{marginBottom: 0}}>
             <h3 style={{fontSize:'1.2rem', marginBottom:'15px'}}>Quick Actions</h3>
             <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
               <a href="/admin/sermons" className="btn" style={{border: '1px solid #eee', justifyContent: 'flex-start', color: '#555'}}>
                 <PlusCircle size={20} color="var(--church-blue)"/> Add Sermon
               </a>
               <a href="/admin/events" className="btn" style={{border: '1px solid #eee', justifyContent: 'flex-start', color: '#555'}}>
                 <Calendar size={20} color="var(--church-blue)"/> Create Event
               </a>
               <a href="/" target="_blank" className="btn" style={{backgroundColor: '#eef2ff', color: 'var(--church-blue)', justifyContent: 'center', marginTop: '10px'}}>
                 <ExternalLink size={20} /> Go to Website
               </a>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}