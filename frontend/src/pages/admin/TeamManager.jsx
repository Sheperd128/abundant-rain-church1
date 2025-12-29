import { useState, useEffect } from 'react';
import api from '../../apiClient';
import { Trash2, UserPlus } from 'lucide-react';

export default function TeamManager() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'ministry_leader', ministry: 'General', phone: ''
  });

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/auth/users');
      setUsers(data);
    } catch (error) { console.error("Error fetching users"); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/users', formData);
      alert('New Team Member Added!');
      setFormData({ name: '', email: '', password: '', role: 'ministry_leader', ministry: 'General', phone: '' });
      fetchUsers();
    } catch (error) {
      alert(error.response?.data?.message || 'Error adding user');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this user account?')) {
      try {
        await api.delete(`/auth/users/${id}`);
        fetchUsers();
      } catch (error) { alert('Error deleting user'); }
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1>Team Management</h1>
        <p>Create accounts for your ministry leaders and admins.</p>
      </div>

      {/* CREATE USER FORM */}
      <div className="admin-card">
        <h3>Add New Leader</h3>
        <form onSubmit={handleSubmit} style={{marginTop:'20px'}}>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input className="form-control" required value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} />
            </div>
            <div className="form-group">
              <label>Email (Username)</label>
              <input type="email" className="form-control" required value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Password</label>
              <input type="text" className="form-control" required value={formData.password} onChange={e=>setFormData({...formData, password:e.target.value})} />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input className="form-control" value={formData.phone} onChange={e=>setFormData({...formData, phone:e.target.value})} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Role</label>
              <select className="form-control" value={formData.role} onChange={e=>setFormData({...formData, role:e.target.value})}>
                <option value="ministry_leader">Ministry Leader</option>
                <option value="admin">Admin (Helper)</option>
                <option value="superadmin">Super Admin (Pastor)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Assigned Ministry</label>
              <select className="form-control" value={formData.ministry} onChange={e=>setFormData({...formData, ministry:e.target.value})}>
                <option value="General">General</option>
                <option value="Men">Men's Ministry</option>
                <option value="Women">Women's Ministry</option>
                <option value="Youth">Youth Ministry</option>
                <option value="Children">Children's Church</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{width:'100%', justifyContent:'center'}}>
            <UserPlus size={18} /> Create Account
          </button>
        </form>
      </div>

      {/* USER LIST */}
      <div style={{display:'grid', gap:'15px'}}>
        {users.map(u => (
          <div key={u._id} className="list-item" style={{borderLeft: u.role === 'superadmin' ? '4px solid gold' : '4px solid #ddd'}}>
            <div>
              <h4 style={{margin:0, fontSize:'1.1rem'}}>{u.name}</h4>
              <p style={{margin:0, fontSize:'0.9rem', color:'#666'}}>{u.email}</p>
              <div style={{marginTop:'5px', fontSize:'0.8rem'}}>
                 <span style={{background:'#eee', padding:'3px 8px', borderRadius:'4px'}}>{u.role}</span>
                 {u.ministry !== 'General' && <span style={{marginLeft:'5px', background:'#eef2ff', padding:'3px 8px', borderRadius:'4px', color:'blue'}}>{u.ministry}</span>}
              </div>
            </div>
            {u.role !== 'superadmin' && (
              <button onClick={() => handleDelete(u._id)} className="btn btn-red">
                <Trash2 size={16}/>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}