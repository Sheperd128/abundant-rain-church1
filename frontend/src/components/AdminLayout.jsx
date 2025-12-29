import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { HandHeart } from 'lucide-react';
import { Bell } from 'lucide-react';
import { 
  LayoutDashboard, 
  Video, 
  Calendar, 
  Users, 
  MessageSquare, 
  Image, 
  Globe, 
  LogOut,
  Shield //
} from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 1. GET USER INFO FROM STORAGE
  const user = JSON.parse(localStorage.getItem('userInfo') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    navigate('/');
    window.location.reload();
  };

  // 2. DEFINE ALL POSSIBLE MENU ITEMS
  const allMenuItems = [
    { 
      name: 'Dashboard', 
      path: '/admin', 
      icon: <LayoutDashboard size={20} />, 
      allowed: ['superadmin', 'pastor', 'admin', 'ministry_leader'] 
    },
    { 
      name: 'Sermons', 
      path: '/admin/sermons', 
      icon: <Video size={20} />, 
      allowed: ['superadmin', 'pastor', 'media'] 
    },
    { 
      name: 'Events', 
      path: '/admin/events', 
      icon: <Calendar size={20} />, 
      allowed: ['superadmin', 'pastor', 'admin'] 
    },
    { 
      name: 'My Ministry', 
      path: '/admin/ministries', 
      icon: <Users size={20} />, 
      allowed: ['superadmin', 'pastor', 'ministry_leader'] 
    },
    {
      name: 'Prayer Requests',
      path: '/admin/prayers',
      icon: <MessageSquare size={20} />, 
      allowed: ['superadmin', 'pastor']
    },
    { 
      name: 'Gallery', 
      path: '/admin/gallery', 
      icon: <Image size={20} />, 
      allowed: ['superadmin', 'pastor', 'media', 'admin'] 
    },
    { 
      name: 'Team Manager', 
      path: '/admin/team', 
      icon: <Shield size={20} />, 
      allowed: ['superadmin'] 
    },
    { 
  name: 'Announcements', 
  path: '/admin/general-announcements', 
  icon: <Bell size={20} />, 
  allowed: ['superadmin', 'pastor', 'admin'] // Only Main Admins see this
},

    { 
  name: 'Volunteers', 
  path: '/admin/volunteers', 
  icon: <HandHeart size={20} />, 
  allowed: ['superadmin', 'pastor', 'admin'] 
},
  ];

  // 3. FILTER ITEMS BASED ON USER ROLE
  const visibleMenuItems = allMenuItems.filter(item => {
    if (!user.role) return false;
    if (user.role === 'superadmin') return true; 
    return item.allowed.includes(user.role);
  });

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div style={{textAlign: 'center', padding: '20px', fontSize: '1.2rem', fontWeight: 'bold'}}>
          {user.role === 'superadmin' ? 'Main Admin' : `${user.ministry || 'Staff'} Admin`}
        </div>
        
        <div style={{padding: '0 20px 20px 20px'}}>
          <Link to="/" className="btn" style={{width: '100%', background: 'rgba(255,255,255,0.2)', justifyContent: 'center'}}>
            <Globe size={16}/> View Website
          </Link>
        </div>

        <nav style={{flex: 1}}>
          {visibleMenuItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
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

      <div className="admin-content">
        <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>{user.ministry === 'General' ? 'Church Management' : `${user.ministry} Ministry Dashboard`}</h2>
          <div style={{fontWeight: 'bold', color: 'var(--church-blue)'}}>
            Hello, {user.name || 'Admin'}
          </div>
        </div>
        <div className="admin-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
}