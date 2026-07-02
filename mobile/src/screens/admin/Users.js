import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { colors, radius, typography } from '../../theme';
import { GlassCard, Badge, Avatar, ToggleGroup } from '../../components/SharedComponents';
import { mockRiders, mockDrivers } from '../../data/mockData';

export default function Users({ navigation }) {
  const [tab, setTab] = useState('riders');
  const [search, setSearch] = useState('');
  const [driverList, setDriverList] = useState(mockDrivers);

  const riders = mockRiders.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));
  const drivers = driverList.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));
  const list = tab === 'riders' ? riders : drivers;

  const handleVerify = (id) => {
    setDriverList(prev => prev.map(d => {
      if (d.id === id) {
        return { ...d, verified: true, status: 'active' };
      }
      return d;
    }));
  };

  const handleSuspend = (id) => {
    // Basic local state update simulation for safety demo
    alert(`Suspending user: ${id}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[typography.headingLg, { color: 'white', fontSize: 20 }]}>Users Control</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Statistics Cards */}
        <View style={styles.statsGrid}>
          {[
            { label: 'Total Riders', val: mockRiders.length, icon: '👩', color: colors.purple400 },
            { label: 'Total Drivers', val: driverList.length, icon: '🏍️', color: '#34d399' },
          ].map((s, i) => (
            <GlassCard key={i} style={styles.statBox}>
              <Text style={{ fontSize: 28 }}>{s.icon}</Text>
              <View>
                <Text style={{ fontWeight: '800', fontSize: 24, color: s.color }}>{s.val}</Text>
                <Text style={{ fontSize: 10, color: colors.gray400, textTransform: 'uppercase' }}>{s.label}</Text>
              </View>
            </GlassCard>
          ))}
        </View>

        {/* Riders / Drivers Toggles */}
        <View style={{ marginBottom: 14 }}>
          <ToggleGroup
            options={[
              { label: `Riders (${mockRiders.length})`, value: 'riders' },
              { label: `Drivers (${driverList.length})`, value: 'drivers' }
            ]}
            value={tab}
            onChange={setTab}
          />
        </View>

        {/* Search */}
        <TextInput
          style={styles.searchBar}
          placeholder="🔍 Search by name…"
          placeholderTextColor={colors.gray500}
          value={search}
          onChangeText={setSearch}
        />

        {/* List */}
        <View style={styles.list}>
          {list.map((u, i) => (
            <GlassCard key={i} style={styles.userCard}>
              <View style={styles.userHeader}>
                <Avatar user={u} size={40} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '700', fontSize: 14, color: 'white' }}>{u.name}</Text>
                  <Text style={{ fontSize: 11, color: colors.gray400 }}>
                    {u.phone} · Joined {u.joined}
                  </Text>
                </View>
                <Badge
                  variant={u.status === 'active' ? 'success' : u.status === 'pending' ? 'warning' : 'danger'}
                  label={u.status}
                />
              </View>

              <View style={styles.userFooter}>
                <View style={styles.statsRow}>
                  <Text style={styles.statText}>⭐ {u.rating}</Text>
                  <Text style={styles.statText}>🛵 {u.rides} rides</Text>
                  {tab === 'drivers' && (
                    <Badge
                      variant={u.verified ? 'success' : 'warning'}
                      label={u.verified ? 'ID Verified' : 'Not Verified'}
                    />
                  )}
                </View>
                
                <View style={styles.actionsRow}>
                  {tab === 'drivers' && !u.verified ? (
                    <TouchableOpacity
                      style={styles.verifyBtn}
                      onPress={() => handleVerify(u.id)}
                    >
                      <Text style={styles.verifyBtnText}>Verify</Text>
                    </TouchableOpacity>
                  ) : null}

                  {u.status === 'active' ? (
                    <TouchableOpacity
                      style={styles.suspendBtn}
                      onPress={() => handleSuspend(u.id)}
                    >
                      <Text style={styles.suspendBtnText}>Suspend</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </GlassCard>
          ))}
        </View>
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
    padding: 20,
    paddingBottom: 80,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: radius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchBar: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: 'white',
    fontSize: 14,
    marginBottom: 14,
  },
  list: {
    gap: 8,
  },
  userCard: {
    padding: 14,
    borderRadius: radius.lg,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  userFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statText: {
    fontSize: 12,
    color: colors.gray400,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  verifyBtn: {
    backgroundColor: colors.success,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radius.md,
  },
  verifyBtnText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '700',
  },
  suspendBtn: {
    backgroundColor: 'rgba(239,68,68,.15)',
    borderColor: 'rgba(239,68,68,.3)',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: radius.md,
  },
  suspendBtnText: {
    color: '#f87171',
    fontSize: 11,
    fontWeight: '700',
  },
});
