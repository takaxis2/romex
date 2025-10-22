import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider'; // 슬라이더 import
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TestInputScreen(){
  const [score, setScore] = useState(71); // 슬라이더의 현재 값

  return (
    <SafeAreaView style={styles.safeArea}>
        {/* --- Custom Header --- */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ROMEX</Text>
        <Text style={styles.flag}>🇰🇷</Text>
      </View>

      <View style={styles.container}>
        {/* 프로그레스 바 */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: '10%' }]} />
        </View>

        <Text style={styles.title}>유연성 테스트 (허리)</Text>
        <Text style={styles.subtitle}>결과를 입력하세요</Text>

        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1552674605-db6ffd40250b' }} // 예시 이미지
          style={styles.image}
        />

        {/* 점수 입력 슬라이더 */}
        <View style={styles.sliderContainer}>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={100}
            value={score}
            onValueChange={setScore}
            minimumTrackTintColor="#34D399"
            maximumTrackTintColor="#2E4B4F"
            thumbTintColor="#FFFFFF"
          />
          <Text style={styles.scoreText}>
            허리 유연성 테스트 : {Math.round(score)} 점
          </Text>
        </View>

        <View style={styles.flexSpacer} />

        {/* 하단 버튼 */}
        <TouchableOpacity style={styles.bottomButton} onPress={() => router.back()}>
          <Text style={styles.bottomButtonText}>확인</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// 1번 화면과 스타일이 거의 동일하므로 공통 스타일로 분리해도 좋습니다.
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#1C2C35' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  flag: {
    fontSize: 24,
  },
  container: { flex: 1, paddingHorizontal: 16 },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#2E4B4F',
    borderRadius: 3,
    marginTop: 10,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#34D399',
    borderRadius: 3,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginTop: 4,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginTop: 20,
  },
  sliderContainer: {
    marginTop: 40,
  },
  scoreText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
  },
  flexSpacer: {
    flex: 1,
  },
  bottomButton: {
    backgroundColor: '#E5E5E7',
    paddingVertical: 18,
    borderRadius: 99,
    alignItems: 'center',
    marginVertical: 20,
  },
  bottomButtonText: {
    color: '#1C2C35',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
