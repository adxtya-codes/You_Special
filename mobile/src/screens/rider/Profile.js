import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal, TextInput, StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { colors, radius, shadow } from '../../theme';
import { Avatar, Badge, Divider, PrimaryButton, SecondaryButton } from '../../components/SharedComponents';

export default function Profile({ navigation }) {
  const { user, logout } = useAuth();
  const [contacts, setContacts] = useState([
    { name: 'Neha Sharma', phone: '+91 99887 76655', relation: 'Sister' },
  ]);
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '', relation: 'Mother' });

  const handleLogout = () => { logout(); navigation.replace('Landing'); };
  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) return;
    setContacts(cs => [...cs, { ...newContact }]);
    setNewContact({ name: '', phone: '', relation: 'Mother' });
    setShowAddContact(false);
  };
  const removeContact = (idx) => setContacts(cs => cs.filter((_, i) => i !== idx));

  const menuItems = [
    { iconName: 'notifications-outline',  label: 'Notifications',    sub: 'Ride alerts and offers' },
    { iconName: 'lock-closed-outline',    label: 'Privacy & Safety', sub: 'Anonymous calls, data' },
    { iconName: 'card-outline',           label: 'Payment Methods',  sub: 'UPI, cards, wallet' },
    { iconName: 'gift-outline',           label: 'Refer & Earn',     sub: 'Get Rs.50 per referral' },
    { iconName: 'help-circle-outline',    label: '24/7 Help Center', sub: 'Chat, call, report' },
    { iconName: 'document-text-outline',  label: 'Terms & Privacy',  sub: 'Legal documents' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.pink} />

      {/* Pink header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.profileRow}>
          <Avatar user={user} size={64} />
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text style={styles.userName}>{user?.name || 'Priya Sharma'}</Text>
            <Text style={styles.userPhone}>{user?.phone || '+91 98765 43210'}</Text>
            <Badge variant="verified" label="Verified Rider" />
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Ionicons name="pencil" size={16} color={colors.black} />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsStrip}>
          {[
            { val: user?.rides || 42, lbl: 'Rides' },
            { val: '4.8', lbl: 'Rating' },
            { val: '2024', lbl: 'Member Since' },
          ].map((s, i) => (
            <View key={i} style={styles.statCol}>
              <Text style={styles.statVal}>{s.val}</Text>
              <Text style={styles.statLbl}>{s.lbl}</Text>
            </View>
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Emergency contacts */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardTitle}>Emergency Contacts</Text>
              <Text style={styles.cardSub}>Auto-alerted during SOS</Text>
            </View>
            <TouchableOpacity style={styles.addBtn} onPress={() => setShowAddContact(true)}>
              <Ionicons name="add" size={14} color={colors.black} />
              <Text style={styles.addBtnText}>Add</Text>
            </TouchableOpacity>
          </View>

          {contacts.map((c, i) => (
            <View key={i} style={styles.contactItem}>
              <View style={styles.contactIcon}>
                <Ionicons name="person" size={18} color={colors.black} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.contactName}>{c.name}</Text>
                <Text style={styles.contactSub}>{c.relation} · {c.phone}</Text>
              </View>
              <TouchableOpacity onPress={() => removeContact(i)} style={styles.removeBtn}>
                <Ionicons name="close" size={18} color={colors.gray400} />
              </TouchableOpacity>
            </View>
          ))}

          {contacts.length === 0 && (
            <Text style={styles.emptyText}>No contacts added yet.</Text>
          )}
        </View>

        {/* Menu */}
        <View style={styles.card}>
          {menuItems.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.menuRow, i < menuItems.length - 1 && styles.menuBorder]}
              activeOpacity={0.7}
            >
              <View style={styles.menuIconBox}>
                <Ionicons name={item.iconName} size={18} color={colors.black} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Text style={styles.menuSub}>{item.sub}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.gray300} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.85}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>You Special · v2.0</Text>
      </ScrollView>

      {/* Add Contact Modal */}
      <Modal visible={showAddContact} transparent animationType="slide" onRequestClose={() => setShowAddContact(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowAddContact(false)}>
          <TouchableOpacity style={styles.modalSheet} activeOpacity={1} onPress={e => e.stopPropagation()}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Add Emergency Contact</Text>

            {[
              { label: 'Full Name', key: 'name', placeholder: 'e.g. Mom', keyboard: 'default' },
              { label: 'Phone Number', key: 'phone', placeholder: '+91 99000 00000', keyboard: 'phone-pad' },
            ].map(f => (
              <View key={f.key} style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{f.label}</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder={f.placeholder}
                  placeholderTextColor={colors.gray400}
                  keyboardType={f.keyboard}
                  value={newContact[f.key]}
                  onChangeText={val => setNewContact(c => ({ ...c, [f.key]: val }))}
                />
              </View>
            ))}

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Relation</Text>
              <View style={styles.relRow}>
                {['Mother', 'Sister', 'Friend', 'Other'].map(r => (
                  <TouchableOpacity
                    key={r}
                    style={[styles.relBtn, newContact.relation === r && styles.relBtnActive]}
                    onPress={() => setNewContact(c => ({ ...c, relation: r }))}
                  >
                    <Text style={[styles.relBtnText, newContact.relation === r && styles.relBtnTextActive]}>{r}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={{ flexDirection: 'row', gap: 10, marginTop: 8 }}>
              <View style={{ flex: 1 }}>
                <SecondaryButton label="Cancel" onPress={() => setShowAddContact(false)} />
              </View>
              <View style={{ flex: 1 }}>
                <PrimaryButton label="Save" onPress={handleAddContact} />
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.gray100 },

  header: {
    backgroundColor: colors.white,
    paddingTop: Platform.OS === 'ios' ? 56 : 32,
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderColor: colors.gray200,
  },
  headerTitle: { fontSize: 12, fontWeight: '700', color: colors.gray400, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 20 },

  profileRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  userName: { fontSize: 20, fontWeight: '900', color: colors.black, letterSpacing: -0.3 },
  userPhone: { fontSize: 13, color: colors.gray500, marginTop: 2, marginBottom: 8 },
  editBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: colors.gray100,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.gray200,
  },

  statsStrip: {
    flexDirection: 'row',
    backgroundColor: colors.gray50,
    borderRadius: radius.xl,
    paddingVertical: 16,
    borderWidth: 1, borderColor: colors.gray200,
  },
  statCol: { flex: 1, alignItems: 'center' },
  statVal: { fontSize: 22, fontWeight: '900', color: colors.black, letterSpacing: -0.3 },
  statLbl: { fontSize: 10, color: colors.gray500, fontWeight: '600', marginTop: 3, textTransform: 'uppercase', letterSpacing: 0.5 },

  content: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40 },

  card: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    marginBottom: 14,
    borderWidth: 1, borderColor: colors.gray200,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 16,
    borderBottomWidth: 1, borderColor: colors.gray100,
  },
  cardTitle: { fontSize: 14, fontWeight: '800', color: colors.black },
  cardSub: { fontSize: 11, color: colors.gray400, marginTop: 2 },
  addBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: colors.gray100,
    paddingHorizontal: 12, paddingVertical: 7,
    borderRadius: radius.sm,
    borderWidth: 1, borderColor: colors.gray200,
  },
  addBtnText: { color: colors.black, fontSize: 12, fontWeight: '700' },

  contactItem: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 20, paddingVertical: 14,
    borderBottomWidth: 1, borderColor: colors.gray100,
  },
  contactIcon: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.gray100,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.gray200,
  },
  contactName: { fontSize: 14, fontWeight: '700', color: colors.black },
  contactSub: { fontSize: 12, color: colors.gray500, marginTop: 2 },
  removeBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  emptyText: { textAlign: 'center', padding: 20, color: colors.gray400, fontSize: 13 },

  menuRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 15, gap: 14,
  },
  menuBorder: { borderBottomWidth: 1, borderColor: colors.gray100 },
  menuIconBox: {
    width: 36, height: 36, borderRadius: radius.sm,
    backgroundColor: colors.gray100,
    alignItems: 'center', justifyContent: 'center',
  },
  menuLabel: { fontSize: 14, fontWeight: '700', color: colors.black },
  menuSub: { fontSize: 11, color: colors.gray400, marginTop: 2 },

  logoutBtn: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1.5, borderColor: colors.gray300,
    marginBottom: 12,
  },
  logoutText: { color: colors.black, fontWeight: '700', fontSize: 15 },
  versionText: { textAlign: 'center', color: colors.gray300, fontSize: 11, marginBottom: 20 },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalSheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, paddingBottom: 40,
    borderTopWidth: 1, borderColor: colors.gray200,
  },
  modalHandle: { width: 36, height: 4, backgroundColor: colors.gray200, borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: '800', color: colors.black, marginBottom: 20 },

  inputGroup: { marginBottom: 16 },
  inputLabel: { fontSize: 11, fontWeight: '700', color: colors.gray500, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 },
  inputField: {
    backgroundColor: colors.gray100,
    borderRadius: radius.md, borderWidth: 1, borderColor: colors.gray200,
    paddingHorizontal: 14, paddingVertical: 12,
    color: colors.black, fontSize: 15,
  },
  relRow: { flexDirection: 'row', gap: 8 },
  relBtn: {
    flex: 1, paddingVertical: 9, borderRadius: radius.sm,
    borderWidth: 1, borderColor: colors.gray200,
    backgroundColor: colors.gray100, alignItems: 'center',
  },
  relBtnActive: { backgroundColor: colors.pink, borderColor: colors.pinkMid },
  relBtnText: { fontSize: 12, fontWeight: '600', color: colors.gray500 },
  relBtnTextActive: { color: colors.black, fontWeight: '700' },
});
