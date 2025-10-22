import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// 재사용 가능한 안내 줄 컴포넌트
const InstructionRow = ({ text, isGood }: { text: string; isGood: boolean }) => (
  <View style={styles.instructionRow}>
    <Ionicons
      name={isGood ? 'checkmark-circle' : 'close-circle'}
      size={20}
      color={isGood ? '#34D399' : '#FF453A'}
    />
    <Text style={styles.instructionText}>{text}</Text>
  </View>
);

export default function TestInstructionsScreen() {
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
        <Text style={styles.subtitle}>영상을 보고 다음 단계에서 똑같이 따라해 주세요.</Text>

        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1552674605-db6ffd40250b' }} // 예시 이미지
          style={styles.image}
        />
        <Text style={styles.imageSubtitle}>테스트 1/10 • 허리 유연성 테스트</Text>

        {/* 안내 사항 박스 */}
        <View style={styles.instructionBox}>
          <InstructionRow text="옆으로 눕습니다." isGood={true} />
          <InstructionRow text="팔을 가슴 쪽으로 두고, 팔꿈치를 굽힙니다." isGood={true} />
          <InstructionRow text="어깨를 바닥에 붙이고 유지합니다." isGood={true} />
          <InstructionRow text="어깨를 바닥에서 들어올리지 마세요." isGood={false} />
        </View>

        <View style={styles.flexSpacer} />

        {/* 하단 버튼 */}
        <TouchableOpacity style={styles.bottomButton} onPress={() => router.push('/(test)/input')}>
          <Text style={styles.bottomButtonText}>계속</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#1C2C35' },
  container: { flex: 1, paddingHorizontal: 16 },
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
  imageSubtitle: {
    color: 'white',
    textAlign: 'center',
    marginTop: 12,
  },
  instructionBox: {
    backgroundColor: '#2E4B4F',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
  },
  instructionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  instructionText: {
    color: 'white',
    fontSize: 15,
    marginLeft: 12,
    flex: 1,
  },
  flexSpacer: {
    flex: 1, // 버튼을 하단에 밀어내기 위한 빈 공간
  },
  bottomButton: {
    backgroundColor: '#E5E5E7', // 밝은 회색
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
