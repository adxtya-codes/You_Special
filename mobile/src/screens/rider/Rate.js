import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRide } from '../../context/RideContext';
import { colors, radius, shadow } from '../../theme';
import { PrimaryButton } from '../../components/SharedComponents';

const tags = ['Great driver', 'Very safe', 'On time', 'Friendly', 'Clean vehicle', 'Best route'];

export default function Rate({ navigation }) {
  const [stars, setStars] = useState(0);
  const [selected, setSelected] = useState([]);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { finishRide } = useRide();

  const toggleTag = t => setSelected(s => s.includes(t) ? s.filter(x => x !== t) : [...s, t]);
  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => { finishRide(); navigation.replace('RiderApp'); }, 2000);
  };
  const handleSkip = () => { finishRide(); navigation.replace('RiderApp'); };

  if (submitted) {
    return (
      <View style={styles.successScreen}>
        <View style={styles.successIconBox}>
          <Ionicons name="checkmark" size={48} color={colors.black} />
        </View>
        <Text style={styles.successTitle}>Thank you!</Text>
        <Text style={styles.successDesc}>
          Your feedback makes You Special safer for all women.
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.pink} />

      {/* Pink hero */}
      <View style={styles.hero}>
        <View style={styles.driverCircle}>
          <Text style={styles.driverInitials}>SV</Text>
        </View>
        <Text style={styles.heroTitle}>Rate Your Ride</Text>
        <Text style={styles.heroSub}>with Sunita Verma · Koramangala to MG Road</Text>
        <View style={styles.farePill}>
          <Text style={styles.farePillAmt}>Rs.78</Text>
          <Text style={styles.farePillSub}> · 5.1 km · 22 min</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {/* Stars */}
        <Text style={styles.fieldLabel}>How was your ride?</Text>
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map(s => (
            <TouchableOpacity key={s} onPress={() => setStars(s)} activeOpacity={0.8}>
              <Ionicons
                name={stars >= s ? 'star' : 'star-outline'}
                size={44}
                color={stars >= s ? colors.black : colors.gray300}
              />
            </TouchableOpacity>
          ))}
        </View>
        {stars > 0 && (
          <Text style={styles.ratingLabel}>
            {['', 'Poor', 'Below Average', 'Average', 'Good', 'Excellent'][stars]}
          </Text>
        )}

        {/* Tags */}
        {stars > 0 && (
          <View style={{ marginBottom: 24 }}>
            <Text style={styles.fieldLabel}>What went well?</Text>
            <View style={styles.tagsWrap}>
              {tags.map(t => (
                <TouchableOpacity
                  key={t}
                  style={[styles.tag, selected.includes(t) && styles.tagActive]}
                  onPress={() => toggleTag(t)}
                >
                  {selected.includes(t) && (
                    <Ionicons name="checkmark" size={12} color={colors.black} />
                  )}
                  <Text style={[styles.tagText, selected.includes(t) && styles.tagTextActive]}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Comment */}
        {stars > 0 && (
          <View style={{ marginBottom: 24 }}>
            <Text style={styles.fieldLabel}>Additional comments</Text>
            <TextInput
              style={styles.commentInput}
              multiline
              numberOfLines={3}
              placeholder="Tell us more about your experience"
              placeholderTextColor={colors.gray400}
              value={comment}
              onChangeText={setComment}
            />
          </View>
        )}

        {/* Report */}
        <TouchableOpacity style={styles.reportBtn} activeOpacity={0.8}>
          <Ionicons name="alert-circle-outline" size={16} color={colors.gray500} />
          <Text style={styles.reportText}>Report an Issue</Text>
        </TouchableOpacity>

        <PrimaryButton label="Submit Rating" onPress={handleSubmit} disabled={stars === 0} />
        <TouchableOpacity onPress={handleSkip} style={styles.skipBtn}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },

  successScreen: {
    flex: 1, backgroundColor: colors.white,
    alignItems: 'center', justifyContent: 'center', padding: 32,
  },
  successIconBox: {
    width: 96, height: 96, borderRadius: 48,
    backgroundColor: colors.gray100,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 24, ...shadow.sm,
    borderWidth: 1, borderColor: colors.gray200,
  },
  successTitle: { fontSize: 30, fontWeight: '900', color: colors.black, marginBottom: 12 },
  successDesc: { color: colors.gray500, fontSize: 16, textAlign: 'center', lineHeight: 24 },

  hero: {
    backgroundColor: colors.white,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 24, alignItems: 'center',
    borderBottomWidth: 1, borderColor: colors.gray200,
  },
  driverCircle: {
    width: 76, height: 76, borderRadius: 38,
    backgroundColor: colors.gray100,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 14,
    borderWidth: 1.5, borderColor: colors.gray200,
  },
  driverInitials: { fontSize: 26, fontWeight: '900', color: colors.black },
  heroTitle: { fontSize: 22, fontWeight: '900', color: colors.black, marginBottom: 4 },
  heroSub: { fontSize: 13, color: colors.gray500 },
  farePill: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.gray100,
    borderRadius: radius.full,
    paddingHorizontal: 20, paddingVertical: 8,
    marginTop: 14,
    borderWidth: 1, borderColor: colors.gray200,
  },
  farePillAmt: { fontWeight: '900', fontSize: 18, color: colors.black },
  farePillSub: { fontSize: 12, color: colors.gray500 },

  content: { paddingHorizontal: 24, paddingTop: 28, paddingBottom: 40 },

  fieldLabel: {
    fontSize: 11, fontWeight: '700', color: colors.gray500,
    textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 14,
  },

  starsRow: { flexDirection: 'row', gap: 8, justifyContent: 'center', marginBottom: 12 },
  ratingLabel: { textAlign: 'center', fontWeight: '800', fontSize: 15, color: colors.black, marginBottom: 28 },

  tagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingVertical: 8, paddingHorizontal: 14,
    borderRadius: radius.sm, borderWidth: 1.5,
    borderColor: colors.gray200, backgroundColor: colors.gray100,
  },
  tagActive: { backgroundColor: colors.pink, borderColor: colors.pinkMid },
  tagText: { fontSize: 13, fontWeight: '600', color: colors.gray500 },
  tagTextActive: { color: colors.black },

  commentInput: {
    backgroundColor: colors.gray100,
    borderRadius: radius.md, borderWidth: 1, borderColor: colors.gray200,
    paddingHorizontal: 14, paddingVertical: 12,
    color: colors.black, fontSize: 14,
    height: 90, textAlignVertical: 'top',
  },

  reportBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    borderColor: colors.gray200, borderWidth: 1,
    borderRadius: radius.md, paddingVertical: 13,
    justifyContent: 'center', marginBottom: 20,
    backgroundColor: colors.gray100,
  },
  reportText: { color: colors.gray500, fontSize: 13, fontWeight: '600' },

  skipBtn: { marginTop: 12, paddingVertical: 12, alignItems: 'center' },
  skipText: { color: colors.gray400, fontSize: 14 },
});
