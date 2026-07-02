import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, Animated, StatusBar, Easing, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { colors, radius } from '../theme';

// Mandala decoration — concentric dashed rings with dots
function MandalaBg() {
  const rings = [
    { size: 520, opacity: 0.06 },
    { size: 400, opacity: 0.09 },
    { size: 300, opacity: 0.12 },
    { size: 210, opacity: 0.16 },
  ];
  const petalAngles = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {rings.map((r, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            width: r.size, height: r.size,
            borderRadius: r.size / 2,
            borderWidth: 1,
            borderColor: `rgba(255,182,219,${r.opacity * 2.5})`,
            borderStyle: 'dashed',
            alignSelf: 'center',
            top: '50%',
            marginTop: -(r.size / 2),
          }}
        />
      ))}
      {/* Petal dots at 300px radius */}
      {petalAngles.map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const r = 150;
        return (
          <View
            key={'dot' + i}
            style={{
              position: 'absolute',
              width: 4, height: 4, borderRadius: 2,
              backgroundColor: 'rgba(255,182,219,0.35)',
              alignSelf: 'center',
              top: '50%',
              marginTop: -2 + r * Math.sin(rad),
              marginLeft: r * Math.cos(rad),
            }}
          />
        );
      })}
      {/* Second ring of petals at 220px */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const r = 100;
        return (
          <View
            key={'dot2' + i}
            style={{
              position: 'absolute',
              width: 6, height: 6, borderRadius: 3,
              backgroundColor: 'rgba(255,182,219,0.25)',
              alignSelf: 'center',
              top: '50%',
              marginTop: -3 + r * Math.sin(rad),
              marginLeft: r * Math.cos(rad),
            }}
          />
        );
      })}
    </View>
  );
}

export default function SplashScreen({ navigation }) {
  const { user, role } = useAuth();

  // Animated values
  const logoScale    = useRef(new Animated.Value(0)).current;
  const logoOpacity  = useRef(new Animated.Value(0)).current;
  const ring1Scale   = useRef(new Animated.Value(0.4)).current;
  const ring1Opacity = useRef(new Animated.Value(0)).current;
  const ring2Scale   = useRef(new Animated.Value(0.6)).current;
  const ring2Opacity = useRef(new Animated.Value(0)).current;
  const brandOpacity = useRef(new Animated.Value(0)).current;
  const brandY       = useRef(new Animated.Value(20)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const taglineY     = useRef(new Animated.Value(12)).current;
  const screenOpacity  = useRef(new Animated.Value(1)).current;
  const screenY        = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const ease = Easing.out(Easing.cubic);

    Animated.sequence([
      // 1. Rings expand in
      Animated.parallel([
        Animated.spring(ring1Scale, { toValue: 1, tension: 40, friction: 8, useNativeDriver: true }),
        Animated.timing(ring1Opacity, { toValue: 1, duration: 500, useNativeDriver: true, easing: ease }),
        Animated.spring(ring2Scale, { toValue: 1, tension: 50, friction: 9, delay: 80, useNativeDriver: true }),
        Animated.timing(ring2Opacity, { toValue: 1, duration: 400, delay: 80, useNativeDriver: true, easing: ease }),
      ]),

      // 2. Logo box pops in
      Animated.parallel([
        Animated.spring(logoScale, { toValue: 1, tension: 55, friction: 7, useNativeDriver: true }),
        Animated.timing(logoOpacity, { toValue: 1, duration: 300, useNativeDriver: true, easing: ease }),
      ]),

      Animated.delay(100),

      // 3. Brand name slides up
      Animated.parallel([
        Animated.timing(brandOpacity, { toValue: 1, duration: 380, useNativeDriver: true, easing: ease }),
        Animated.timing(brandY, { toValue: 0, duration: 380, useNativeDriver: true, easing: ease }),
      ]),

      Animated.delay(180),

      // 4. Tagline fades in
      Animated.parallel([
        Animated.timing(taglineOpacity, { toValue: 1, duration: 300, useNativeDriver: true, easing: ease }),
        Animated.timing(taglineY, { toValue: 0, duration: 300, useNativeDriver: true, easing: ease }),
      ]),

      // Hold
      Animated.delay(900),

      // 5. Slide up + fade out
      Animated.parallel([
        Animated.timing(screenOpacity, { toValue: 0, duration: 420, useNativeDriver: true, easing: Easing.in(Easing.cubic) }),
        Animated.timing(screenY, { toValue: -60, duration: 420, useNativeDriver: true, easing: Easing.in(Easing.cubic) }),
      ]),
    ]).start(() => {
      if (user && role === 'rider')  navigation.replace('RiderApp');
      else if (user && role === 'driver') navigation.replace('DriverApp');
      else if (user && role === 'admin')  navigation.replace('AdminApp');
      else navigation.replace('Landing');
    });
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: screenOpacity, transform: [{ translateY: screenY }] },
      ]}
    >
      <StatusBar barStyle="light-content" backgroundColor="#1A0A1F" />

      {/* Gradient-like layered background */}
      <View style={styles.bgLayer1} />
      <View style={styles.bgLayer2} />

      {/* Mandala art background */}
      <MandalaBg />

      {/* Center content */}
      <View style={styles.centerGroup}>
        {/* Outer glow ring */}
        <Animated.View
          style={[
            styles.glowRing,
            { transform: [{ scale: ring1Scale }], opacity: ring1Opacity },
          ]}
        />
        {/* Inner ring */}
        <Animated.View
          style={[
            styles.innerRing,
            { transform: [{ scale: ring2Scale }], opacity: ring2Opacity },
          ]}
        />

        {/* Logo box — pink gradient feel */}
        <Animated.View
          style={[
            styles.logoBox,
            { transform: [{ scale: logoScale }], opacity: logoOpacity },
          ]}
        >
          <Ionicons name="bicycle" size={40} color="#1A0A1F" />
        </Animated.View>

        {/* Brand name */}
        <Animated.Text
          style={[
            styles.brandName,
            { opacity: brandOpacity, transform: [{ translateY: brandY }] },
          ]}
        >
          You Special
        </Animated.Text>

        {/* Tagline */}
        <Animated.Text
          style={[
            styles.tagline,
            { opacity: taglineOpacity, transform: [{ translateY: taglineY }] },
          ]}
        >
          Safe rides for women · By women
        </Animated.Text>
      </View>

      {/* Bottom brand mark */}
      <View style={styles.bottomMark}>
        <View style={styles.pinkDot} />
        <Text style={styles.bottomMarkText}>Safe · Verified · Women-only</Text>
        <View style={styles.pinkDot} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A0A1F',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Layered deep purple/plum background
  bgLayer1: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1A0A1F',
  },
  bgLayer2: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: '50%',
    backgroundColor: 'rgba(255,100,180,0.04)',
  },

  // Center group
  centerGroup: { alignItems: 'center' },

  glowRing: {
    position: 'absolute',
    width: 200, height: 200, borderRadius: 100,
    borderWidth: 1.5,
    borderColor: 'rgba(255,182,219,0.35)',
    borderStyle: 'dashed',
  },
  innerRing: {
    position: 'absolute',
    width: 140, height: 140, borderRadius: 70,
    borderWidth: 1,
    borderColor: 'rgba(255,182,219,0.55)',
  },

  logoBox: {
    width: 100, height: 100, borderRadius: 28,
    backgroundColor: colors.pink,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 24,
    shadowColor: colors.pink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 24,
    elevation: 14,
  },

  brandName: {
    fontSize: 36, fontWeight: '900', color: '#FFFFFF',
    letterSpacing: -0.8,
    marginBottom: 10,
  },

  tagline: {
    fontSize: 13,
    color: 'rgba(255,182,219,0.6)',
    letterSpacing: 0.4,
    fontWeight: '500',
  },

  // Bottom
  bottomMark: {
    position: 'absolute', bottom: Platform.OS === 'ios' ? 44 : 28,
    flexDirection: 'row', alignItems: 'center', gap: 8,
  },
  pinkDot: {
    width: 5, height: 5, borderRadius: 2.5,
    backgroundColor: colors.pink,
    opacity: 0.7,
  },
  bottomMarkText: {
    fontSize: 10, color: 'rgba(255,182,219,0.45)',
    fontWeight: '600', letterSpacing: 1.8, textTransform: 'uppercase',
  },
});
