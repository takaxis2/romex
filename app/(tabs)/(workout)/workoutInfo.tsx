// screens/WorkoutSetupScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function WorkoutSetupScreen(){
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* --- Custom Header --- */}
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>ROMEX</Text>
            <Text style={styles.flag}>🇰🇷</Text>
        </View>

        {/* --- 상단 카드 --- */}
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1594737625787-a8a18c4a93c7' }}
          style={styles.mainCard}
          imageStyle={{ borderRadius: 20 }}
        >
          <View style={styles.cardOverlay}>
            <Text style={styles.cardSubtitle}>오직 귀하를 위한 맞춤형 루틴</Text>
            <Text style={styles.cardTitle}>ONLY FOR YOU</Text>
          </View>
        </ImageBackground>

        {/* --- 정보 컨테이너 --- */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Protocol adapted to :</Text>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={24} color="white" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Your available time</Text>
              <Text style={styles.infoValue}>8 min</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="barbell-outline" size={24} color="white" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Your equipment</Text>
              <Text style={styles.infoValue}>Percussion gun, Foam Roller</Text>
            </View>
          </View>
        </View>

        {/* --- 하단 버튼 --- */}
        <TouchableOpacity style={styles.letsGoButton} onPress={() => router.push('/workoutSetup')}>
          <Text style={styles.letsGoButtonText}>Let's go !</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#1C2C35' },
  container: { flex: 1, paddingHorizontal: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  flag: { fontSize: 24 },
  mainCard: { height: 200, marginTop: 20, justifyContent: 'center' },
  cardOverlay: { backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 20, flex: 1, padding: 20, justifyContent: 'center' },
  cardSubtitle: { color: 'white', fontSize: 16 },
  cardTitle: { color: 'white', fontSize: 32, fontWeight: 'bold' },
  infoContainer: {
    flex: 1,
    backgroundColor: '#2E4B4F',
    marginTop: -20, // 카드를 살짝 겹치게
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 40,
  },
  infoTitle: { color: 'white', fontSize: 16, marginBottom: 20 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  infoTextContainer: { marginLeft: 16 },
  infoLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 14 },
  infoValue: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  letsGoButton: {
    backgroundColor: '#34D399', // 이미지의 청록색
    paddingVertical: 18,
    borderRadius: 99,
    alignItems: 'center',
    marginVertical: 20,
  },
  letsGoButtonText: { color: '#1C2C35', fontSize: 18, fontWeight: 'bold' },
});
