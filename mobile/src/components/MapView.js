import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Line, Path, Circle, Rect, Text as SvgText, Ellipse } from 'react-native-svg';

// Strict palette: white/gray streets, pink brand, black markers
const MAP_BG   = '#F8F5F7';   // near-white with a hint of pink
const BLOCK    = '#EDE8EC';   // slightly darker blocks
const STREET_W = '#FFFFFF';   // white roads
const ROUTE_C  = '#111111';   // black route line (brand black)
const PINK     = '#FFD4E9';   // brand pink for markers/highlights
const PINK_DK  = '#F4B8D8';   // slightly deeper pink for borders
const BLACK    = '#111111';

export default function MapView({ type = 'home' }) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setPulse(p => !p), 900);
    return () => clearInterval(t);
  }, []);

  const dR = pulse ? 12 : 9; // driver dot radius

  return (
    <View style={styles.container}>
      <Svg width="100%" height="100%" viewBox="0 0 390 320">
        {/* Map base */}
        <Rect x="0" y="0" width="390" height="320" fill={MAP_BG} />

        {/* City blocks */}
        {[
          [0, 0, 82, 68], [92, 0, 100, 68], [202, 0, 80, 68], [292, 0, 98, 68],
          [0, 88, 82, 68], [92, 88, 100, 68], [202, 88, 80, 68], [292, 88, 98, 68],
          [0, 176, 82, 76], [92, 176, 100, 76], [202, 176, 80, 76], [292, 176, 98, 76],
          [0, 262, 82, 58], [92, 262, 100, 58], [202, 262, 80, 58], [292, 262, 98, 58],
        ].map(([x, y, w, h], i) => (
          <Rect key={i} x={x} y={y} width={w} height={h} fill={BLOCK} />
        ))}

        {/* Streets — white */}
        <Rect x="0"   y="76"  width="390" height="10" fill={STREET_W} />
        <Rect x="0"   y="164" width="390" height="10" fill={STREET_W} />
        <Rect x="0"   y="252" width="390" height="10" fill={STREET_W} />
        <Rect x="84"  y="0"   width="8"   height="320" fill={STREET_W} />
        <Rect x="194" y="0"   width="8"   height="320" fill={STREET_W} />
        <Rect x="284" y="0"   width="8"   height="320" fill={STREET_W} />

        {/* Park area — very subtle pink */}
        <Rect x="130" y="88"  width="60"  height="68" fill={PINK} rx="4" opacity={0.5} />
        <Rect x="296" y="176" width="90"  height="72" fill={PINK} rx="4" opacity={0.3} />

        {type === 'home' && (
          <>
            {/* Driver pings — pink filled */}
            <Circle cx="130" cy="122" r={dR + 5} fill={PINK} opacity={0.4} />
            <Circle cx="130" cy="122" r={dR} fill={PINK_DK} stroke={BLACK} strokeWidth="1.5" />

            <Circle cx="265" cy="145" r={dR - 1} fill={PINK_DK} stroke={BLACK} strokeWidth="1.5" />
            <Circle cx="58"  cy="205" r="7" fill={PINK} stroke={BLACK} strokeWidth="1" />

            {/* User dot — solid black */}
            <Circle cx="198" cy="170" r="16" fill={PINK} opacity={0.35} />
            <Circle cx="198" cy="170" r="9" fill={BLACK} stroke={STREET_W} strokeWidth="2.5" />
          </>
        )}

        {(type === 'tracking' || type === 'admin') && (
          <>
            {/* Route glow */}
            <Path
              d="M100 285 Q130 245 165 205 Q200 165 242 132 Q266 112 292 88"
              stroke={PINK_DK} strokeWidth="10" fill="none" opacity={0.4}
            />
            {/* Route line — black */}
            <Path
              d="M100 285 Q130 245 165 205 Q200 165 242 132 Q266 112 292 88"
              stroke={BLACK} strokeWidth="3.5" fill="none"
              strokeDasharray="0"
            />

            {/* Pickup marker — pink circle */}
            <Circle cx="100" cy="285" r="14" fill={PINK} stroke={BLACK} strokeWidth="2" />
            <Circle cx="100" cy="285" r="5" fill={BLACK} />

            {/* Drop marker — black filled */}
            <Circle cx="292" cy="88" r="14" fill={BLACK} stroke={STREET_W} strokeWidth="2" />
            <Circle cx="292" cy="88" r="5" fill={STREET_W} />

            {/* Driver position */}
            <Circle cx="192" cy="188" r="16" fill={BLACK} stroke={STREET_W} strokeWidth="2.5" />
            <Circle cx="192" cy="188" r="5"  fill={PINK} />
          </>
        )}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', height: '100%', backgroundColor: '#F8F5F7' },
});
