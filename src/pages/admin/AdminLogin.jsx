import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../../components/ui/SharedComponents';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginAsAdmin } = useAuth();
  const navigate = useNavigate();

  const login = () => {
    if (password === 'admin123' || password.length >= 4) {
      loginAsAdmin();
      navigate('/admin');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="app-screen bg-brand-gradient" style={{ justifyContent: 'center', alignItems: 'center', padding: 24, minHeight: '100dvh' }}>
      <div style={{ width: '100%', maxWidth: 380, zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Logo size={56} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26, marginTop: 16, marginBottom: 6 }}>Admin Portal</h1>
          <p style={{ color: 'var(--gray-400)', fontSize: 13 }}>You Special Control Center</p>
        </div>

        <div className="glass-card" style={{ padding: 24 }}>
          <div className="input-group">
            <label className="input-label">Admin Email</label>
            <input className="input-field" type="email" defaultValue="admin@youspecial.app" readOnly style={{ opacity: .7 }} />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input className="input-field" type="password" placeholder="Enter admin password" value={password} onChange={e => { setPassword(e.target.value); setError(''); }} />
          </div>
          {error && <div style={{ color: '#f87171', fontSize: 13, marginBottom: 12 }}>{error}</div>}
          <p style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 16 }}>Demo: type any 4+ chars and press Enter</p>
          <button className="btn btn-primary btn-full" onClick={login}>Login to Dashboard →</button>
        </div>

        <button className="btn btn-ghost btn-full" onClick={() => navigate('/')} style={{ marginTop: 16, color: 'var(--gray-500)' }}>← Back to App</button>
      </div>
    </div>
  );
}
