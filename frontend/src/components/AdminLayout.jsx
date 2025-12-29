import { useState } from 'react'; // Added state
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Video, Calendar, Users, MessageSquare, 
  Image, Globe, LogOut, Shield, Bell, HandHeart, Menu, X 
} from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile sidebar state
  
  // 1. GET USER INFO
  const user = JSON.parse(localStorage.getItem('userInfo') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    navigate('/');
    window.location.reload();
  };

  // 2. DEFINE MENU ITEMS
  const allMenuItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} />, allowed: ['superadmin', 'pastor', 'admin', 'ministry_leader'] },
    { name: 'Sermons', path: '/admin/sermons', icon: <Video size={20} />, allowed: ['superadmin', 'pastor', 'media'] },
    { name: 'Events', path: '/admin/events', icon: <Calendar size={20} />, allowed: ['superadmin', 'pastor', 'admin'] },
    { name: 'My Ministry', path: '/admin/ministries', icon: <Users size={20} />, allowed: ['superadmin', 'pastor', 'ministry_leader'] },
    { name: 'Prayer Requests', path: '/admin/prayers', icon: <MessageSquare size={20} />, allowed: ['superadmin', 'pastor'] },
    { name: 'Gallery', path: '/admin/gallery', icon: <Image size={20} />, allowed: ['superadmin', 'pastor', 'media', 'admin'] },
    { name: 'Team Manager', path: '/admin/team', icon: <Shield size={20} />, allowed: ['superadmin'] },
    { name: 'Announcements', path: '/admin/general-announcements', icon: <Bell size={20} />, allowed: ['superadmin', 'pastor', 'admin'] },
    { name: 'Volunteers', path: '/admin/volunteers', icon: <HandHeart size={20} />, allowed: ['superadmin', 'pastor', 'admin'] },
  ];

  // 3. FILTER ITEMS
  const visibleMenuItems = allMenuItems.filter(item => {
    if (!user.role) return false;
    if (user.role === 'superadmin') return true; 
    return item.allowed.includes(user.role);
  });

  return (
    <div className="admin-layout" style={{position: 'relative', overflow: 'hidden'}}>
      
      {/* MOBILE HEADER (Visible only on small screens) */}
      <div className="admin-mobile-header">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{background:'none', border:'none', color:'white'}}>
          {sidebarOpen ? <X size={24}/> : <Menu size={24}/>}
        </button>
        <span style={{fontWeight: 'bold', marginLeft: '10px'}}>Admin Panel</span>
      </div>

      {/* SIDEBAR (Responsive Logic) */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div style={{textAlign: 'center', padding: '20px', fontSize: '1.2rem', fontWeight: 'bold'}}>
          {user.role === 'superadmin' ? 'Main Admin' : `${user.ministry || 'Staff'} Admin`}
        </div>
        
        <div style={{padding: '0 20px 20px 20px'}}>
          <Link to="/" className="btn" style={{width: '100%', background: 'rgba(255,255,255,0.2)', justifyContent: 'center'}}>
            <Globe size={16}/> View Website
          </Link>
        </div>

        <nav style={{flex: 1, overflowY: 'auto'}}>
          {visibleMenuItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              onClick={() => setSidebarOpen(false)} // Close sidebar on click (mobile)
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.icon} {item.name}
            </Link>
          ))}
        </nav>
        <button onClick={handleLogout} className="btn" style={{margin: '20px', background: 'rgba(255,255,255,0.1)'}}>
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <div className="admin-content">
        <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <h2 style={{fontSize: 'clamp(1.2rem, 2vw, 1.8rem)'}}>
            {user.ministry === 'General' ? 'Church Management' : `${user.ministry} Dashboard`}
          </h2>
          <div style={{fontWeight: 'bold', color: 'var(--church-blue)'}}>
            Hello, {user.name || 'Admin'}
          </div>
        </div>
        <div className="admin-main">
          <Outlet />
        </div>
      </div>

      {/* STYLES FOR ADMIN */}
      <style>{`
        .admin-layout { display: flex; height: 100vh; background: #f4f4f4; }
        .sidebar { 
          width: 250px; background: var(--church-blue); color: white; 
          display: flex; flex-direction: column; flex-shrink: 0; 
          transition: transform 0.3s ease-in-out;
          height: 100vh;
        }
        .admin-content { flex: 1; display: flex; flex-direction: column; overflow-y: auto; height: 100vh; }
        .admin-mobile-header { display: none; background: var(--church-blue); color: white; padding: 15px; align-items: center; }

        @media (max-width: 900px) {
          .admin-layout { flex-direction: column; }
          .admin-mobile-header { display: flex; }
          
          .sidebar {
            position: absolute;
            top: 55px; /* Height of mobile header */
            left: 0;
            width: 250px;
            height: calc(100vh - 55px);
            z-index: 1000;
            transform: translateX(-100%); /* Hide by default */
          }
          
          .sidebar.open { transform: translateX(0); box-shadow: 4px 0 10px rgba(0,0,0,0.2); }
          .admin-content { height: calc(100vh - 55px); }
        }
      `}</style>
    </div>
  );
}