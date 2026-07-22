import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';
import { useRide } from '../../context/RideContext';
import { colors, radius, typography } from '../../theme';
import { Avatar, GlassCard, Badge, SecondaryButton } from '../../components/SharedComponents';
import { mockDrivers } from '../../data/mockData';

export default function Dashboard({ navigation }) {
  const { user } = useAuth();
  const { driverOnline, setDriverOnline, pendingRequest } = useRide();
  const [showRequest, setShowRequest] = useState(false);

  const driver = user || mockDrivers[0];

  const handleToggleOnline = () => {
    setDriverOnline(!driverOnline);
    if (!driverOnline) {
      // Simulate incoming ride request after 2 seconds
      setTimeout(() => {
        setShowRequest(true);
      }, 2000);
    }
  };

  const handleAcceptRide = () => {
    setShowRequest(false);
    // For demo: show a simple alert or transition state
    alert("Ride Accepted! Start navigation to pickup.");
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={{ fontSize: 20, fontWeight: '800', color: colors.textPrimary }}>Driver Dashboard</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Profile Info Summary */}
        <View style={styles.profileSummary}>
          <Avatar user={driver} size={64} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: '700', color: colors.textPrimary }}>
              {driver.name || 'Sunita Verma'}
            </Text>
            <Text style={{ fontSize: 13, color: colors.textSecondary }}>
              🛵 {driver.vehicle || 'Honda Activa 6G'}
            </Text>
            <View style={styles.badgesRow}>
              <Badge variant="verified" label="Verified" />
              <Badge
                variant={driverOnline ? 'success' : 'warning'}
                label={driverOnline ? '🟢 Online' : '🔴 Offline'}
              />
            </View>
          </View>
        </View>

        {/* Online Toggle Switch Card */}
        <GlassCard style={styles.toggleCard}>
          <View style={{ flex: 1, paddingRight: 10 }}>
            <Text style={{ fontWeight: '700', fontSize: 16, color: colors.textPrimary, marginBottom: 4 }}>
              {driverOnline ? '🟢 You are Online' : '🔴 You are Offline'}
            </Text>
            <Text style={{ fontSize: 12, color: colors.textSecondary }}>
              {driverOnline ? 'Receiving ride requests from nearby riders' : 'Toggle to start receiving rides'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleToggleOnline}
            activeOpacity={0.8}
            style={[
              styles.switchContainer,
              driverOnline ? styles.switchOnline : styles.switchOffline
            ]}
          >
            <View style={[styles.switchKnob, driverOnline ? styles.knobOnline : styles.knobOffline]} />
          </TouchableOpacity>
        </GlassCard>

        {/* Today's Earnings Info */}
        <Text style={{ fontWeight: '700', fontSize: 16, color: colors.textPrimary, marginBottom: 12 }}>
          Today's Earnings
        </Text>
        <View style={styles.statsGrid}>
          {[
            { icon: '💰', label: 'Earned Today', value: `₹${driver.todayEarnings || 840}`, color: colors.success },
            { icon: '🛵', label: 'Rides Today', value: '6', color: colors.purple400 },
            { icon: '⭐', label: 'Today\'s Rating', value: '4.9', color: '#fbbf24' },
            { icon: '⏱️', label: 'Hours Online', value: '4.5h', color: colors.pink400 },
          ].map((s, i) => (
            <GlassCard key={i} style={styles.statBox}>
              <Text style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</Text>
              <Text style={{ fontWeight: '800', fontSize: 20, color: s.color }}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </GlassCard>
          ))}
        </View>

        {/* Recent Rides */}
        <Text style={{ fontWeight: '700', fontSize: 16, color: colors.textPrimary, marginBottom: 12 }}>
          Recent Rides
        </Text>
        <View style={{ gap: 8, marginBottom: 20 }}>
          {[
            { time: '10:45 AM', from: 'Whitefield IT Park', to: 'HSR Layout', fare: 120, rating: 5 },
            { time: '09:15 AM', from: 'Koramangala', to: 'Indiranagar Metro', fare: 65, rating: 5 },
            { time: '08:00 AM', from: 'Hebbal', to: 'Yelahanka', fare: 145, rating: 4 },
          ].map((r, i) => (
            <GlassCard key={i} style={styles.rideItem}>
              <View style={styles.rideItemFareColumn}>
                <Text style={styles.rideItemFare}>₹{r.fare}</Text>
                <Text style={{ fontSize: 10, color: colors.textMuted }}>{r.time}</Text>
              </View>
              <View style={styles.rideItemDivider} />
              <View style={{ flex: 1 }}>
                <Text numberOfLines={1} style={{ fontSize: 13, fontWeight: '600', color: colors.textPrimary }}>{r.from}</Text>
                <Text numberOfLines={1} style={{ fontSize: 12, color: colors.textSecondary }}>→ {r.to}</Text>
              </View>
              <Text style={{ fontSize: 13, color: '#F59E0B' }}>{'⭐'.repeat(r.rating)}</Text>
            </GlassCard>
          ))}
        </View>

        {/* Safety banner */}
        <LinearGradient
          colors={[colors.primaryLight, '#FFF0FB']}
          style={styles.safetyCard}
        >
          <Text style={{ fontSize: 14, fontWeight: '700', color: colors.primaryDark, marginBottom: 4 }}>
            🛡️ You Special Safety Promise
          </Text>
          <Text style={{ fontSize: 12, color: colors.primary, lineHeight: 18 }}>
            Your identity is verified. Riders see your real name, photo, and vehicle. All calls are anonymous. Our 24/7 team monitors all trips.
          </Text>
        </LinearGradient>
      </ScrollView>

      {/* Incoming Ride Modal sheet */}
      <Modal
        visible={showRequest && !!pendingRequest}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowRequest(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            
            <View style={styles.modalHeader}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '700', fontSize: 18, color: colors.primary }}>
                  New Ride Request! 🛵
                </Text>
                <Text style={{ fontSize: 12, color: colors.textSecondary }}>
                  Accept within 30 seconds
                </Text>
              </View>
              <Text style={{ fontWeight: '800', fontSize: 26, color: colors.accent }}>
                ₹{pendingRequest?.fare}
              </Text>
            </View>

            {/* Simulated Countdown timer bar */}
            <View style={styles.timerBar}>
              <View style={styles.timerFill} />
            </View>

            {/* Rider profile details */}
            <View style={styles.riderCard}>
              <LinearGradient
                colors={['#6B21A8', '#F43F5E']}
                style={styles.riderAvatar}
              >
                <Text style={{ fontSize: 20, color: 'white', fontWeight: '700' }}>
                  {pendingRequest?.rider?.initials || 'PS'}
                </Text>
              </LinearGradient>
              <View>
                <Text style={{ fontWeight: '700', fontSize: 15, color: colors.textPrimary }}>
                  {pendingRequest?.rider?.name || 'Priya Sharma'}
                </Text>
                <Text style={{ fontSize: 12, color: colors.textSecondary }}>
                  ⭐ {pendingRequest?.rider?.rating || '4.8'} · {pendingRequest?.rider?.rides || '42'} rides
                </Text>
              </View>
            </View>

            {/* Route paths details */}
            <View style={styles.routeCard}>
              <Text numberOfLines={1} style={{ fontSize: 13, fontWeight: '600', color: colors.accentDark, marginBottom: 6 }}>
                📍 {pendingRequest?.pickup}
              </Text>
              <Text numberOfLines={1} style={{ fontSize: 13, fontWeight: '600', color: colors.primary }}>
                🏁 {pendingRequest?.drop}
              </Text>
              <Text style={{ fontSize: 11, color: colors.textMuted, marginTop: 6 }}>
                {pendingRequest?.distance} · {pendingRequest?.eta}
              </Text>
            </View>

            {/* Acceptance trigger buttons */}
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <View style={{ flex: 1 }}>
                <SecondaryButton label="Decline" onPress={() => setShowRequest(false)} />
              </View>
              <View style={{ flex: 1.5 }}>
                <TouchableOpacity onPress={handleAcceptRide} activeOpacity={0.85}>
                  <LinearGradient
                    colors={['#059669', '#10b981']}
                    style={styles.acceptBtn}
                  >
                    <Text style={{ color: 'white', fontWeight: '700', fontSize: 15 }}>Accept Ride ✓</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: colors.gray200,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 80,
  },
  profileSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 24,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 6,
  },
  toggleCard: {
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: radius.xl,
  },
  switchContainer: {
    width: 58,
    height: 32,
    borderRadius: 16,
    padding: 3,
    justifyContent: 'center',
  },
  switchOnline: {
    backgroundColor: colors.success,
  },
  switchOffline: {
    backgroundColor: colors.gray300,
  },
  switchKnob: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'white',
    // Shadow details
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  knobOnline: {
    alignSelf: 'flex-end',
  },
  knobOffline: {
    alignSelf: 'flex-start',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: radius.lg,
  },
  statLabel: {
    fontSize: 10,
    color: colors.gray400,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 4,
  },
  rideItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: radius.lg,
  },
  rideItemFareColumn: {
    alignItems: 'center',
    minWidth: 54,
  },
  rideItemFare: {
    fontWeight: '700',
    fontSize: 15,
    color: colors.primary,
  },
  rideItemDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.gray200,
  },
  safetyCard: {
    borderWidth: 1,
    borderColor: colors.primaryMid,
    borderRadius: radius.xl,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginTop: 10,
    backgroundColor: colors.primaryLight,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: colors.bgWhite,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderColor: colors.gray200,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: colors.gray300,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  timerBar: {
    height: 4,
    backgroundColor: colors.gray200,
    borderRadius: 99,
    marginBottom: 16,
    overflow: 'hidden',
  },
  timerFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 99,
    width: '70%',
  },
  riderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
    padding: 14,
    backgroundColor: colors.gray100,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  riderAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeCard: {
    padding: 14,
    backgroundColor: colors.gray100,
    borderRadius: radius.lg,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  acceptBtn: {
    backgroundColor: colors.accent,
    paddingVertical: 14,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
