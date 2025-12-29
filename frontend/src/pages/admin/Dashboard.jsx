import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../apiClient'; // <--- Connects to your Backend
import { Video, Calendar, MessageSquare, PlusCircle, Radio, Save, ExternalLink, Loader } from 'lucide-react';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('userInfo') || '{"name": "Admin"}');
  
  // 1. STATE FOR REAL DATA
  const [stats, setStats] = useState({ events: 0, prayers: 0, sermons: 0 });
  const [loading, setLoading] = useState(true);

  // 2. STATE FOR LIVE STREAM
  const [streamUrl, setStreamUrl] = useState('');
  const [isLive, setIsLive] = useState(false);
  const [platform, setPlatform] = useState('YouTube'); // Default

  // 3. FETCH DATA ON LOAD
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Run all requests at the same time for speed
        const [eventsRes, prayersRes, sermonsRes, liveRes] = await Promise.all([
          api.get('/events'),
          api.get('/prayers'),
          api.get('/sermons'),
          api.get('/live')
        ]);

        // Update Stats
        setStats({
          events: eventsRes.data.length,
          prayers: prayersRes.data.length,
          sermons: sermonsRes.data.length
        });

        // Update Live Stream Form
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

  // 4. HANDLE SAVING STREAM
  const handleSaveStream = async (e) => {
    e.preventDefault();
    
    // Auto-detect platform if user didn't select
    let currentPlatform = platform;
    if (streamUrl.includes('facebook')) currentPlatform = 'Facebook';
    else if (streamUrl.includes('youtube') || streamUrl.includes('youtu.be')) currentPlatform = 'YouTube';

    try {
      await api.post('/live', {
        platform: currentPlatform,
        embedUrl: streamUrl,
        isActive: isLive
      });
      alert(`Live stream updated! Status: ${isLive ? 'ON AIR' : 'OFFLINE'}`);
    } catch (error) {
      alert('Error saving live stream settings.');
    }
  };

  if (loading) {
    return <div className="p-10 flex justify-center"><Loader className="animate-spin" size={40} /></div>;
  }

  return (
    <div className="admin-main">
      <div className="dashboard-header">
        <div>
          <h1>Welcome, <span className="text-blue">{user.name}</span></h1>
          <p className="subtitle">Here is what is happening at Abundant Rain today.</p>
        </div>
        <div className="date-badge">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="dashboard-grid">
        {/* Card 1: Events */}
        <div className="stat-card border-blue">
          <div className="stat-content">
            <p>Upcoming Events</p>
            <h2>{stats.events}</h2> {/* <--- Real Data */}
          </div>
          <div className="stat-icon bg-blue-light">
            <Calendar size={30} color="var(--church-blue)" />
          </div>
        </div>

        {/* Card 2: Prayer Requests */}
        <div className="stat-card border-gold">
          <div className="stat-content">
            <p>Prayer Requests</p>
            <h2>{stats.prayers}</h2> {/* <--- Real Data */}
          </div>
          <div className="stat-icon bg-gold-light">
            <MessageSquare size={30} color="var(--church-gold)" />
          </div>
        </div>

        {/* Card 3: Sermons */}
        <div className="stat-card border-red">
          <div className="stat-content">
            <p>Total Sermons</p>
            <h2>{stats.sermons}</h2> {/* <--- Real Data */}
          </div>
          <div className="stat-icon bg-red-light">
            <Video size={30} color="var(--danger)" />
          </div>
        </div>
      </div>

      <div className="dashboard-split">
        {/* Left Side: Live Stream Setup */}
        <div className="live-stream-section card">
          <div className="card-header">
            <h3><Radio size={24} className={isLive ? "animate-pulse text-red" : ""} /> Live Stream Setup</h3>
            <span className={`status-badge ${isLive ? 'status-live' : 'status-offline'}`}>
              {isLive ? '● ON AIR' : '○ OFFLINE'}
            </span>
          </div>
          
          <form onSubmit={handleSaveStream} className="stream-form">
            <p style={{fontSize: '0.9rem', color: '#666', marginBottom: '15px'}}>
              Paste your YouTube Video ID or Facebook Embed URL here to update the "Watch Live" page.
            </p>
            <div className="form-group">
              <label>Stream Embed URL / ID</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. https://youtube.com/embed/..." 
                value={streamUrl}
                onChange={(e) => setStreamUrl(e.target.value)}
              />
            </div>
            
            <div className="form-row" style={{alignItems: 'center', marginTop: '10px'}}>
              <label className="switch-container" style={{display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer'}}>
                <input 
                  type="checkbox" 
                  checked={isLive} 
                  onChange={(e) => setIsLive(e.target.checked)} 
                  style={{width: '20px', height: '20px'}}
                />
                <span className="switch-label">Enable "Live Now" Badge</span>
              </label>
              
              <button type="submit" className="btn btn-primary" style={{marginLeft: 'auto'}}>
                <Save size={18} /> Save Settings
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Quick Actions */}
        <div className="quick-actions-section">
          <h2 style={{fontSize: '1.5rem', marginBottom: '20px', color: '#333'}}>Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/admin/sermons" className="action-card">
              <div className="action-icon"><PlusCircle size={24} /></div>
              <span>Add New Sermon</span>
            </Link>
            
            <Link to="/admin/events" className="action-card">
              <div className="action-icon"><Calendar size={24} /></div>
              <span>Create Event</span>
            </Link>
            
            <Link to="/admin/ministries" className="action-card">
              <div className="action-icon"><MessageSquare size={24} /></div>
              <span>Post Update</span>
            </Link>

            <a href="/" target="_blank" className="action-card" style={{backgroundColor: '#eef2ff', color: 'var(--church-blue)'}}>
              <div className="action-icon"><ExternalLink size={24} /></div>
              <span>View Website</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}