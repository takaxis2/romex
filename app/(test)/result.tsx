import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Circle, Svg } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 8;
const CARD_CONTAINER_PADDING = 16;
const cardWidth = (width - (CARD_CONTAINER_PADDING * 2) - (CARD_MARGIN * 2)) / 2;

// --- 1. 평균 점수 원형 차트 ---
const AverageCard = ({ average }: { average: number }) => {
  const score = average * 10; // 10점 만점 -> 100점 만점
  const radius = 55;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (score / 100) * circumference;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>평균</Text>
      <View style={styles.statCardContent}>
        <Svg width={radius * 2 + strokeWidth} height={radius * 2 + strokeWidth}>
          <Circle
            cx={radius + strokeWidth / 2}
            cy={radius + strokeWidth / 2}
            r={radius}
            stroke="#3A5A60"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <Circle
            cx={radius + strokeWidth / 2}
            cy={radius + strokeWidth / 2}
            r={radius}
            stroke="#63B4FF" // 파란색
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            strokeLinecap="round"
            transform={`rotate(-90 ${radius + strokeWidth / 2} ${radius + strokeWidth / 2})`}
          />
        </Svg>
        <View style={styles.statTextContainer}>
          <Text style={styles.statValue}>{Math.round(score)}</Text>
        </View>
      </View>
    </View>
  );
};

// --- 2. 상체 분석 카드 ---
const AnalysisCard = ({ scores }: { scores: number[] }) => {
  // TEST_DATA와 scores 배열을 매핑하여 점수 표시 (10점 -> 100점)
  const scoreMap = [
    { label: '목', score: (scores[7] || 0) * 10 }, // TEST_DATA 8번
    { label: '어깨', score: (scores[1] || 0) * 10 }, // TEST_DATA 2번
    { label: '허리', score: (scores[0] || 0) * 10 }, // TEST_DATA 1번
    { label: '골반', score: (scores[3] || 0) * 10 }, // TEST_DATA 4번
    { label: '무릎', score: (scores[0] || 0) * 10 }, // (데이터가 부족해 허리로 임시 대체)
    { label: '발목', score: (scores[2] || 0) * 10 }, // TEST_DATA 3번
  ];

  return (
    <View style={[styles.card, { padding: 10 }]}>
      <Text style={styles.cardTitle}>상세 분석</Text>
      <View style={styles.bodyContainer}>
        <Ionicons name="body" size={150} color="rgba(255,255,255,0.7)" />
        {/* 점수 위치는 이미지에 맞춰 임의로 조정 */}
        <Text style={[styles.bodyScore, { top: 10, right: 30 }]}>{scoreMap[1].score}점</Text>
        <Text style={[styles.bodyScore, { top: 40, right: 20 }]}>{scoreMap[0].score}점</Text>
        <Text style={[styles.bodyScore, { top: 70, right: 20 }]}>{scoreMap[2].score}점</Text>
        <Text style={[styles.bodyScore, { top: 10, left: 30 }]}>{scoreMap[3].score}점</Text>
        <Text style={[styles.bodyScore, { top: 40, left: 20 }]}>{scoreMap[4].score}점</Text>
        <Text style={[styles.bodyScore, { top: 70, left: 20 }]}>{scoreMap[5].score}점</Text>
      </View>
    </View>
  );
};

// --- 3. 그래프 카드 (수직 슬라이더) ---
const GraphCard = ({ scores }: { scores: number[] }) => {
  // 그래프에 표시할 6개 항목
  const graphData = [
    { label: '목', icon: 'chevron-up-circle-outline', score: scores[7] || 0 },
    { label: '어깨', icon: 'arrow-left-right-bold-outline', score: scores[1] || 0 },
    { label: '허리', icon: 'pillar', score: scores[0] || 0 },
    { label: '골반', icon: 'seat-outline', score: scores[3] || 0 },
    { label: '무릎', icon: 'debug-step-over', score: scores[0] || 0 }, // (임시)
    { label: '발목', icon: 'shoe-print', score: scores[2] || 0 },
  ];

  return (
    <View style={styles.fullCard}>
      <Text style={styles.cardTitle}>그래프</Text>
      <View style={styles.graphContainer}>
        {graphData.map((item, index) => (
          <View key={index} style={styles.sliderColumn}>
            <View style={styles.sliderWrapper}>
              <Slider
                style={styles.verticalSlider}
                minimumValue={0}
                maximumValue={10}
                value={item.score}
                step={1}
                disabled={true} // 보기 전용
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#3A5A60"
                thumbTintColor="#FFFFFF" // (이미지의 점)
              />
            </View>
            <MaterialCommunityIcons name={item.icon as any} size={24} color="white" style={{ marginVertical: 8 }}/>
            <Text style={styles.sliderLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};


export default function TestResultScreen() {
  // 1. URL 파라미터에서 점수 데이터 받기
  const { scores, average } = useLocalSearchParams();
  
  const avgScore = Number(average as string) || 0;
  // 문자열 "7,8,5" -> 숫자 배열 [7, 8, 5]
  const scoreList = (scores as string)?.split(',').map(Number) || [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
               <TouchableOpacity onPress={() => router.back()}>
                 <Ionicons name="arrow-back" size={24} color="white" />
               </TouchableOpacity>
               <Text style={styles.headerTitle}>ROMEX</Text>
               <Text style={styles.flag}>🇰🇷</Text>
             </View>
      <ScrollView style={styles.container}>
        <Text style={styles.screenTitle}>모빌리티 점수</Text>

        {/* --- 상단 2개 카드 --- */}
        <View style={styles.cardRow}>
          <AverageCard average={avgScore} />
          <AnalysisCard scores={scoreList} />
        </View>

        {/* --- 하단 그래프 카드 --- */}
        <GraphCard scores={scoreList} />

        {/* --- 재평가 버튼 --- */}
        <TouchableOpacity 
          style={styles.bottomButton} 
          // 1단계로 돌아가기 (replace로 현재 화면을 스택에서 제거)
          onPress={() => router.replace('/(test)/instructions')} 
        >
          <Text style={styles.bottomButtonText}>재평가 하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- 스타일 ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#1C2C35' },
  container: { flex: 1, padding: CARD_CONTAINER_PADDING },
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
  screenTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: cardWidth,
    height: 220, // 높이 고정
    backgroundColor: '#2E4B4F',
    borderRadius: 16,
    padding: 16,
  },
  cardTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  // 평균 점수 카드
  statCardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statTextContainer: {
    position: 'absolute',
  },
  statValue: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  },
  // 상체 분석 카드
  bodyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyScore: {
    position: 'absolute',
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 2,
    borderRadius: 4,
  },
  // 그래프 카드
  fullCard: {
    backgroundColor: '#2E4B4F',
    borderRadius: 16,
    padding: 16,
    marginBottom: 30,
  },
  graphContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  sliderColumn: {
    alignItems: 'center',
  },
  sliderWrapper: {
      height: 120, // ⬅️ 슬라이더의 '길이'
      width: 30,  // ⬅️ 슬라이더의 '두께' (이것을 추가!)
      justifyContent: 'center',
      alignItems: 'center',
    },
    verticalSlider: {
      width: 120, // ⬅️ Wrapper의 'height'와 일치
      height: 30, // ⬅️ Wrapper의 'width'와 일치
      transform: [{ rotate: '-90deg' }],
    },
  sliderLabel: {
    color: 'white',
    fontSize: 14,
    marginTop: 4,
  },
  // 재평가 버튼
  bottomButton: {
    backgroundColor: '#4A90E2', // 파란색
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 20,
  },
  bottomButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});