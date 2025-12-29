import { useState, useEffect } from 'react';
import api from '../../apiClient';
import { Video, Calendar, MessageSquare, PlusCircle, Radio, Save, ExternalLink, Loader } from 'lucide-react';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('userInfo') || '{"name": "Admin"}');
  const [stats, setStats] = useState({ events: 0, prayers: 0, sermons: 0 });
  const [loading, setLoading] = useState(true);
  const [streamUrl, setStreamUrl] = useState('');
  const [isLive, setIsLive] = useState(false);
  const [platform, setPlatform] = useState('YouTube');

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
    let currentPlatform = platform;
    if (streamUrl.includes('facebook')) currentPlatform = 'Facebook';
    else if (streamUrl.includes('youtube') || streamUrl.includes('youtu.be')) currentPlatform = 'YouTube';

    try {
      await api.post('/live', { platform: currentPlatform, embedUrl: streamUrl, isActive: isLive });
      alert(`Live stream updated! Status: ${isLive ? 'ON AIR' : 'OFFLINE'}`);
    } catch (error) {
      alert('Error saving live stream settings.');
    }
  };

  if (loading) return <div className="p-10 flex justify-center"><Loader className="animate-spin" size={40} /></div>;

  return (
    <div>
      <div className="dashboard-header" style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'20px'}}>
        <div>
          <h1>Welcome, <span style={{color:'var(--church-blue)'}}>{user.name}</span></h1>
          <p style={{color:'#666'}}>Here is what is happening at Abundant Rain today.</p>
        </div>
        <div className="date-badge" style={{background:'white', padding:'8px 15px', borderRadius:'20px', boxShadow:'0 2px 5px rgba(0,0,0,0.1)'}}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* STATS GRID (Responsive via CSS) */}
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

      {/* SPLIT SECTION (Responsive via CSS) */}
      <div className="dashboard-split">
        
        {/* LIVE STREAM CARD */}
        <div className="admin-card" style={{flex: 2}}>
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'15px'}}>
            <h3 style={{display:'flex', gap:'10px'}}><Radio size={24} className={isLive ? "animate-pulse text-red" : ""} /> Live Stream Setup</h3>
            <span style={{background: isLive ? '#ffebeb' : '#eee', color: isLive ? 'red' : '#666', padding:'5px 12px', borderRadius:'15px', fontSize:'0.8rem', fontWeight:'bold'}}>
              {isLive ? '● ON AIR' : '○ OFFLINE'}
            </span>
          </div>
          
          <form onSubmit={handleSaveStream}>
            <div className="form-group">
              <label>Stream Embed URL / ID</label>
              <input type="text" className="form-control" placeholder="Paste YouTube link here..." value={streamUrl} onChange={(e) => setStreamUrl(e.target.value)} />
            </div>
            
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'20px'}}>
              <label style={{display:'flex', gap:'10px', cursor:'pointer', alignItems:'center'}}>
                <input type="checkbox" checked={isLive} onChange={(e) => setIsLive(e.target.checked)} style={{width:'20px', height:'20px'}} />
                <span>Enable "Live Now" Badge</span>
              </label>
              <button type="submit" className="btn btn-primary"><Save size={18} /> Save</button>
            </div>
          </form>
        </div>

        {/* QUICK ACTIONS */}
        <div style={{flex: 1, display:'flex', flexDirection:'column', gap:'15px'}}>
           <h3 style={{fontSize:'1.2rem', marginBottom:'5px'}}>Quick Actions</h3>
           <a href="/admin/sermons" className="admin-card" style={{display:'flex', alignItems:'center', gap:'15px', padding:'15px', textDecoration:'none', color:'inherit', marginBottom:0}}>
             <PlusCircle size={20} color="var(--church-blue)"/> <span>Add Sermon</span>
           </a>
           <a href="/admin/events" className="admin-card" style={{display:'flex', alignItems:'center', gap:'15px', padding:'15px', textDecoration:'none', color:'inherit', marginBottom:0}}>
             <Calendar size={20} color="var(--church-blue)"/> <span>Create Event</span>
           </a>
           <a href="/" target="_blank" className="admin-card" style={{display:'flex', alignItems:'center', gap:'15px', padding:'15px', textDecoration:'none', color:'var(--church-blue)', background:'#eef2ff', marginBottom:0}}>
             <ExternalLink size={20} /> <span>View Website</span>
           </a>
        </div>

      </div>
    </div>
  );
}