import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function DriverSignup() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', phone: '', vehicle: '', vehicleNo: '', idType: 'aadhaar' });
  const [idUploaded, setIdUploaded] = useState(false);
  const { loginAsDriver } = useAuth();
  const navigate = useNavigate();

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    loginAsDriver({ ...form, initials: form.name.slice(0, 2).toUpperCase(), id: 'd_new', rating: 5, rides: 0, verified: false, online: false, earnings: 0 });
    navigate('/driver');
  };

  return (
    <div className="app-screen bg-brand-gradient" style={{ padding: 24, minHeight: '100dvh' }}>
      <div style={{ maxWidth: 390, width: '100%', margin: '0 auto' }}>
        <div style={{ marginBottom: 32, marginTop: 20 }}>
          <button className="btn btn-ghost" onClick={() => navigate('/login')} style={{ padding: '6px 0', marginBottom: 16, color: 'var(--gray-400)' }}>← Back</button>
          <h1 className="text-heading" style={{ fontSize: 28, marginBottom: 4 }}>Join as Driver 🏍️</h1>
          <p style={{ color: 'var(--gray-400)', fontSize: 14 }}>Earn flexibly. Ride safely. Empower women.</p>
        </div>

        <div className="step-progress" style={{ marginBottom: 28 }}>
          {[1,2,3,4].map((s, i) => (
            <>
              <div key={`dot-${s}`} className={`step-dot ${step > s ? 'done' : step === s ? 'active' : 'todo'}`}>
                {step > s ? '✓' : s}
              </div>
              {i < 3 && <div key={`line-${s}`} className={`step-line ${step > s ? 'done' : ''}`} />}
            </>
          ))}
        </div>

        <div className="glass-card" style={{ padding: 24 }}>
          {step === 1 && (
            <>
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 20 }}>Personal Details</h3>
              <div className="input-group">
                <label className="input-label">Full Name</label>
                <input className="input-field" placeholder="e.g. Sunita Verma" value={form.name} onChange={e => update('name', e.target.value)} />
              </div>
              <div className="input-group">
                <label className="input-label">Phone Number</label>
                <input className="input-field" type="tel" placeholder="+91 90000 11111" value={form.phone} onChange={e => update('phone', e.target.value)} />
              </div>
              <div className="input-group">
                <label className="input-label">Date of Birth</label>
                <input className="input-field" type="date" style={{ colorScheme: 'dark' }} />
              </div>
              <button className="btn btn-primary btn-full" onClick={() => setStep(2)} disabled={!form.name || !form.phone}>Continue →</button>
            </>
          )}

          {step === 2 && (
            <>
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 20 }}>Vehicle Details</h3>
              <div className="input-group">
                <label className="input-label">Vehicle Type</label>
                <select className="input-field" value={form.vehicle} onChange={e => update('vehicle', e.target.value)} style={{ colorScheme: 'dark' }}>
                  <option value="">Select vehicle</option>
                  <option>Honda Activa 6G</option>
                  <option>TVS Jupiter</option>
                  <option>Honda Dio</option>
                  <option>Suzuki Access 125</option>
                  <option>Yamaha Ray ZR</option>
                  <option>Other Scooter</option>
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">Registration Number</label>
                <input className="input-field" placeholder="MH-12-AB-3456" value={form.vehicleNo} onChange={e => update('vehicleNo', e.target.value)} style={{ textTransform: 'uppercase' }} />
              </div>
              <div className="input-group">
                <label className="input-label">Driving Licence No.</label>
                <input className="input-field" placeholder="MH1234567890123" />
              </div>
              <button className="btn btn-primary btn-full" onClick={() => setStep(3)} disabled={!form.vehicle || !form.vehicleNo}>Continue →</button>
            </>
          )}

          {step === 3 && (
            <>
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>ID Verification</h3>
              <p style={{ color: 'var(--gray-400)', fontSize: 13, marginBottom: 20 }}>Upload a government photo ID for verification. Only verified women can drive on You Special.</p>

              <div className="input-group">
                <label className="input-label">ID Type</label>
                <div className="toggle-group" style={{ marginBottom: 16 }}>
                  {['aadhaar', 'pan', 'voter'].map(t => (
                    <button key={t} className={`toggle-btn ${form.idType === t ? 'active' : ''}`} onClick={() => update('idType', t)} style={{ fontSize: 12, padding: '8px 10px' }}>
                      {t === 'aadhaar' ? 'Aadhaar' : t === 'pan' ? 'PAN' : 'Voter ID'}
                    </button>
                  ))}
                </div>
              </div>

              {!idUploaded ? (
                <button
                  style={{ width: '100%', height: 120, border: '2px dashed rgba(168,85,247,.4)', borderRadius: 'var(--radius-lg)', background: 'rgba(168,85,247,.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', color: 'var(--purple-400)', marginBottom: 16 }}
                  onClick={() => setIdUploaded(true)}
                >
                  <span style={{ fontSize: 36 }}>📷</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Tap to Upload ID Photo</span>
                  <span style={{ fontSize: 11, color: 'var(--gray-500)' }}>JPG, PNG up to 5MB</span>
                </button>
              ) : (
                <div style={{ width: '100%', height: 120, borderRadius: 'var(--radius-lg)', background: 'rgba(16,185,129,.1)', border: '2px solid rgba(16,185,129,.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
                  <span style={{ fontSize: 36 }}>✅</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#34d399' }}>ID Uploaded Successfully</span>
                </div>
              )}

              <button className="btn btn-primary btn-full" onClick={() => setStep(4)} disabled={!idUploaded}>Continue →</button>
            </>
          )}

          {step === 4 && (
            <>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
                <h3 style={{ fontWeight: 800, fontSize: 22, marginBottom: 8 }}>Application Submitted!</h3>
                <p style={{ color: 'var(--gray-400)', fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
                  Your profile is under review. We verify every driver carefully for the safety of all riders. You'll get notified within <strong style={{ color: 'var(--purple-400)' }}>24–48 hours</strong>.
                </p>
                <div className="glass-card" style={{ padding: 16, borderRadius: 'var(--radius-lg)', marginBottom: 20, textAlign: 'left' }}>
                  {['ID verification (24h)', 'Background check (24h)', 'Vehicle inspection (optional)', 'Training module (30 min)'].map((s, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: i < 3 ? 12 : 0 }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: i === 0 ? 'rgba(16,185,129,.2)' : 'rgba(255,255,255,.08)', border: `1px solid ${i === 0 ? 'rgba(16,185,129,.4)' : 'rgba(255,255,255,.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: i === 0 ? '#34d399' : 'var(--gray-500)' }}>
                        {i === 0 ? '✓' : i + 1}
                      </div>
                      <span style={{ fontSize: 13, color: i === 0 ? 'var(--white)' : 'var(--gray-400)' }}>{s}</span>
                    </div>
                  ))}
                </div>
                <button className="btn btn-primary btn-full" onClick={submit}>Enter App →</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
