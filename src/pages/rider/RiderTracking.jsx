import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRide } from '../../context/RideContext';
import { RiderNav, TopHeader } from '../../components/shared/Navigation';
import { SOSButton, SOSModal, TripShareModal } from '../../components/sos/SOSComponents';
import { Avatar } from '../../components/ui/SharedComponents';

export default function RiderTracking() {
  const { currentRide, sosActive, completeRide } = useRide();
  const [showSOS, setShowSOS] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [routeAlert, setRouteAlert] = useState(true);
  const navigate = useNavigate();

  const driver = currentRide?.driver || {
    name: 'Sunita Verma', initials: 'SV', rating: 4.9, rides: 312,
    vehicle: 'Honda Activa 6G', vehicleNo: 'MH-12-AB-3456', verified: true,
  };

  return (
    <div className="app-screen" style={{ background: 'var(--bg-dark)', position: 'relative' }}>
      {/* Live Map */}
      <div style={{ position: 'relative', flex: 1, minHeight: '55vh', background: 'linear-gradient(180deg,#0f1a2e 0%,#1a0a35 100%)', overflow: 'hidden' }}>
        {/* Animated map SVG */}
        <svg width="100%" height="100%" viewBox="0 0 390 400" style={{ position: 'absolute', inset: 0 }}>
          {/* Grid */}
          {[0,1,2,3,4,5,6].map(i => (
            <line key={`h${i}`} x1="0" y1={i*65} x2="390" y2={i*65} stroke="#6B21A8" strokeWidth="0.4" strokeDasharray="4 12" opacity=".4" />
          ))}
          {[0,1,2,3,4,5,6].map(i => (
            <line key={`v${i}`} x1={i*65} y1="0" x2={i*65} y2="400" stroke="#6B21A8" strokeWidth="0.4" strokeDasharray="4 12" opacity=".4" />
          ))}
          {/* Roads */}
          <path d="M0 200 Q100 180 200 200 Q300 220 390 200" stroke="#7c3aed" strokeWidth="4" fill="none" />
          <path d="M200 0 Q215 200 200 400" stroke="#7c3aed" strokeWidth="4" fill="none" />
          <path d="M0 100 Q130 80 200 100 Q280 120 390 90" stroke="#4f46e5" strokeWidth="2" fill="none" />
          {/* Planned route */}
          <path d="M110 300 Q150 250 200 200 Q240 160 280 120" stroke="#a855f7" strokeWidth="3" fill="none" strokeDasharray="8 4" opacity=".8" />
          {/* Pickup point */}
          <circle cx="110" cy="300" r="12" fill="rgba(16,185,129,.3)" stroke="#34d399" strokeWidth="2" />
          <circle cx="110" cy="300" r="6" fill="#34d399" />
          {/* Drop point */}
          <circle cx="280" cy="120" r="12" fill="rgba(244,63,94,.3)" stroke="#F43F5E" strokeWidth="2" />
          <circle cx="280" cy="120" r="6" fill="#F43F5E" />
          {/* Animated driver */}
          <circle cx="170" cy="230" r="16" fill="#6B21A8" stroke="#fff" strokeWidth="2.5">
            <animateMotion dur="8s" repeatCount="indefinite" path="M0,0 Q30,-50 80,-110" />
          </circle>
          <text x="162" y="234" fontSize="14" fill="white" fontWeight="bold">🏍</text>
        </svg>

        {/* Route deviation alert */}
        {routeAlert && (
          <div style={{ position: 'absolute', top: 16, left: 16, right: 16, background: 'rgba(245,158,11,.15)', border: '1px solid rgba(245,158,11,.4)', borderRadius: 'var(--radius-md)', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, zIndex: 20 }}>
            <span style={{ fontSize: 18 }}>⚠️</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#fbbf24' }}>Slight route deviation detected</div>
              <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>Driver took alternate road. Monitoring active.</div>
            </div>
            <button onClick={() => setRouteAlert(false)} style={{ background: 'none', border: 'none', color: 'var(--gray-400)', fontSize: 18, cursor: 'pointer' }}>×</button>
          </div>
        )}

        {/* ETA chip */}
        <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', background: 'rgba(107,33,168,.85)', backdropFilter: 'blur(12px)', borderRadius: 99, padding: '10px 24px', display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22 }}>8</div>
            <div style={{ fontSize: 10, color: 'var(--gray-400)', textTransform: 'uppercase' }}>min</div>
          </div>
          <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,.2)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22 }}>₹78</div>
            <div style={{ fontSize: 10, color: 'var(--gray-400)', textTransform: 'uppercase' }}>fare</div>
          </div>
          <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,.2)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22 }}>3.2</div>
            <div style={{ fontSize: 10, color: 'var(--gray-400)', textTransform: 'uppercase' }}>km left</div>
          </div>
        </div>
      </div>

      {/* Bottom Panel */}
      <div style={{ background: 'var(--bg-dark-2)', borderTop: '1px solid rgba(255,255,255,.1)', padding: '20px 20px 100px' }}>
        {/* Driver info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg,#6B21A8,#F43F5E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, color: 'white', flexShrink: 0 }}>
            {driver.initials}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
              <span style={{ fontWeight: 700, fontSize: 16 }}>{driver.name}</span>
              <span style={{ background: 'rgba(16,185,129,.15)', color: '#34d399', fontSize: 10, padding: '2px 8px', borderRadius: 99, fontWeight: 700 }}>✓ VERIFIED</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>🛵 {driver.vehicle} · {driver.vehicleNo}</div>
            <div style={{ fontSize: 12, color: '#fbbf24' }}>⭐ {driver.rating} · {driver.rides} rides</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-secondary btn-sm btn-icon" style={{ borderRadius: 'var(--radius-full)', padding: 12 }}>📞</button>
          </div>
        </div>

        {/* Route */}
        <div style={{ background: 'rgba(255,255,255,.04)', borderRadius: 'var(--radius-md)', padding: '12px 14px', marginBottom: 16, display: 'flex', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, paddingTop: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--success)' }} />
            <div style={{ width: 1, height: 24, background: 'var(--gray-600)' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--pink-500)' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{currentRide?.pickup || 'Koramangala 6th Block'}</div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{currentRide?.drop || 'MG Road Metro'}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
          <button className="btn btn-secondary" style={{ fontSize: 13 }} onClick={() => setShowShare(true)}>
            📤 Share Trip
          </button>
          <button className="btn btn-secondary" style={{ fontSize: 13 }}>
            💬 Chat
          </button>
        </div>

        <button className="btn btn-success btn-full" onClick={() => { completeRide(); navigate('/rider/rate'); }}>
          ✓ Complete Ride (Demo)
        </button>
      </div>

      {/* SOS Button */}
      <button className="sos-button" onClick={() => setShowSOS(true)}>
        <span style={{ fontSize: 16 }}>🆘</span>
        <span>SOS</span>
      </button>

      {/* Modals */}
      {showSOS  && <SOSModal onClose={() => setShowSOS(false)} />}
      {showShare && <TripShareModal onClose={() => setShowShare(false)} />}
    </div>
  );
}
