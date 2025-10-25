import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Circle, Svg } from 'react-native-svg';
import { TEST_DATA } from '../../data/testData'; // ⬅️ 테스트 제목을 가져오기 위해 import

// --- 점수 행 컴포넌트 ---
const ScoreRow = ({ title, score }: { title: string; score: string }) => (
  <View style={styles.scoreRow}>
    <Text style={styles.scoreTitle}>{title}</Text>
    <Text style={styles.scoreValue}>{score} 점</Text>
  </View>
);

// --- 원형 점수 차트 컴포넌트 ---
const CircularScore = ({ score }: { score: number }) => {
  const radius = 60;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  // 점수는 10점 만점이므로 100점 만점으로 변환 (7점 -> 70%)
  const progress = circumference - (score * 10 / 100) * circumference; 

  return (
    <View style={styles.statCardContent}>
      <Svg width={radius * 2 + strokeWidth} height={radius * 2 + strokeWidth}>
        <Circle
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
          r={radius}
          stroke="#3A5A60" // 차트 배경
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <Circle
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
          r={radius}
          stroke="#34D399" // 차트 전경 (초록색)
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          transform={`rotate(-90 ${radius + strokeWidth / 2} ${radius + strokeWidth / 2})`}
        />
      </Svg>
      <View style={styles.statTextContainer}>
        <Text style={styles.statLabel}>총점</Text>
        {/* 10점 만점 평균 점수 표시 */}
        <Text style={styles.statValue}>{score}</Text>
      </View>
    </View>
  );
};

export default function TestResultScreen() {
  // 1. URL 파라미터에서 점수 데이터 받기
  const { scores, average } = useLocalSearchParams();
  
  const avgScore = parseInt(average as string) || 0;
  const scoreList = (scores as string)?.split(',') || []; // ex: ["7", "8", "5"]

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
         <TouchableOpacity onPress={()=>{router.back()}}>
           <Ionicons name="arrow-back" size={24} color="white" />
         </TouchableOpacity>
         <Text style={styles.headerTitle}>ROMEX</Text>
         <Text style={styles.flag}>🇰🇷</Text>
       </View>
      <View style={styles.container}>
        <Text style={styles.title}>유연성 테스트 완료!</Text>
        <Text style={styles.subtitle}>측정 결과를 확인하세요.</Text>

        {/* 2. 평균 점수 표시 */}
        <View style={styles.scoreContainer}>
          <CircularScore score={avgScore} />
        </View>
        
        {/* 3. 개별 점수 리스트 */}
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderText}>항목별 점수</Text>
        </View>
        <ScrollView style={styles.listContainer}>
          {scoreList.map((score, index) => (
            <ScoreRow 
              key={index}
              title={TEST_DATA[index]?.title || `테스트 ${index + 1}`}
              score={score}
            />
          ))}
        </ScrollView>
        
        <View style={styles.flexSpacer} />
        
        {/* 4. 완료 버튼 (누르면 탭 홈으로 이동) */}
        <TouchableOpacity 
          style={styles.bottomButton} 
          onPress={() => router.replace('/(tabs)')} // 탭 홈으로 이동
        >
          <Text style={styles.bottomButtonText}>완료</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// --- 스타일 ---
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
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  
  // 원형 차트 스타일
  statCardContent: {
    width: 154, // (60 + 7) * 2
    height: 154,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statTextContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
  },
  statValue: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  },
  
  // 리스트 스타일
  listHeader: {
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  listHeaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#2E4B4F',
    borderRadius: 16,
    padding: 8,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(60, 90, 96, 0.8)',
  },
  scoreTitle: {
    color: 'white',
    fontSize: 15,
  },
  scoreValue: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  flexSpacer: {
    flexGrow: 1, // 리스트가 짧아도 버튼을 아래로 밀어냄
    minHeight: 10,
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