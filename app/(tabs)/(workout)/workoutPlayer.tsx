import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// ----------------- ⬇️ 1. Import 변경 -----------------
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { router, useLocalSearchParams } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { SafeAreaView } from 'react-native-safe-area-context';
import { exercises } from '../../../data/workoutData';

// 밀리초를 mm:ss 형식으로 변환하는 함수 (동일)
const formatTime = (millis: number) => {
  if (isNaN(millis) || millis < 0) {
    return '00:00';
  }
  const totalSeconds = Math.floor(millis / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export default function WorkoutPlayerScreen () {

  const { exerciseId } = useLocalSearchParams();
  const exercise = useMemo(() => {
      // (실제 앱에서는 API 호출이 될 수 있습니다)
      return exercises.find(e => e.id === exerciseId);
    }, [exerciseId]);

  // ----------------- ⬇️ 2. useVideoPlayer 훅 사용 -----------------
  // const player = useVideoPlayer('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  //   (player) => {
  //     player.timeUpdateEventInterval = 1;
  //     // player.play(); // 로드되면 자동 재생
  //   }
  // );
  const player = useVideoPlayer(exercise!.video_url,
    (player) => {
      player.timeUpdateEventInterval = 1;
      // player.play(); // 로드되면 자동 재생
    }
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const subscription = player.addListener('timeUpdate', (event) => {
      // 비디오의 현재 시간을 상태에 업데이트하여 UI 리렌더링을 유도합니다.
      setCurrentTime(event.currentTime);
    });
    return () => subscription.remove();
  }, [player]);


  useEffect(() => {
    const subscription = player.addListener('playingChange', (event) => {
      setIsPlaying(event.isPlaying);
    });
    return () => subscription.remove();
  }, [player]);
  
  return (
    <SafeAreaView style={styles.safeArea}>
        {/* --- Custom Header --- */}
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>ROMEX</Text>
            <Text style={styles.flag}>🇰🇷</Text>
        </View>
        <Text style={styles.videoTitle}>ROMEX 영상</Text>
        
        {/* ----------------- ⬇️ 3. Video -> VideoView 로 변경 ----------------- */}
        <VideoView
            player={player}
            style={styles.video}
            nativeControls={false}
            contentFit="contain"
        />

        <Text style={styles.exerciseTitle}>우리에게 꼭 필요한 운동</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.instructionScroll}>
            {/* ... 운동 설명 카드 (이전과 동일) ... */}
            <View style={styles.instructionCard}>
                <Text style={styles.instructionTitle}>Hip Streching {exercise?.title}</Text>
                <Text style={styles.instructionText}>1. 바닥에 앉은 자세에서 다리를 뻗습니다.</Text>
                <Text style={styles.instructionText}>2. 무릎을 90도 구부린 채 유지합니다.</Text>
                <Text style={styles.instructionNote}>*주의 사항*</Text>
                <Text style={styles.instructionNoteText}>척추가 곧게 펴지도록 가슴을 내밀고 시선을 대각선 위를 향합니다.</Text>
            </View>
            <View style={styles.instructionCard} />
        </ScrollView>
        
        {/* --- Custom Controls --- */}
        <View style={styles.controlsContainer}>
            <TouchableOpacity onPress={() => {isPlaying ? player.pause() : player.play()}}>
                <Ionicons name={isPlaying ? 'pause' : 'play'} size={32} color="white" />
            </TouchableOpacity>
            <Text style={styles.timeText}>{formatTime(currentTime * 1000)}</Text>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={player.duration}
                value={player.currentTime}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="rgba(255,255,255,0.5)"
                thumbTintColor="#FFFFFF"
                onSlidingComplete={value => {
                  player.currentTime = value}}
            />
            <Text style={styles.timeText}>{formatTime(player.duration * 1000)}</Text>
            <TouchableOpacity><Ionicons name="bookmark-outline" size={24} color="white" /></TouchableOpacity>
            <TouchableOpacity><Ionicons name="expand" size={24} color="white" /></TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

// --- 스타일 (이전과 동일) ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#1C2C35' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 16 },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  flag: { fontSize: 24 },
  videoTitle: { color: 'white', fontSize: 16, fontWeight: 'bold', paddingHorizontal: 16, marginBottom: 10 },
  video: { width: '100%', height: 220, backgroundColor: 'black' },
  placeholderCircle: {
      position: 'absolute', top: 160, right: 40, width: 40, height: 40,
      borderRadius: 20, borderWidth: 2, borderColor: 'white',
      backgroundColor: 'rgba(255,255,255,0.3)',
  },
  exerciseTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', margin: 16 },
  instructionScroll: { paddingLeft: 16, flexGrow: 0 },
  instructionCard: {
      backgroundColor: '#2E4B4F',
      borderRadius: 16,
      padding: 16,
      width: 280,
      marginRight: 12,
  },
  instructionTitle: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  instructionText: { color: 'rgba(255,255,255,0.9)', marginTop: 8 },
  instructionNote: { color: 'rgba(255,255,255,0.7)', marginTop: 16, fontSize: 12 },
  instructionNoteText: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
  controlsContainer: {
      position: 'absolute', bottom: 0, left: 0, right: 0,
      backgroundColor: '#2E4B4F',
      paddingVertical: 16, paddingHorizontal: 16,
      borderTopLeftRadius: 20, borderTopRightRadius: 20,
      flexDirection: 'row', alignItems: 'center',
      justifyContent: 'space-between',
  },
  timeText: { color: 'white', fontSize: 12, width: 40, textAlign: 'center' },
  slider: { flex: 1, height: 40 },
});