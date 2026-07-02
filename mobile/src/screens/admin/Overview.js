import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { colors, radius, typography } from '../../theme';
import { GlassCard, Badge } from '../../components/SharedComponents';
import { mockDrivers, mockRides, mockSafetyAlerts } from '../../data/mockData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const stats = [
  { label: 'Total Riders',   value: '2,841', icon: '👩', color: colors.purple500, change: '+12%', up: true },
  { label: 'Active Drivers', value: '186',   icon: '🏍️', color: '#34d399',            change: '+8%',  up: true },
  { label: 'Rides Today',    value: '634',   icon: '🛵', color: colors.pink400,     change: '+5%',  up: true },
  { label: 'SOS Alerts',     value: '2',     icon: '🆘', color: '#f87171',             change: '-3',   up: false },
  { label: 'Revenue Today',  value: '₹48.2k',icon: '💰', color: '#fbbf24',            change: '+18%', up: true },
  { label: 'Safety Score',   value: '96/100',icon: '🛡️', color: '#34d399',             change: '+2',   up: true },
];

export default function Overview({ navigation }) {
  const { logout } = useAuth();

  const activeRides = mockRides.filter(r => r.status === 'active').length;
  const onlineDrivers = mockDrivers.filter(d => d.online).length;
  const openAlerts = mockSafetyAlerts.filter(a => a.status !== 'resolved').length;

  const handleLogout = () => {
    logout();
    navigation.replace('Landing');
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View>
          <Text style={[typography.headingLg, { color: 'white' }]}>Admin Dashboard</Text>
          <Text style={{ fontSize: 12, color: colors.gray400 }}>You Special · Control Center</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={{ color: 'white', fontWeight: '700', fontSize: 12 }}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Live status bar */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.liveBar}>
          {[
            { label: 'Active Rides', val: activeRides, color: colors.purple500 },
            { label: 'Drivers Online', val: onlineDrivers, color: '#34d399' },
            { label: 'Open Alerts', val: openAlerts, color: '#f87171' },
          ].map((s, i) => (
            <View key={i} style={[styles.liveBox, { borderColor: `${s.color}30` }]}>
              <View style={[styles.liveDot, { backgroundColor: s.color, shadowColor: s.color }]} />
              <View>
                <Text style={{ fontWeight: '800', fontSize: 20, color: s.color }}>{s.val}</Text>
                <Text style={{ fontSize: 9, color: colors.gray400, textTransform: 'uppercase' }}>{s.label}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((s, i) => (
            <GlassCard key={i} style={styles.statCard}>
              <View style={styles.statCardHeader}>
                <Text style={{ fontSize: 24 }}>{s.icon}</Text>
                <View style={[styles.changeBadge, { backgroundColor: s.up ? 'rgba(16,185,129,.1)' : 'rgba(239,68,68,.1)' }]}>
                  <Text style={{ fontSize: 10, fontWeight: '700', color: s.up ? '#34d399' : '#f87171' }}>
                    {s.up ? '▲' : '▼'} {s.change}
                  </Text>
                </View>
              </View>
              <Text style={{ fontWeight: '800', fontSize: 22, color: s.color }}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </GlassCard>
          ))}
        </View>

        {/* Recent Alerts */}
        <Text style={{ fontWeight: '700', fontSize: 16, color: 'white', marginBottom: 12 }}>
          🚨 Recent Safety Alerts
        </Text>
        <View style={{ gap: 8, marginBottom: 20 }}>
          {mockSafetyAlerts.slice(0, 2).map((a, i) => (
            <GlassCard key={i} style={styles.alertCard}>
              <Text style={{ fontSize: 24 }}>
                {a.type === 'SOS' ? '🆘' : a.type === 'Route Deviation' ? '⚠️' : '⏸️'}
              </Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '700', fontSize: 13, color: 'white' }}>{a.type}</Text>
                <Text style={{ fontSize: 12, color: colors.gray400 }}>
                  {a.rider} · {a.location} · {a.time}
                </Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: a.status === 'resolved' ? 'rgba(16,185,129,.15)' : 'rgba(245,158,11,.15)' }]}>
                <Text style={{ color: a.status === 'resolved' ? '#34d399' : '#fbbf24', fontSize: 10, fontWeight: '700' }}>
                  {a.status}
                </Text>
              </View>
            </GlassCard>
          ))}
        </View>

        {/* Quick Actions */}
        <Text style={{ fontWeight: '700', fontSize: 16, color: 'white', marginBottom: 12 }}>
          Quick Actions
        </Text>
        <View style={styles.quickGrid}>
          {[
            { label: 'Verify Drivers', icon: '✅', action: () => navigation.navigate('Users') },
            { label: 'View Complaints', icon: '📋', action: () => navigation.navigate('Safety') },
            { label: 'Broadcast Alert', icon: '📢', action: () => {} },
            { label: 'AI Insights', icon: '🤖', action: () => navigation.navigate('AI') },
          ].map((a, i) => (
            <TouchableOpacity key={i} style={[glassCard, styles.quickBtn]} onPress={a.action} activeOpacity={0.8}>
              <Text style={{ fontSize: 28, marginBottom: 4 }}>{a.icon}</Text>
              <Text style={{ fontWeight: '600', fontSize: 12, color: 'white', textAlign: 'center' }}>
                {a.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const glassCard = {
  backgroundColor: 'rgba(255,255,255,0.07)',
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.12)',
  borderRadius: radius.xl,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgDark,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  logoutBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.md,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 80,
  },
  liveBar: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  liveBox: {
    backgroundColor: 'rgba(255,255,255,.06)',
    borderWidth: 1,
    borderRadius: radius.lg,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minWidth: 130,
  },
  liveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: radius.lg,
  },
  statCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  changeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  statLabel: {
    fontSize: 9,
    color: colors.gray400,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 4,
  },
  alertCard: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
    padding: 14,
    borderRadius: radius.lg,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  quickBtn: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: radius.lg,
  },
});
