import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function RiderSignup() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', phone: '', email: '', dob: '', gender: 'female' });
  const { loginAsRider } = useAuth();
  const navigate = useNavigate();

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    loginAsRider({ ...form, initials: form.name.slice(0, 2).toUpperCase(), id: 'r_new', rating: 5, rides: 0 });
    navigate('/rider');
  };

  return (
    <div className="app-screen bg-brand-gradient" style={{ padding: 24, minHeight: '100dvh' }}>
      <div style={{ maxWidth: 390, width: '100%', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 32, marginTop: 20 }}>
          <button className="btn btn-ghost" onClick={() => navigate('/login')} style={{ padding: '6px 0', marginBottom: 16, color: 'var(--gray-400)' }}>← Back</button>
          <h1 className="text-heading" style={{ fontSize: 28, marginBottom: 4 }}>Join as Rider 🛵</h1>
          <p style={{ color: 'var(--gray-400)', fontSize: 14 }}>Create your free account in seconds</p>
        </div>

        {/* Step indicator */}
        <div className="step-progress" style={{ marginBottom: 28 }}>
          <div className={`step-dot ${step >= 1 ? 'done' : 'todo'}`}>✓</div>
          <div className={`step-line ${step >= 2 ? 'done' : ''}`} />
          <div className={`step-dot ${step === 2 ? 'active' : step > 2 ? 'done' : 'todo'}`}>2</div>
          <div className={`step-line ${step >= 3 ? 'done' : ''}`} />
          <div className={`step-dot ${step === 3 ? 'active' : 'todo'}`}>3</div>
        </div>

        <div className="glass-card" style={{ padding: 24 }}>
          {step === 1 && (
            <>
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 20 }}>Personal Details</h3>
              <div className="input-group">
                <label className="input-label">Full Name</label>
                <input className="input-field" placeholder="e.g. Priya Sharma" value={form.name} onChange={e => update('name', e.target.value)} />
              </div>
              <div className="input-group">
                <label className="input-label">Phone Number</label>
                <input className="input-field" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => update('phone', e.target.value)} />
              </div>
              <div className="input-group">
                <label className="input-label">Email (optional)</label>
                <input className="input-field" type="email" placeholder="priya@email.com" value={form.email} onChange={e => update('email', e.target.value)} />
              </div>
              <button className="btn btn-primary btn-full" onClick={() => setStep(2)} disabled={!form.name || !form.phone}>Continue →</button>
            </>
          )}

          {step === 2 && (
            <>
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 20 }}>Safety Setup</h3>
              <div className="input-group">
                <label className="input-label">Emergency Contact Name</label>
                <input className="input-field" placeholder="Sister / Mom / Friend" />
              </div>
              <div className="input-group">
                <label className="input-label">Emergency Contact Phone</label>
                <input className="input-field" type="tel" placeholder="+91 99887 76655" />
              </div>
              <div className="glass-card" style={{ padding: 14, marginBottom: 16, borderRadius: 'var(--radius-md)' }}>
                <p style={{ fontSize: 13, color: 'var(--purple-300)', lineHeight: 1.6 }}>
                  🔒 <strong>Privacy First:</strong> Your phone number is always masked from drivers. All calls go through anonymous routing.
                </p>
              </div>
              <button className="btn btn-primary btn-full" onClick={() => setStep(3)}>Continue →</button>
            </>
          )}

          {step === 3 && (
            <>
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>You're all set! 🎉</h3>
              <p style={{ color: 'var(--gray-400)', fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
                Welcome to You Special. You're joining thousands of women who ride safely every day.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                {['Women-only driver matching', 'Live GPS trip sharing', 'SOS emergency alert', '24/7 women safety team'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(16,185,129,.15)', border: '1px solid rgba(16,185,129,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399', fontSize: 14, flexShrink: 0 }}>✓</div>
                    <span style={{ fontSize: 14 }}>{f}</span>
                  </div>
                ))}
              </div>

              <button className="btn btn-primary btn-full btn-lg" onClick={submit}>Start Riding 🛵</button>
            </>
          )}
        </div>

        <p style={{ textAlign: 'center', color: 'var(--gray-600)', fontSize: 11, marginTop: 20 }}>
          By signing up you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
