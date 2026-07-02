import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/ui/SharedComponents';

export default function Login() {
  const [role, setRole] = useState('rider');
  const [phone, setPhone] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginAsRider, loginAsDriver } = useAuth();
  const navigate = useNavigate();

  const sendOtp = () => {
    if (phone.length < 10) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setOtpStep(true); }, 1200);
  };

  const verify = () => {
    setLoading(true);
    setTimeout(() => {
      if (role === 'rider') { loginAsRider(); navigate('/rider'); }
      else { loginAsDriver(); navigate('/driver'); }
    }, 1000);
  };

  return (
    <div className="app-screen bg-brand-gradient" style={{ justifyContent: 'center', padding: 24, minHeight: '100dvh' }}>
      <div style={{ position: 'absolute', top: '-15%', left: '-20%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,.35) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 390, zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 36 }}>
          <Logo size={44} />
          <div>
            <h1 className="text-heading" style={{ fontSize: 24 }}>Welcome Back 👋</h1>
            <p style={{ color: 'var(--gray-400)', fontSize: 13 }}>Login to You Special</p>
          </div>
        </div>

        {/* Role Toggle */}
        <div className="toggle-group" style={{ marginBottom: 28 }}>
          <button className={`toggle-btn ${role === 'rider' ? 'active' : ''}`} onClick={() => setRole('rider')}>🛵 I'm a Rider</button>
          <button className={`toggle-btn ${role === 'driver' ? 'active' : ''}`} onClick={() => setRole('driver')}>🏍️ I'm a Driver</button>
        </div>

        {/* Form */}
        <div className="glass-card" style={{ padding: 24 }}>
          {!otpStep ? (
            <>
              <div className="input-group">
                <label className="input-label">Mobile Number</label>
                <div className="input-with-icon">
                  <span className="input-icon" style={{ fontSize: 16 }}>📱</span>
                  <input
                    className="input-field"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    maxLength={13}
                  />
                </div>
              </div>
              <button className="btn btn-primary btn-full" onClick={sendOtp} disabled={loading || phone.length < 10}>
                {loading ? '⏳ Sending OTP…' : 'Send OTP →'}
              </button>
            </>
          ) : (
            <>
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>📲</div>
                <p style={{ color: 'var(--gray-300)', fontSize: 14 }}>OTP sent to <strong>{phone}</strong></p>
                <p style={{ color: 'var(--gray-500)', fontSize: 12 }}>Enter 6-digit code (use any for demo)</p>
              </div>

              {/* OTP boxes */}
              <div style={{ display: 'flex', gap: 10, marginBottom: 24, justifyContent: 'center' }}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: 46, height: 54,
                      border: `2px solid ${otp[i] ? 'var(--purple-500)' : 'rgba(255,255,255,.2)'}`,
                      borderRadius: 10,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 24, fontWeight: 700,
                      background: otp[i] ? 'rgba(168,85,247,.15)' : 'rgba(255,255,255,.04)',
                      transition: 'all .2s',
                    }}
                  >
                    {otp[i] || ''}
                  </div>
                ))}
              </div>
              <input
                style={{ opacity: 0, position: 'absolute', pointerEvents: 'none' }}
                type="number"
                value={otp}
                onChange={e => setOtp(e.target.value.slice(0, 6))}
                autoFocus
              />
              {/* Fake keypad trigger */}
              <button
                className="btn btn-secondary btn-full"
                onClick={() => { const v = prompt('Enter 6-digit OTP (any for demo):') || '123456'; setOtp(v.slice(0, 6)); }}
                style={{ marginBottom: 12 }}
              >
                Tap to Enter OTP
              </button>
              <button className="btn btn-primary btn-full" onClick={verify} disabled={loading || otp.length < 4}>
                {loading ? '⏳ Verifying…' : 'Verify & Login ✓'}
              </button>
              <button className="btn btn-ghost btn-full" onClick={() => setOtpStep(false)} style={{ marginTop: 8 }}>
                ← Change Number
              </button>
            </>
          )}
        </div>

        {/* Sign up */}
        <div style={{ textAlign: 'center', marginTop: 24, color: 'var(--gray-400)', fontSize: 13 }}>
          New to You Special?{' '}
          <button className="btn btn-ghost" style={{ padding: '2px 6px', color: 'var(--purple-400)', fontWeight: 700 }} onClick={() => navigate(role === 'rider' ? '/signup/rider' : '/signup/driver')}>
            Sign Up Free →
          </button>
        </div>
      </div>
    </div>
  );
}
