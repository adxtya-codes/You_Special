import { useState } from 'react';
import { useRide } from '../../context/RideContext';

export function SOSButton() {
  const { triggerSOS } = useRide();
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {
    setPressed(true);
    triggerSOS();
  };

  return (
    <button className="sos-button" onClick={handlePress} style={pressed ? { background: 'linear-gradient(135deg,#7f1d1d,#dc2626)', animation: 'none', boxShadow: '0 0 0 4px rgba(239,68,68,.5)' } : {}}>
      <span style={{ fontSize: 16 }}>🆘</span>
      <span>SOS</span>
    </button>
  );
}

export function SOSModal({ onClose }) {
  const { clearSOS } = useRide();
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setSent(true);
    setTimeout(() => {
      clearSOS();
      onClose?.();
    }, 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>{sent ? '✅' : '🆘'}</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
            {sent ? 'Alert Sent!' : 'Emergency Alert'}
          </h2>
          {sent ? (
            <p style={{ color: 'var(--gray-400)', fontSize: 14, lineHeight: 1.6 }}>
              Your trusted contacts and the You Special safety team have been notified with your live location. Help is on the way.
            </p>
          ) : (
            <p style={{ color: 'var(--gray-400)', fontSize: 14, lineHeight: 1.6 }}>
              This will immediately alert your emergency contacts and the You Special 24/7 safety team with your current location.
            </p>
          )}
        </div>

        {!sent && (
          <>
            <div className="glass-card" style={{ padding: 16, marginBottom: 16, borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontSize: 12, color: 'var(--purple-400)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 10 }}>
                Emergency Contacts
              </div>
              {[{ name: 'Neha Sharma', phone: '+91 99887 76655', relation: 'Sister' }].map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,var(--purple-800),var(--pink-500))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>👩</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{c.relation} · {c.phone}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-secondary btn-full" onClick={onClose}>Cancel</button>
              <button className="btn btn-danger btn-full" onClick={handleSend}>Send Alert</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function TripShareModal({ onClose }) {
  const [copied, setCopied] = useState(false);
  const fakeLink = 'https://youspecial.app/track/live/Gx9Kp2Rn';

  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Share Trip 🗺️</h2>
        <p style={{ color: 'var(--gray-400)', fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>
          Share your live ride link with trusted people. They can track your journey in real time.
        </p>

        <div className="glass-card" style={{ padding: 14, marginBottom: 16, borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 12, color: 'var(--purple-300)', flex: 1, wordBreak: 'break-all' }}>{fakeLink}</div>
          <button className="btn btn-primary btn-sm" onClick={copy}>{copied ? '✓ Copied' : 'Copy'}</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
          {['WhatsApp 💬', 'SMS 📱', 'Email 📧'].map(s => (
            <button key={s} className="btn btn-secondary btn-sm" style={{ flexDirection: 'column', gap: 4, padding: '12px 8px', fontSize: 11 }}>{s}</button>
          ))}
        </div>

        <button className="btn btn-ghost btn-full" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
