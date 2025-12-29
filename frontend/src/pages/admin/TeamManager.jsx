import { useState, useEffect } from 'react';
import api from '../../apiClient';
import { Trash2, UserPlus, Shield } from 'lucide-react';

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
    if (window.confirm('Are you sure? This will delete their account permanently.')) {
      try {
        await api.delete(`/auth/users/${id}`);
        fetchUsers();
      } catch (error) { alert('Error deleting user'); }
    }
  };

  return (
    <div>
      <h1>Team Management</h1>
      <p style={{color:'#666', marginBottom:'20px'}}>Create accounts for your ministry leaders.</p>

      {/* CREATE USER FORM */}
      <div className="card" style={{marginBottom:'30px', borderTop:'5px solid var(--church-blue)'}}>
        <h3>Add New Leader</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group" style={{flex:1}}>
              <label>Full Name</label>
              <input className="form-control" required value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} />
            </div>
            <div className="form-group" style={{flex:1}}>
              <label>Email (Login Username)</label>
              <input type="email" className="form-control" required value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group" style={{flex:1}}>
              <label>Password</label>
              <input type="text" className="form-control" required value={formData.password} onChange={e=>setFormData({...formData, password:e.target.value})} />
            </div>
            <div className="form-group" style={{flex:1}}>
              <label>Phone Number</label>
              <input className="form-control" value={formData.phone} onChange={e=>setFormData({...formData, phone:e.target.value})} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group" style={{flex:1}}>
              <label>Role</label>
              <select className="form-control" value={formData.role} onChange={e=>setFormData({...formData, role:e.target.value})}>
                <option value="ministry_leader">Ministry Leader</option>
                <option value="admin">Admin (Helper)</option>
                <option value="superadmin">Super Admin (Pastor)</option>
              </select>
            </div>
            <div className="form-group" style={{flex:1}}>
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
          <button type="submit" className="btn btn-primary"><UserPlus size={18} /> Create Account</button>
        </form>
      </div>

      {/* USER LIST */}
      <div style={{display:'grid', gap:'15px'}}>
        {users.map(u => (
          <div key={u._id} className="card" style={{display:'flex', justifyContent:'space-between', alignItems:'center', borderLeft: u.role === 'superadmin' ? '5px solid gold' : '5px solid #ddd'}}>
            <div>
              <h4 style={{margin:0}}>{u.name} <span style={{fontSize:'0.8rem', color:'#666'}}>({u.role})</span></h4>
              <p style={{margin:0, fontSize:'0.9rem', color:'#888'}}>{u.email} | {u.ministry}</p>
            </div>
            {u.role !== 'superadmin' && (
              <button onClick={() => handleDelete(u._id)} className="btn btn-red" style={{padding:'5px 10px'}}><Trash2 size={16}/></button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}