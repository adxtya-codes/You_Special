import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useRide } from '../../context/RideContext';
import { RiderNav } from '../../components/shared/Navigation';
import { Avatar, Spinner } from '../../components/ui/SharedComponents';

const quickLocations = [
  { icon: '🏥', label: 'Hospital', sub: 'Manipal, Koramangala' },
  { icon: '🏫', label: 'College',  sub: 'Christ University' },
  { icon: '🏢', label: 'Office',   sub: 'Whitefield IT Park' },
  { icon: '🚇', label: 'Metro',    sub: 'Indiranagar Station' },
];

const nearbyDrivers = [
  { name: 'Sunita V.', dist: '0.4 km', eta: '2 min', rating: 4.9 },
  { name: 'Anjali G.', dist: '1.2 km', eta: '5 min', rating: 4.6 },
  { name: 'Deepa N.',  dist: '2.1 km', eta: '8 min', rating: 4.7 },
];

export default function RiderHome() {
  const { user } = useAuth();
  const { rideStep, bookRide, currentRide, startTracking } = useRide();
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const navigate = useNavigate();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  const handleBook = () => {
    if (!pickup || !drop) return;
    bookRide(pickup, drop);
  };

  return (
    <div className="app-screen" style={{ background: 'var(--bg-dark)' }}>
      {/* Map Background */}
      <div style={{ position: 'relative', height: '42vh', overflow: 'hidden', background: 'linear-gradient(180deg,#1a0a35 0%,#0f1a2e 100%)' }}>
        {/* Fake map with animated dots */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="100%" height="100%" viewBox="0 0 390 300" style={{ opacity: .35 }}>
            {/* Grid lines */}
            {[0,1,2,3,4,5].map(i => (
              <line key={`h${i}`} x1="0" y1={i*60} x2="390" y2={i*60} stroke="#6B21A8" strokeWidth="0.5" strokeDasharray="4 8" />
            ))}
            {[0,1,2,3,4,5,6].map(i => (
              <line key={`v${i}`} x1={i*65} y1="0" x2={i*65} y2="300" stroke="#6B21A8" strokeWidth="0.5" strokeDasharray="4 8" />
            ))}
            {/* Roads */}
            <path d="M0 150 Q195 120 390 150" stroke="#9333ea" strokeWidth="2" fill="none" />
            <path d="M195 0 Q210 150 195 300" stroke="#9333ea" strokeWidth="2" fill="none" />
            <path d="M0 80 Q100 60 200 90 Q300 120 390 80" stroke="#7c3aed" strokeWidth="1.5" fill="none" strokeDasharray="6 4" />
            {/* Driver dots */}
            <circle cx="150" cy="130" r="8" fill="#F43F5E" opacity=".9">
              <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="260" cy="170" r="7" fill="#F43F5E" opacity=".7">
              <animate attributeName="r" values="7;10;7" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="90" cy="200" r="6" fill="#a855f7" opacity=".6" />
            {/* You are here */}
            <circle cx="195" cy="150" r="12" fill="#6B21A8" stroke="#fff" strokeWidth="2" />
            <circle cx="195" cy="150" r="6" fill="#fff" />
          </svg>
        </div>

        {/* Top bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '20px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10 }}>
          <div>
            <div style={{ fontSize: 13, color: 'var(--purple-300)', fontWeight: 600 }}>{greeting} 👋</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20 }}>{user?.name?.split(' ')[0] || 'Rider'}</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-icon glass-card" onClick={() => navigate('/rider/profile')} style={{ padding: 10 }}>
              <Avatar user={user} size="sm" />
            </button>
          </div>
        </div>

        {/* Nearby drivers badge */}
        <div style={{ position: 'absolute', bottom: 16, left: 20, background: 'rgba(16,185,129,.15)', border: '1px solid rgba(16,185,129,.3)', borderRadius: 99, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#34d399' }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: '#34d399' }}>3 female drivers nearby</span>
        </div>
      </div>

      {/* Booking Panel */}
      <div className="app-content" style={{ paddingBottom: 100, background: 'var(--bg-dark)' }}>
        <div style={{ padding: '20px 20px 0' }}>

          {/* Booking card */}
          <div className="glass-card" style={{ padding: 20, marginBottom: 20 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, marginBottom: 16 }}>Book Your Ride</div>

            {/* Location inputs */}
            <div style={{ position: 'relative', paddingLeft: 28 }}>
              {/* Route line */}
              <div style={{ position: 'absolute', left: 8, top: 18, bottom: 18, width: 2, background: 'linear-gradient(to bottom, var(--success), var(--pink-500))' }} />
              <div style={{ position: 'absolute', left: 3, top: 14, width: 12, height: 12, borderRadius: '50%', background: 'var(--success)', border: '2px solid var(--bg-dark)' }} />
              <div style={{ position: 'absolute', left: 3, bottom: 14, width: 12, height: 12, borderRadius: '50%', background: 'var(--pink-500)', border: '2px solid var(--bg-dark)' }} />

              <input
                className="input-field"
                placeholder="📍 Pickup location"
                value={pickup}
                onChange={e => setPickup(e.target.value)}
                style={{ marginBottom: 10, background: 'rgba(16,185,129,.08)', borderColor: pickup ? 'var(--success)' : 'rgba(255,255,255,.15)' }}
              />
              <input
                className="input-field"
                placeholder="🏁 Drop location"
                value={drop}
                onChange={e => setDrop(e.target.value)}
                style={{ background: 'rgba(244,63,94,.08)', borderColor: drop ? 'var(--pink-500)' : 'rgba(255,255,255,.15)' }}
              />
            </div>

            {/* Fare estimate */}
            {pickup && drop && rideStep === 'idle' && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '14px 0', padding: '12px 14px', background: 'rgba(168,85,247,.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(168,85,247,.2)' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 22, fontFamily: 'var(--font-display)', color: 'var(--purple-300)' }}>₹55 – ₹85</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>Estimated fare · ~20 min</div>
                </div>
                <div style={{ fontSize: 11, color: 'var(--gray-400)', textAlign: 'right' }}>
                  <div>Women driver</div>
                  <div>guaranteed ✓</div>
                </div>
              </div>
            )}

            {/* Book button */}
            {rideStep === 'idle' && (
              <button className="btn btn-primary btn-full" style={{ marginTop: 4 }} onClick={handleBook} disabled={!pickup || !drop}>
                🛵 Book Women Driver
              </button>
            )}

            {rideStep === 'searching' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0', gap: 12 }}>
                <Spinner size={36} />
                <div style={{ fontWeight: 600 }}>Finding your female driver…</div>
                <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>Matching with verified women drivers nearby</div>
              </div>
            )}

            {(rideStep === 'matched' || rideStep === 'tracking') && currentRide && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderTop: '1px solid rgba(255,255,255,.1)', borderBottom: '1px solid rgba(255,255,255,.1)', marginBottom: 14 }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg,#6B21A8,#F43F5E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                    {currentRide.driver?.initials || 'SV'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700 }}>{currentRide.driver?.name || 'Sunita Verma'}</div>
                    <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>🛵 Honda Activa · MH-12-AB-3456</div>
                    <div style={{ fontSize: 12, color: '#34d399', fontWeight: 600 }}>✓ Verified Female Driver · 4.9★</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--purple-300)' }}>₹78</div>
                    <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>ETA: 3 min</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button className="btn btn-secondary btn-full btn-sm">📞 Call Driver</button>
                  {rideStep === 'matched' && (
                    <button className="btn btn-success btn-full btn-sm" onClick={startTracking}>Track Live →</button>
                  )}
                  {rideStep === 'tracking' && (
                    <button className="btn btn-primary btn-full btn-sm" onClick={() => navigate('/rider/tracking')}>Open Map →</button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quick Destinations */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Quick Destinations</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {quickLocations.map((loc, i) => (
                <button
                  key={i}
                  className="glass-card"
                  style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10, border: 'none', cursor: 'pointer', textAlign: 'left', borderRadius: 'var(--radius-lg)' }}
                  onClick={() => setDrop(loc.label + ', ' + loc.sub)}
                >
                  <span style={{ fontSize: 26 }}>{loc.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{loc.label}</div>
                    <div style={{ fontSize: 11, color: 'var(--gray-500)', lineHeight: 1.3 }}>{loc.sub}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Nearby Drivers */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Female Drivers Nearby</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {nearbyDrivers.map((d, i) => (
                <div key={i} className="glass-card" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, borderRadius: 'var(--radius-lg)' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: `linear-gradient(135deg,hsl(${i * 60 + 270},80%,40%),hsl(${i * 60 + 320},80%,60%))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: 'white' }}>
                    {d.name[0]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{d.name}</div>
                    <div style={{ fontSize: 12, color: '#34d399' }}>✓ Verified · ⭐ {d.rating}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{d.eta}</div>
                    <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{d.dist}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Banner */}
          <div style={{ background: 'linear-gradient(135deg,rgba(107,33,168,.3),rgba(244,63,94,.2))', border: '1px solid rgba(168,85,247,.3)', borderRadius: 'var(--radius-xl)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <span style={{ fontSize: 32 }}>🛡️</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>You are protected</div>
              <div style={{ fontSize: 12, color: 'var(--gray-400)', lineHeight: 1.5 }}>24/7 safety team · SOS always on · Trip auto-shared</div>
            </div>
          </div>
        </div>
      </div>

      <RiderNav />
    </div>
  );
}
