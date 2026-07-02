import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { colors, radius, typography } from '../../theme';
import { GlassCard, Badge } from '../../components/SharedComponents';
import { mockRides } from '../../data/mockData';

export default function Rides({ navigation }) {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? mockRides : mockRides.filter(r => r.status === filter);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[typography.headingLg, { color: 'white', fontSize: 20 }]}>Rides Monitor</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Ride stats horizontal filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar}>
          {[
            { label: 'Total', val: mockRides.length, color: colors.purple400 },
            { label: 'Completed', val: mockRides.filter(r => r.status === 'completed').length, color: '#34d399' },
            { label: 'Active', val: mockRides.filter(r => r.status === 'active').length, color: '#fbbf24' },
            { label: 'Cancelled', val: mockRides.filter(r => r.status === 'cancelled').length, color: '#f87171' },
          ].map((s, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setFilter(i === 0 ? 'all' : s.label.toLowerCase())}
              style={[
                styles.filterBtn,
                { borderColor: `${s.color}30` }
              ]}
              activeOpacity={0.8}
            >
              <Text style={{ fontWeight: '800', fontSize: 20, color: s.color }}>{s.val}</Text>
              <Text style={{ fontSize: 9, color: colors.gray400, textTransform: 'uppercase' }}>{s.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Rides List */}
        <View style={styles.list}>
          {filtered.map((ride, i) => (
            <GlassCard key={i} style={styles.rideCard}>
              <View style={styles.rideCardHeader}>
                <View>
                  <Text style={{ fontWeight: '700', fontSize: 13, color: 'white' }}>
                    #{ride.id.toUpperCase()}
                  </Text>
                  <Text style={{ fontSize: 11, color: colors.gray400, marginTop: 2 }}>
                    {ride.date} · {ride.time}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Badge
                    variant={ride.status === 'completed' ? 'success' : ride.status === 'active' ? 'purple' : 'danger'}
                    label={ride.status}
                  />
                  <Text style={{ fontWeight: '800', fontSize: 18, marginTop: 4, color: colors.purple300 }}>
                    ₹{ride.fare}
                  </Text>
                </View>
              </View>

              {/* Route */}
              <View style={styles.routeSection}>
                <View style={styles.routeVisuals}>
                  <View style={[styles.dot, { backgroundColor: colors.success }]} />
                  <View style={styles.routeLine} />
                  <View style={[styles.dot, { backgroundColor: colors.pink500 }]} />
                </View>
                <View style={{ flex: 1, gap: 10 }}>
                  <Text style={{ fontSize: 12, fontWeight: '600', color: 'white' }}>{ride.pickup}</Text>
                  <Text style={{ fontSize: 12, fontWeight: '600', color: 'white' }}>{ride.drop}</Text>
                </View>
              </View>

              {/* Passenger Details */}
              <View style={styles.ridePeople}>
                <Text style={styles.peopleText}>
                  👩 Rider: <Text style={{ color: 'white', fontWeight: '700' }}>{ride.rider.name}</Text>
                </Text>
                <Text style={styles.peopleText}>
                  🏍️ Driver: <Text style={{ color: 'white', fontWeight: '700' }}>{ride.driver.name}</Text>
                </Text>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <Text style={styles.peopleText}>📍 {ride.distance}</Text>
                  <Text style={styles.peopleText}>⏱️ {ride.duration}</Text>
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
  filterBar: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterBtn: {
    backgroundColor: 'rgba(255,255,255,.06)',
    borderWidth: 1,
    borderRadius: radius.lg,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    minWidth: 90,
  },
  list: {
    gap: 10,
  },
  rideCard: {
    padding: 16,
    borderRadius: radius.lg,
  },
  rideCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  routeSection: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  routeVisuals: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  routeLine: {
    width: 1,
    height: 18,
    backgroundColor: colors.gray600,
  },
  ridePeople: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,.05)',
    gap: 4,
  },
  peopleText: {
    fontSize: 11,
    color: colors.gray400,
  },
});
