import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity,
  ScrollView, Dimensions, ActivityIndicator, Platform, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useRide } from '../../context/RideContext';
import { colors, radius, shadow } from '../../theme';
import MapView from '../../components/MapView';
import { PrimaryButton, SecondaryButton } from '../../components/SharedComponents';

const { height: H } = Dimensions.get('window');

const quickLocations = [
  { iconName: 'medical',   label: 'Hospital',  sub: 'Manipal, Koramangala', color: '#FF6B6B' },
  { iconName: 'school',    label: 'College',   sub: 'Christ University',    color: '#6C63FF' },
  { iconName: 'business',  label: 'Office',    sub: 'Whitefield IT Park',   color: '#FF9F43' },
  { iconName: 'subway',    label: 'Metro',     sub: 'Indiranagar Station',  color: '#26C6DA' },
];

const nearbyDrivers = [
  { name: 'Sunita V.', dist: '0.4 km', eta: '2 min', rating: 4.9 },
  { name: 'Anjali G.', dist: '1.2 km', eta: '5 min', rating: 4.6 },
  { name: 'Deepa N.',  dist: '2.1 km', eta: '8 min', rating: 4.7 },
];

export default function Home({ navigation }) {
  const { user } = useAuth();
  const { rideStep, bookRide, currentRide, startTracking } = useRide();
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');

  const handleBook = () => {
    if (!pickup || !drop) return;
    bookRide(pickup, drop);
  };
  const handleTrackLive = () => {
    startTracking();
    navigation.navigate('RiderTracking');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Map */}
      <View style={styles.mapArea}>
        <MapView type="home" />

        {/* Top bar — app badge only */}
        <View style={styles.topBar}>
          <View style={styles.appBadge}>
            <Ionicons name="bicycle" size={16} color={colors.white} style={{ marginRight: 6 }} />
            <Text style={styles.appBadgeText}>You Special</Text>
          </View>
        </View>

        {/* Live pill */}
        <View style={styles.livePill}>
          <View style={styles.liveDot} />
          <Text style={styles.livePillText}>3 drivers nearby</Text>
        </View>
      </View>

      {/* Bottom scroll panel */}
      <ScrollView
        style={styles.panel}
        contentContainerStyle={styles.panelContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Booking card */}
        <View style={styles.bookCard}>
          <Text style={styles.bookCardTitle}>Where to?</Text>

          {/* Location inputs with coloured dots */}
          <View style={styles.routeWrap}>
            <View style={styles.routeIndicator}>
              {/* Green dot = pickup */}
              <View style={styles.dotPickup} />
              <View style={styles.routeVLine} />
              {/* Red dot = drop */}
              <View style={styles.dotDrop} />
            </View>
            <View style={{ flex: 1, gap: 10 }}>
              <View style={styles.inputRow}>
                <TextInput
                  style={[styles.locInput, pickup ? styles.locInputActive : null]}
                  placeholder="Pickup location"
                  placeholderTextColor={colors.gray400}
                  value={pickup}
                  onChangeText={setPickup}
                />
              </View>
              <View style={styles.inputRow}>
                <TextInput
                  style={[styles.locInput, drop ? styles.locInputDropActive : null]}
                  placeholder="Drop location"
                  placeholderTextColor={colors.gray400}
                  value={drop}
                  onChangeText={setDrop}
                />
              </View>
            </View>
          </View>

          {/* Fare estimate */}
          {(pickup && drop && rideStep === 'idle') ? (
            <View style={styles.fareRow}>
              <View>
                <Text style={styles.fareAmt}>₹55 – ₹85</Text>
                <Text style={styles.fareSub}>Estimated · approx 20 min</Text>
              </View>
              <View style={styles.guaranteePill}>
                <Ionicons name="shield-checkmark" size={14} color="#22C55E" />
                <Text style={styles.guaranteeText}>Women driver</Text>
              </View>
            </View>
          ) : null}

          {rideStep === 'idle' ? (
            <PrimaryButton
              label="Book Ride"
              onPress={handleBook}
              disabled={!pickup || !drop}
              style={{ marginTop: 16 }}
            />
          ) : null}

          {rideStep === 'searching' ? (
            <View style={styles.searchingRow}>
              <ActivityIndicator size="small" color={colors.black} />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.searchingTitle}>Finding your driver</Text>
                <Text style={styles.searchingSub}>Matching with verified women nearby</Text>
              </View>
            </View>
          ) : null}

          {((rideStep === 'matched' || rideStep === 'tracking') && currentRide) ? (
            <View style={{ marginTop: 12 }}>
              <View style={styles.driverCard}>
                <View style={styles.driverInitials}>
                  <Text style={styles.driverInitialsText}>SV</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Text style={styles.driverName}>Sunita Verma</Text>
                    <View style={styles.verifiedTag}>
                      <Ionicons name="checkmark-circle" size={12} color="#22C55E" />
                      <Text style={styles.verifiedTagText}>Verified</Text>
                    </View>
                  </View>
                  <Text style={styles.driverVehicle}>Honda Activa · MH-12-AB-3456</Text>
                  <Text style={styles.driverRating}>4.9 ★ · 312 rides</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.driverFare}>₹78</Text>
                  <Text style={styles.driverEta}>3 min</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
                <View style={{ flex: 1 }}>
                  <SecondaryButton label="Call" onPress={() => {}} />
                </View>
                <View style={{ flex: 2 }}>
                  <PrimaryButton label="Track Live" onPress={handleTrackLive} />
                </View>
              </View>
            </View>
          ) : null}
        </View>

        {/* Quick destinations */}
        <Text style={styles.sectionTitle}>Quick Destinations</Text>
        <View style={styles.quickGrid}>
          {quickLocations.map((loc, i) => (
            <TouchableOpacity
              key={i}
              style={styles.quickCard}
              onPress={() => setDrop(loc.label + ', ' + loc.sub)}
              activeOpacity={0.75}
            >
              <View style={[styles.quickIconBox, { backgroundColor: loc.color + '22' }]}>
                <Ionicons name={loc.iconName} size={18} color={loc.color} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.quickLabel}>{loc.label}</Text>
                <Text style={styles.quickSub} numberOfLines={1}>{loc.sub}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Nearby drivers */}
        <Text style={styles.sectionTitle}>Drivers Nearby</Text>
        <View style={{ gap: 10, marginBottom: 20 }}>
          {nearbyDrivers.map((d, i) => (
            <View key={i} style={styles.nearbyCard}>
              <View style={styles.nearbyAvatar}>
                <Text style={styles.nearbyAvatarText}>{d.name[0]}</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.nearbyName}>{d.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 }}>
                  <View style={styles.onlineDot} />
                  <Text style={styles.nearbyVerified}>Online · {d.rating} ★</Text>
                </View>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.nearbyEta}>{d.eta}</Text>
                <Text style={styles.nearbyDist}>{d.dist}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Safety banner */}
        <View style={styles.safetyBanner}>
          <View style={styles.safetyIconBox}>
            <Ionicons name="shield-checkmark" size={22} color="#22C55E" />
          </View>
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text style={styles.safetyTitle}>You are protected</Text>
            <Text style={styles.safetySub}>24/7 safety team · SOS always on · Auto trip-sharing</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },

  mapArea: { height: H * 0.40, position: 'relative' },

  topBar: {
    position: 'absolute', top: Platform.OS === 'ios' ? 50 : 16,
    left: 16, right: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    zIndex: 10,
  },
  appBadge: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.black,
    borderRadius: radius.full,
    paddingHorizontal: 14, paddingVertical: 8,
    ...shadow.sm,
  },
  appBadgeText: { fontSize: 13, fontWeight: '800', color: colors.white },

  // Profile icon button — no initials/shortform
  profileIconBtn: {
    ...shadow.sm,
    borderRadius: 22,
    backgroundColor: colors.black,
    padding: 0,
    overflow: 'hidden',
  },

  livePill: {
    position: 'absolute', bottom: 14, left: 16,
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: colors.white,
    borderRadius: radius.full,
    paddingHorizontal: 14, paddingVertical: 7,
    ...shadow.sm,
    borderWidth: 1, borderColor: colors.gray200,
  },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#22C55E' },
  livePillText: { fontSize: 12, fontWeight: '700', color: colors.black },

  panel: { flex: 1, backgroundColor: colors.white },
  panelContent: { padding: 16, paddingBottom: 60 },

  bookCard: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: 20, marginBottom: 24,
    borderWidth: 1, borderColor: colors.gray200,
    ...shadow.md,
  },
  bookCardTitle: { fontSize: 22, fontWeight: '900', color: colors.black, letterSpacing: -0.5, marginBottom: 18 },

  routeWrap: { flexDirection: 'row', gap: 14 },
  routeIndicator: { width: 16, alignItems: 'center', paddingTop: 20, paddingBottom: 20, justifyContent: 'space-between' },

  // Green pickup dot
  dotPickup: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#22C55E', borderWidth: 2, borderColor: '#16A34A' },
  routeVLine: { flex: 1, width: 2, backgroundColor: colors.gray200, marginVertical: 4, borderStyle: 'dashed' },
  // Red drop dot
  dotDrop: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#EF4444', borderWidth: 2, borderColor: '#DC2626' },

  inputRow: {},
  locInput: {
    backgroundColor: colors.gray100,
    borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.gray200,
    paddingHorizontal: 16, paddingVertical: 14,
    fontSize: 14, fontWeight: '600', color: colors.black,
  },
  locInputActive: { borderColor: '#22C55E', backgroundColor: '#F0FDF4' },
  locInputDropActive: { borderColor: '#EF4444', backgroundColor: '#FFF5F5' },

  fareRow: {
    marginTop: 16, padding: 16,
    backgroundColor: colors.gray50,
    borderRadius: radius.md,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 1, borderColor: colors.gray200,
  },
  fareAmt: { fontSize: 22, fontWeight: '900', color: colors.black, letterSpacing: -0.5 },
  fareSub: { fontSize: 11, color: colors.gray500, marginTop: 2 },
  guaranteePill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#F0FDF4',
    borderRadius: radius.full, paddingHorizontal: 12, paddingVertical: 6,
    borderWidth: 1, borderColor: '#BBF7D0',
    ...shadow.xs,
  },
  guaranteeText: { fontSize: 11, fontWeight: '800', color: '#16A34A' },

  searchingRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 16, marginTop: 8,
  },
  searchingTitle: { fontWeight: '800', fontSize: 15, color: colors.black },
  searchingSub: { fontSize: 12, color: colors.gray400, marginTop: 2 },

  driverCard: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14,
    borderTopWidth: 1, borderColor: colors.gray200,
  },
  driverInitials: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: colors.pink,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: colors.pinkMid,
  },
  driverInitialsText: { color: colors.black, fontWeight: '900', fontSize: 16 },
  driverName: { fontSize: 16, fontWeight: '800', color: colors.black },
  verifiedTag: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: '#F0FDF4',
    borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2,
    borderWidth: 1, borderColor: '#BBF7D0',
  },
  verifiedTagText: { fontSize: 10, fontWeight: '700', color: '#16A34A' },
  driverVehicle: { fontSize: 12, color: colors.gray500, marginTop: 3 },
  driverRating: { fontSize: 12, color: colors.black, fontWeight: '600', marginTop: 1 },
  driverFare: { fontSize: 20, fontWeight: '900', color: colors.black },
  driverEta: { fontSize: 11, color: colors.gray500 },

  sectionTitle: { fontSize: 16, fontWeight: '800', color: colors.black, letterSpacing: -0.2, marginBottom: 14 },

  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 28 },
  quickCard: {
    flexDirection: 'row', alignItems: 'center',
    width: '47%',
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: 14,
    borderWidth: 1, borderColor: colors.gray200,
    ...shadow.xs,
  },
  quickIconBox: {
    width: 36, height: 36, borderRadius: radius.sm,
    alignItems: 'center', justifyContent: 'center',
  },
  quickLabel: { fontSize: 13, fontWeight: '800', color: colors.black },
  quickSub: { fontSize: 10, color: colors.gray400, marginTop: 2 },

  nearbyCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.lg, padding: 16,
    borderWidth: 1, borderColor: colors.gray200,
    ...shadow.xs,
  },
  nearbyAvatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: colors.pink,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: colors.pinkMid,
  },
  nearbyAvatarText: { fontSize: 16, fontWeight: '900', color: colors.black },
  nearbyName: { fontSize: 15, fontWeight: '800', color: colors.black },
  onlineDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: '#22C55E' },
  nearbyVerified: { fontSize: 11, color: colors.gray500, fontWeight: '600' },
  nearbyEta: { fontSize: 15, fontWeight: '900', color: colors.black },
  nearbyDist: { fontSize: 11, color: colors.gray400 },

  safetyBanner: {
    flexDirection: 'row', alignItems: 'center',
    padding: 18, borderRadius: radius.xl,
    backgroundColor: '#F0FDF4',
    borderWidth: 1.5, borderColor: '#BBF7D0',
    marginBottom: 20,
  },
  safetyIconBox: {
    width: 44, height: 44, borderRadius: radius.md,
    backgroundColor: '#DCFCE7',
    alignItems: 'center', justifyContent: 'center',
  },
  safetyTitle: { fontSize: 14, fontWeight: '800', color: '#15803D', marginBottom: 3 },
  safetySub: { fontSize: 12, color: '#16A34A', lineHeight: 18 },
});
