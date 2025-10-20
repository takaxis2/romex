import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// ----------------- ⬇️ 1. Import 변경 -----------------
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { router } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  // ----------------- ⬇️ 2. useVideoPlayer 훅 사용 -----------------
  const player = useVideoPlayer(  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    (player) => {
      // player.play(); // 로드되면 자동 재생
      // setDuration(player.duration * 1000)
    }
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);


  useEffect(() => {
    const subscription = player.addListener('playingChange', (event) => {
      setIsPlaying(event.isPlaying);
    });
    return () => subscription.remove();
  }, [player]);
  
  // useEffect(() => {
  //   // 'statusChange'는 isLoaded, duration 등 비디오의 전반적인 상태가 바뀔 때 호출됩니다.
  //   const subscription = player.addListener('statusChange', (event) => {
  //     // 비디오가 로드되어 duration 값을 사용할 수 있을 때 상태를 업데이트합니다.
  //     if (event.isLoaded && event.status.duration) {
  //       setDuration(event.status.duration > 0 ? event.status.duration * 1000 : 1);
  //     }
  //   });
  //   return () => subscription.remove();
  // }, [player]);

  useEffect(() => {
    const subscription = player.addListener('timeUpdate', (event) => {
        setPosition(event.currentTime * 1000); // 초 -> 밀리초
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
        {/* 이건 왜 있는건지 모르겠음 */}
        {/* <View style={styles.placeholderCircle} /> */}

        <Text style={styles.exerciseTitle}>우리에게 꼭 필요한 운동</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.instructionScroll}>
            {/* ... 운동 설명 카드 (이전과 동일) ... */}
            <View style={styles.instructionCard}>
                <Text style={styles.instructionTitle}>Hip Streching</Text>
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
            <Text style={styles.timeText}>{formatTime(position)}</Text>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={player.duration}
                value={position}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="rgba(255,255,255,0.5)"
                thumbTintColor="#FFFFFF"
                onSlidingComplete={value => player.seekBy(value / 1000)} // 밀리초 -> 초
            />
            <Text style={styles.timeText}>{formatTime(player.duration)}</Text>
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
