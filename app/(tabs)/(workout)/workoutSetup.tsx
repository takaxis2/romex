// screens/WorkoutTimeSelectionScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function WorkoutTimeSelectionScreen(){
  const [selectedTime, setSelectedTime] = useState(8);
  const navigation = useNavigation();

  // 💡 2. params로 "열쇠(ID)"를 받습니다.
  const { exerciseId } = useLocalSearchParams();

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove',(e)=>{
      if (e.data.action.type !== 'GO_BACK') {
        return;
      }
      
      e.preventDefault();

      // expo-router의 router 객체로 원하는 경로로 보냅니다.
      router.replace('/(tabs)/(workout)'); // 예: 'home' 스크린으로 강제 이동
    });

    return unsubscribe;
  },[navigation, router])

  const timeOptions = [
    { time: 3, tag: 'MobiFlash' },
    { time: 8, tag: null },
    { time: 12, tag: null },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* --- Custom Header --- */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => {
            router.dismissAll();
            router.replace('/(tabs)/(workout)');}}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>ROMEX</Text>
          <Text style={styles.flag}>🇰🇷</Text>
        </View>

        {/* --- 상단 카드 --- */}
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b' }}
          style={styles.mainCard}
          imageStyle={{ borderRadius: 20 }}
        >
          <View style={styles.cardOverlay}>
            <Text style={styles.cardCategory}>Recover</Text>
            <Text style={styles.cardTitle}>Bodybuilding</Text>
            <Text style={styles.cardSubtitle}>Protocol adapted to :</Text>
          </View>
        </ImageBackground>

        {/* --- 시간 선택 --- */}
        <Text style={styles.sectionTitle}>Your available time</Text>
        {timeOptions.map(option => (
          <TouchableOpacity
            key={option.time}
            style={[styles.timeButton, selectedTime === option.time && styles.selectedTimeButton]}
            onPress={() => {
              setSelectedTime(option.time);
              router.push({
                pathname:'/(tabs)/(workout)/workoutPlayer',
                params: { exerciseId: exerciseId }
              }); // 선택 후 바로 재생 화면으로
            }}
          >
            <Text style={styles.timeText}>{option.time} min</Text>
            {option.tag && <View style={styles.tag}><Text style={styles.tagText}>{option.tag}</Text></View>}
          </TouchableOpacity>
        ))}
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
  mainCard: { height: 180, marginTop: 20 },
  cardOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 20, padding: 20, justifyContent: 'flex-end' },
  cardCategory: { color: 'rgba(255,255,255,0.8)', fontSize: 16 },
  cardTitle: { color: 'white', fontSize: 32, fontWeight: 'bold', marginVertical: 4 },
  cardSubtitle: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  sectionTitle: { color: 'white', fontSize: 16, marginTop: 30, marginBottom: 16 },
  timeButton: {
    backgroundColor: '#2E4B4F',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedTimeButton: { borderColor: '#34D399' },
  timeText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  tag: { backgroundColor: '#34D399', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  tagText: { color: '#1C2C35', fontWeight: 'bold', fontSize: 12 },
});
