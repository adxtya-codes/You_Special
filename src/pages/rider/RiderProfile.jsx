import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { RiderNav, TopHeader } from '../../components/shared/Navigation';
import { Avatar, Stars, Badge } from '../../components/ui/SharedComponents';

export default function RiderProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([
    { name: 'Neha Sharma', phone: '+91 99887 76655', relation: 'Sister' },
  ]);
  const [showAddContact, setShowAddContact] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  const menuItems = [
    { icon: '🔔', label: 'Notifications', sub: 'Ride alerts, offers' },
    { icon: '🔒', label: 'Privacy & Safety', sub: 'Anonymous calls, data' },
    { icon: '💳', label: 'Payment Methods', sub: 'UPI, cards, wallet' },
    { icon: '🎁', label: 'Refer & Earn', sub: 'Get ₹50 per referral' },
    { icon: '🆘', label: '24/7 Help Center', sub: 'Chat, call, report' },
    { icon: '📋', label: 'Terms & Privacy', sub: 'Legal documents' },
  ];

  return (
    <div className="app-screen" style={{ background: 'var(--bg-dark)' }}>
      <TopHeader title="My Profile" />

      <div className="app-content" style={{ padding: '0 20px 16px' }}>
        {/* Profile Card */}
        <div className="glass-card" style={{ padding: 24, marginTop: 16, marginBottom: 20, borderRadius: 'var(--radius-xl)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ position: 'relative' }}>
              <Avatar user={user} size="xl" />
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: '50%', background: 'var(--purple-600)', border: '2px solid var(--bg-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, cursor: 'pointer' }}>
                ✏️
              </div>
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22 }}>{user?.name || 'Priya Sharma'}</h2>
              <div style={{ color: 'var(--gray-400)', fontSize: 13, marginBottom: 6 }}>{user?.phone || '+91 98765 43210'}</div>
              <Badge variant="verified">✓ Verified Rider</Badge>
            </div>
          </div>

          <div className="divider" />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', textAlign: 'center', gap: 0 }}>
            {[
              { label: 'Total Rides', val: user?.rides || 42 },
              { label: 'Rating Given', val: '⭐ 4.8' },
              { label: 'Member Since', val: '2024' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20 }}>{s.val}</div>
                <div style={{ fontSize: 10, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '.05em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="glass-card" style={{ padding: 20, marginBottom: 16, borderRadius: 'var(--radius-xl)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>🆘 Emergency Contacts</div>
              <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 2 }}>Alerted automatically during SOS</div>
            </div>
            <button className="btn btn-sm btn-primary" onClick={() => setShowAddContact(true)}>+ Add</button>
          </div>

          {contacts.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderTop: '1px solid rgba(255,255,255,.07)' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#6B21A8,#F43F5E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>👩</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{c.relation} · {c.phone}</div>
              </div>
              <button style={{ background: 'none', border: 'none', color: 'var(--gray-500)', cursor: 'pointer', fontSize: 18 }} onClick={() => setContacts(cs => cs.filter((_, j) => j !== i))}>×</button>
            </div>
          ))}

          {contacts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '16px 0', color: 'var(--gray-500)', fontSize: 13 }}>
              No contacts added yet. Add one for safety!
            </div>
          )}
        </div>

        {/* Menu */}
        <div className="glass-card" style={{ padding: '8px 0', borderRadius: 'var(--radius-xl)', marginBottom: 16 }}>
          {menuItems.map((item, i) => (
            <button key={i} className="list-item" style={{ width: '100%', border: 'none', background: 'none', color: 'white', borderBottom: i < menuItems.length - 1 ? '1px solid rgba(255,255,255,.06)' : 'none', borderRadius: 0, padding: '14px 20px' }}>
              <span style={{ fontSize: 22 }}>{item.icon}</span>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{item.label}</div>
                <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>{item.sub}</div>
              </div>
              <span style={{ color: 'var(--gray-500)', fontSize: 18 }}>›</span>
            </button>
          ))}
        </div>

        {/* Logout */}
        <button className="btn btn-danger btn-full" onClick={handleLogout}>Logout</button>
      </div>

      {/* Add Contact Modal */}
      {showAddContact && (
        <div className="modal-overlay" onClick={() => setShowAddContact(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>Add Emergency Contact</h3>
            <div className="input-group">
              <label className="input-label">Name</label>
              <input className="input-field" placeholder="e.g. Mom" id="ec-name" />
            </div>
            <div className="input-group">
              <label className="input-label">Phone</label>
              <input className="input-field" type="tel" placeholder="+91 99000 00000" id="ec-phone" />
            </div>
            <div className="input-group">
              <label className="input-label">Relation</label>
              <select className="input-field" id="ec-rel" style={{ colorScheme: 'dark' }}>
                <option>Mother</option><option>Sister</option><option>Friend</option><option>Other</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-secondary btn-full" onClick={() => setShowAddContact(false)}>Cancel</button>
              <button className="btn btn-primary btn-full" onClick={() => {
                setContacts(cs => [...cs, { name: document.getElementById('ec-name')?.value || 'Mom', phone: document.getElementById('ec-phone')?.value || '+91 99000 00000', relation: document.getElementById('ec-rel')?.value || 'Mother' }]);
                setShowAddContact(false);
              }}>Save Contact</button>
            </div>
          </div>
        </div>
      )}

      <RiderNav />
    </div>
  );
}
