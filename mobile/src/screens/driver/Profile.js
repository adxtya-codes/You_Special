import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { colors, radius, typography } from '../../theme';
import { Avatar, GlassCard, Badge, Divider, PrimaryButton } from '../../components/SharedComponents';
import { mockDrivers } from '../../data/mockData';

export default function Profile({ navigation }) {
  const { user, logout } = useAuth();
  const driver = user || mockDrivers[0];

  const handleLogout = () => {
    logout();
    navigation.replace('Landing');
  };

  const menuItems = [
    { icon: '📄', label: 'Documents', sub: 'ID, licence, RC book', badge: driver.verified ? '✓ Verified' : '⏳ Pending' },
    { icon: '🛵', label: 'My Vehicle', sub: driver.vehicle || 'Honda Activa 6G' },
    { icon: '🔔', label: 'Notifications', sub: 'Ride alerts, payouts' },
    { icon: '💳', label: 'Bank Account', sub: 'Linked for payouts' },
    { icon: '🆘', label: '24/7 Support', sub: 'Safety & emergency help' },
    { icon: '📋', label: 'Guidelines', sub: 'Driver rules & policies' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[typography.headingLg, { color: 'white', fontSize: 20 }]}>Driver Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <GlassCard style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={{ position: 'relative' }}>
              <Avatar user={driver} size={64} />
              {driver.verified && (
                <View style={styles.verifiedCheck}>
                  <Text style={{ fontSize: 10, color: 'white', fontWeight: 'bold' }}>✓</Text>
                </View>
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[typography.headingLg, { color: 'white', marginBottom: 4 }]}>
                {driver.name || 'Sunita Verma'}
              </Text>
              <Text style={{ color: colors.gray400, fontSize: 13, marginBottom: 6 }}>
                {driver.phone || '+91 90000 11111'}
              </Text>
              <View style={{ flexDirection: 'row', gap: 6 }}>
                {driver.verified ? (
                  <Badge variant="success" label="✓ ID Verified" />
                ) : (
                  <Badge variant="warning" label="⏳ Under Review" />
                )}
                <Badge variant="purple" label="Female Driver" />
              </View>
            </View>
          </View>

          <Divider />

          <View style={styles.statsRow}>
            {[
              { label: 'Total Rides', val: driver.rides || 312 },
              { label: 'Rating', val: `⭐ ${driver.rating || 4.9}` },
              { label: 'Total Earned', val: `₹${((driver.earnings || 24500) / 1000).toFixed(1)}k` },
            ].map((s, i) => (
              <View key={i} style={styles.statCol}>
                <Text style={{ fontWeight: '800', fontSize: 18, color: 'white' }}>{s.val}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </GlassCard>

        {/* Vehicle Card */}
        <GlassCard style={styles.vehicleCard}>
          <View style={styles.vehicleAvatar}>
            <Text style={{ fontSize: 26 }}>🛵</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: '700', fontSize: 16, color: 'white' }}>
              {driver.vehicle || 'Honda Activa 6G'}
            </Text>
            <Text style={{ fontSize: 13, color: colors.gray400, marginBottom: 4 }}>
              {driver.vehicleNo || 'MH-12-AB-3456'}
            </Text>
            <Badge variant="success" label="RC Verified ✓" />
          </View>
        </GlassCard>

        {/* Menu Items */}
        <GlassCard style={{ paddingVertical: 6, marginBottom: 20 }}>
          {menuItems.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.menuItem,
                i < menuItems.length - 1 ? styles.menuBorder : null
              ]}
              activeOpacity={0.7}
            >
              <Text style={{ fontSize: 22, marginRight: 14 }}>{item.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '600', fontSize: 14, color: 'white' }}>{item.label}</Text>
                <Text style={{ fontSize: 11, color: colors.gray500, marginTop: 2 }}>{item.sub}</Text>
              </View>
              {item.badge && (
                <Text style={{ fontSize: 11, color: '#34d399', fontWeight: '700', marginRight: 8 }}>
                  {item.badge}
                </Text>
              )}
              <Text style={{ color: colors.gray500, fontSize: 18 }}>›</Text>
            </TouchableOpacity>
          ))}
        </GlassCard>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
          <Text style={{ color: 'white', fontWeight: '700', fontSize: 15 }}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgDark,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 80,
  },
  profileCard: {
    padding: 24,
    marginBottom: 20,
    borderRadius: radius.xl,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  verifiedCheck: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.success,
    borderWidth: 1.5,
    borderColor: colors.bgDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 9,
    color: colors.gray500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 4,
  },
  vehicleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    borderRadius: radius.xl,
    marginBottom: 20,
  },
  vehicleAvatar: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    backgroundColor: 'rgba(107,33,168,.2)',
    borderWidth: 1,
    borderColor: 'rgba(107,33,168,.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  menuBorder: {
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,.06)',
  },
  logoutBtn: {
    backgroundColor: colors.danger,
    paddingVertical: 14,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
