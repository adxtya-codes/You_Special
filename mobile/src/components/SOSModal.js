import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRide } from '../context/RideContext';
import { colors, radius, shadow } from '../theme';
import { PrimaryButton, SecondaryButton } from './SharedComponents';

export default function SOSModal({ visible, onClose }) {
  const { clearSOS } = useRide();
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setSent(true);
    setTimeout(() => { clearSOS?.(); onClose?.(); setSent(false); }, 2500);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity style={styles.sheet} activeOpacity={1} onPress={e => e.stopPropagation()}>
          <View style={styles.handle} />

          {/* Icon */}
          <View style={[styles.iconBox, sent && styles.iconBoxSent]}>
            <Ionicons
              name={sent ? 'checkmark' : 'alert'}
              size={40}
              color={colors.black}
            />
          </View>

          <Text style={styles.title}>{sent ? 'Alert Sent' : 'Emergency Alert'}</Text>
          <Text style={styles.desc}>
            {sent
              ? 'Your trusted contacts and the You Special safety team have been notified with your live location.'
              : 'This will immediately alert your emergency contacts and the You Special 24/7 safety team with your current location.'}
          </Text>

          {!sent && (
            <>
              {/* Contact card */}
              <View style={styles.contactCard}>
                <Text style={styles.contactLabel}>Emergency Contact</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <View style={styles.contactAvatar}>
                    <Ionicons name="person" size={20} color={colors.black} />
                  </View>
                  <View>
                    <Text style={styles.contactName}>Neha Sharma</Text>
                    <Text style={styles.contactSub}>Sister · +91 99887 76655</Text>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row', gap: 10 }}>
                <View style={{ flex: 1 }}>
                  <SecondaryButton label="Cancel" onPress={onClose} />
                </View>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity onPress={handleSend} style={styles.alertBtn} activeOpacity={0.85}>
                    <Ionicons name="alert" size={16} color={colors.white} />
                    <Text style={styles.alertBtnText}>Send Alert</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, paddingBottom: 40,
    borderTopWidth: 1, borderColor: colors.gray200,
    ...shadow.xl,
  },
  handle: {
    width: 36, height: 4, backgroundColor: colors.gray200,
    borderRadius: 2, alignSelf: 'center', marginBottom: 24,
  },
  iconBox: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: colors.pink,
    alignItems: 'center', justifyContent: 'center',
    alignSelf: 'center', marginBottom: 20,
    borderWidth: 2, borderColor: colors.pinkMid,
  },
  iconBoxSent: { backgroundColor: colors.pink },
  title: {
    fontSize: 22, fontWeight: '900', color: colors.black,
    textAlign: 'center', marginBottom: 10,
  },
  desc: {
    color: colors.gray500, fontSize: 14, lineHeight: 22,
    textAlign: 'center', paddingHorizontal: 8, marginBottom: 24,
  },
  contactCard: {
    backgroundColor: colors.gray100,
    borderRadius: radius.xl, padding: 16, marginBottom: 20,
    borderWidth: 1, borderColor: colors.gray200,
  },
  contactLabel: {
    fontSize: 10, fontWeight: '700', color: colors.gray400,
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10,
  },
  contactAvatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.pink,
    alignItems: 'center', justifyContent: 'center',
  },
  contactName: { fontSize: 14, fontWeight: '700', color: colors.black },
  contactSub: { fontSize: 12, color: colors.gray500, marginTop: 2 },
  alertBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: colors.black,
    borderRadius: radius.md, paddingVertical: 15,
    justifyContent: 'center',
  },
  alertBtnText: { color: colors.white, fontWeight: '800', fontSize: 15 },
});
