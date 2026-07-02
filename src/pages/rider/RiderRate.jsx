import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRide } from '../../context/RideContext';

const tags = ['Great driver!', 'Very safe', 'On time', 'Friendly', 'Clean vehicle', 'Recommended route'];

export default function RiderRate() {
  const [stars, setStars] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState([]);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { finishRide } = useRide();
  const navigate = useNavigate();

  const toggleTag = (t) => setSelected(s => s.includes(t) ? s.filter(x => x !== t) : [...s, t]);

  const submit = () => {
    setSubmitted(true);
    setTimeout(() => { finishRide(); navigate('/rider'); }, 2000);
  };

  if (submitted) return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-dark)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ fontSize: 80, marginBottom: 20 }}>🎉</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Thank you!</h2>
      <p style={{ color: 'var(--gray-400)', textAlign: 'center', fontSize: 15, lineHeight: 1.7 }}>
        Your feedback helps make You Special safer for all women.
      </p>
    </div>
  );

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-dark)', padding: 24, display: 'flex', flexDirection: 'column' }}>
      <div style={{ maxWidth: 390, width: '100%', margin: '0 auto', flex: 1 }}>
        {/* Driver summary */}
        <div style={{ textAlign: 'center', paddingTop: 40, marginBottom: 32 }}>
          <div style={{ width: 88, height: 88, borderRadius: '50%', background: 'linear-gradient(135deg,#6B21A8,#F43F5E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, fontWeight: 700, color: 'white', margin: '0 auto 16px' }}>SV</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, marginBottom: 4 }}>Rate Your Ride</h2>
          <p style={{ color: 'var(--gray-400)', fontSize: 14 }}>with Sunita Verma · Koramangala → MG Road</p>

          {/* Fare */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 12, background: 'rgba(168,85,247,.15)', border: '1px solid rgba(168,85,247,.3)', borderRadius: 99, padding: '8px 20px' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: 'var(--purple-400)' }}>₹78</span>
            <span style={{ fontSize: 13, color: 'var(--gray-400)' }}>paid · 5.1 km · 22 min</span>
          </div>
        </div>

        {/* Stars */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: 'var(--gray-400)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.1em', fontWeight: 600 }}>
            How was your ride?
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
            {[1,2,3,4,5].map(s => (
              <button
                key={s}
                style={{ background: 'none', border: 'none', fontSize: 42, cursor: 'pointer', transition: 'transform .15s', transform: (hovered || stars) >= s ? 'scale(1.2)' : 'scale(1)', filter: (hovered || stars) >= s ? 'none' : 'grayscale(1)', opacity: (hovered || stars) >= s ? 1 : .35 }}
                onMouseEnter={() => setHovered(s)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => setStars(s)}
              >⭐</button>
            ))}
          </div>
          {stars > 0 && (
            <div style={{ marginTop: 8, fontWeight: 700, color: stars >= 4 ? '#34d399' : stars >= 3 ? '#fbbf24' : '#f87171' }}>
              {['', 'Poor 😞', 'Below Average 😕', 'Average 🙂', 'Good 😊', 'Excellent! 🎉'][stars]}
            </div>
          )}
        </div>

        {/* Quick Tags */}
        {stars > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: 'var(--gray-400)', marginBottom: 10, fontWeight: 600 }}>What went well?</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {tags.map(t => (
                <button
                  key={t}
                  onClick={() => toggleTag(t)}
                  style={{
                    padding: '8px 14px', borderRadius: 99, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none',
                    background: selected.includes(t) ? 'var(--purple-800)' : 'rgba(255,255,255,.08)',
                    color: selected.includes(t) ? 'white' : 'var(--gray-300)',
                    transition: 'all .2s',
                  }}
                >
                  {selected.includes(t) ? '✓ ' : ''}{t}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Comment */}
        {stars > 0 && (
          <div className="input-group" style={{ marginBottom: 24 }}>
            <label className="input-label">Additional Comments (optional)</label>
            <textarea
              className="input-field"
              rows={3}
              placeholder="Tell us more about your ride experience…"
              value={comment}
              onChange={e => setComment(e.target.value)}
              style={{ resize: 'none' }}
            />
          </div>
        )}

        {/* Report */}
        <div style={{ marginBottom: 20 }}>
          <button className="btn btn-ghost btn-full" style={{ color: 'var(--danger)', fontSize: 13, border: '1px solid rgba(239,68,68,.2)', borderRadius: 'var(--radius-md)' }}>
            🚨 Report an Issue
          </button>
        </div>

        <button className="btn btn-primary btn-full btn-lg" onClick={submit} disabled={stars === 0}>
          Submit Rating
        </button>
        <button className="btn btn-ghost btn-full" style={{ marginTop: 10 }} onClick={() => { finishRide(); navigate('/rider'); }}>
          Skip
        </button>
      </div>
    </div>
  );
}
