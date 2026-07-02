import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/ui/SharedComponents';

const features = [
  { icon: '🛡️', text: 'Women-only verified drivers' },
  { icon: '📍', text: 'Live GPS tracking always on' },
  { icon: '🆘', text: 'One-tap SOS emergency alert' },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="app-screen bg-brand-gradient" style={{ justifyContent: 'center', alignItems: 'center', padding: 24, minHeight: '100dvh' }}>
      {/* Background blobs */}
      <div style={{ position: 'absolute', top: '-20%', right: '-20%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(107,33,168,.4) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '-20%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,63,94,.3) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 390, zIndex: 1 }}>
        {/* Logo & Brand */}
        <div style={{ textAlign: 'center', marginBottom: 40 }} className="animate-fade-in">
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 100, height: 100, borderRadius: '50%', background: 'rgba(107,33,168,.2)', border: '2px solid rgba(168,85,247,.3)', marginBottom: 24 }} className="animate-float">
            <Logo size={60} />
          </div>
          <h1 className="text-display text-4xl" style={{ marginBottom: 10, letterSpacing: '-.02em' }}>
            You <span className="text-gradient">Special</span>
          </h1>
          <p style={{ color: 'var(--gray-300)', fontSize: 16, lineHeight: 1.6, maxWidth: 280, margin: '0 auto' }}>
            Safe rides for women. With women.<br />
            <strong style={{ color: 'var(--pink-400)' }}>Ride Free. Ride Safe.</strong>
          </p>
        </div>

        {/* Feature Pills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 40 }} className="animate-slide-up">
          {features.map((f, i) => (
            <div key={i} className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', animationDelay: `${i * 80}ms` }}>
              <span style={{ fontSize: 28 }}>{f.icon}</span>
              <span style={{ fontWeight: 600, fontSize: 15 }}>{f.text}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }} className="animate-slide-up" style2={{ animationDelay: '200ms' }}>
          <button className="btn btn-primary btn-full btn-lg" onClick={() => navigate('/onboarding')}>
            🛵 Get Started
          </button>
          <button className="btn btn-secondary btn-full" onClick={() => navigate('/login')}>
            Already have an account? Login
          </button>
        </div>

        {/* Admin shortcut */}
        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <button className="btn btn-ghost" onClick={() => navigate('/admin/login')} style={{ fontSize: 12, color: 'var(--gray-500)' }}>
            Admin Access →
          </button>
        </div>

        <p style={{ textAlign: 'center', color: 'var(--gray-600)', fontSize: 11, marginTop: 24 }}>
          🔒 100% Women-only. Verified & Safe.
        </p>
      </div>
    </div>
  );
}
