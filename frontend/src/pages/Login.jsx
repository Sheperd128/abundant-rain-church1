import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../apiClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/admin'); // Redirect directly to admin dashboard
      window.location.reload();
    } catch (err) {
      setError('Invalid credentials. Please check your email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundImage: "url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      {/* Dark Overlay */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(24, 44, 91, 0.8)' }}></div>

      {/* Login Card */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        backgroundColor: 'white', 
        padding: '40px', 
        borderRadius: '10px', 
        width: '100%', 
        maxWidth: '400px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ width: '60px', height: '60px', backgroundColor: 'var(--church-gold)', color: 'var(--church-blue)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto', fontSize: '1.5rem', fontWeight: 'bold' }}>AR</div>
          <h2 style={{ color: 'var(--church-blue)', fontSize: '1.8rem', fontWeight: 'bold' }}>Staff Portal</h2>
          <p style={{ color: '#666' }}>Sign in to manage the church app</p>
        </div>

        {error && <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '10px', borderRadius: '5px', marginBottom: '20px', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>Email Address</label>
            <input 
              type="email" 
              required
              className="form-control"
              placeholder="pastor@abundantrain.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>Password</label>
            <input 
              type="password" 
              required
              className="form-control"
              placeholder="••••••••"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '5px' }}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '1rem' }}
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link to="/" style={{ color: '#666', fontSize: '0.9rem' }}>← Back to Website</Link>
        </div>
      </div>
    </div>
  );
}