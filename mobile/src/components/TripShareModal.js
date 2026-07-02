import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, shadow } from '../theme';
import { SecondaryButton } from './SharedComponents';

const shareOptions = [
  { label: 'WhatsApp', iconName: 'logo-whatsapp' },
  { label: 'SMS',      iconName: 'chatbubble' },
  { label: 'Email',    iconName: 'mail' },
];

export default function TripShareModal({ visible, onClose }) {
  const [copied, setCopied] = useState(false);
  const fakeLink = 'youspecial.app/track/live/Gx9Kp2Rn';

  const copy = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity style={styles.sheet} activeOpacity={1} onPress={e => e.stopPropagation()}>
          <View style={styles.handle} />

          <Text style={styles.title}>Share Trip</Text>
          <Text style={styles.desc}>
            Share your live ride link with trusted contacts. They can track your journey in real time.
          </Text>

          {/* Link row */}
          <View style={styles.linkCard}>
            <Ionicons name="link" size={16} color={colors.gray500} />
            <Text numberOfLines={1} style={styles.linkText}>{fakeLink}</Text>
            <TouchableOpacity onPress={copy} style={styles.copyBtn}>
              {copied
                ? <Ionicons name="checkmark" size={14} color={colors.black} />
                : <Text style={styles.copyBtnText}>Copy</Text>
              }
            </TouchableOpacity>
          </View>

          {/* Share options */}
          <View style={styles.shareGrid}>
            {shareOptions.map(s => (
              <TouchableOpacity key={s.label} style={styles.shareItem} activeOpacity={0.8}>
                <View style={styles.shareIconBox}>
                  <Ionicons name={s.iconName} size={20} color={colors.black} />
                </View>
                <Text style={styles.shareLabel}>{s.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <SecondaryButton label="Close" onPress={onClose} />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, paddingBottom: 40,
    borderTopWidth: 1, borderColor: colors.gray200,
    ...shadow.xl,
  },
  handle: { width: 36, height: 4, backgroundColor: colors.gray200, borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
  title: { fontSize: 20, fontWeight: '900', color: colors.black, marginBottom: 8 },
  desc: { color: colors.gray500, fontSize: 13, lineHeight: 20, marginBottom: 20 },

  linkCard: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: colors.gray100,
    borderRadius: radius.md, padding: 14,
    marginBottom: 20,
    borderWidth: 1, borderColor: colors.gray200,
  },
  linkText: { flex: 1, fontSize: 13, color: colors.gray600, fontWeight: '500' },
  copyBtn: {
    backgroundColor: colors.pink,
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: radius.sm,
  },
  copyBtnText: { color: colors.black, fontSize: 12, fontWeight: '700' },

  shareGrid: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  shareItem: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: colors.gray100,
    borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.gray200,
  },
  shareIconBox: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.pink,
    alignItems: 'center', justifyContent: 'center', marginBottom: 8,
  },
  shareLabel: { fontSize: 12, fontWeight: '700', color: colors.black },
});
