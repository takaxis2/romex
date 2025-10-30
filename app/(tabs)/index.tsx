// screens/DashboardScreen.tsx
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useRef } from 'react';
import { BackHandler, Dimensions, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Circle, Svg } from 'react-native-svg';
import BodyOutline from '../../components/BodyOutline';


// 통계 카드 컴포넌트


// 카드 컴포넌트
// const InfoCard = ({ title, value, large = false }: { title: string; value: string; large?: boolean }) => (
//   <View style={[styles.card, large && styles.largeCard]}>
//     <Text style={styles.cardTitle}>{title}</Text>
//     <Text style={[styles.cardValue, large && styles.largeCardValue]}>{value}</Text>
//   </View>
// );

// // 액션 카드 컴포넌트
// const ActionCard = ({ iconName, text }: { iconName: React.ComponentProps<typeof Feather>['name']; text: string }) => (
//   <TouchableOpacity style={styles.actionCard}>
//     <Feather name={iconName} size={24} color="#4A90E2" />
//     <Text style={styles.actionText}>{text}</Text>
//   </TouchableOpacity>
// );

// // 주요 버튼 컴포넌트
// const PrimaryButton = ({ text }: { text: string }) => (
//   <TouchableOpacity style={styles.primaryButton}>
//     <Text style={styles.primaryButtonText}>{text}</Text>
//   </TouchableOpacity>
// );

const { width } = Dimensions.get('window');
const CARD_MARGIN = 8;
const CARD_CONTAINER_PADDING = 16;
const cardWidth = (width - (CARD_CONTAINER_PADDING * 2) - (CARD_MARGIN * 2)) / 2;


export default function DashboardScreen() {
  // 뒤로가기 버튼을 두 번 눌러야 종료되게 하는 로직
  const backPressedOnce = useRef(false);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // 2초 안에 다시 누르지 않으면 초기화
        if (backPressedOnce.current) {
          BackHandler.exitApp();
          return false; // 앱 종료
        }

        backPressedOnce.current = true;
        ToastAndroid.show('한 번 더 누르면 종료됩니다.', ToastAndroid.SHORT);

        setTimeout(() => {
          backPressedOnce.current = false;
        }, 2000);

        return true; // 기본 뒤로가기 동작 막기
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [])
  );
  
  return (
   <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* --- 헤더 --- */}
        <Text style={styles.headerTitle}>안녕하세요 최연호님</Text>

        <View style={styles.cardRow}>
          {/* --- 통계 카드 --- */}
          <StatisticsCard />
          {/* --- 신체 점수 카드 --- */}
          <TouchableOpacity onPress={()=> router.replace('/image-uploader')}>
            <BodyScoreCard />
          </TouchableOpacity>
        </View>

        <View style={styles.cardRow}>
            {/* --- 비디오 시간 카드 --- */}
           <InfoCard title="비디오 재생 시간 / Video time">
              <Text style={styles.videoTimeText}>00h00</Text>
           </InfoCard>
           {/* --- 집중 부위 카드 --- */}
           <InfoCard title="집중 부위 / focus part">
              <View style={styles.focusPartContent}>
                {/* <MaterialCommunityIcons name="spine" size={32} color="white" /> */}
                <MaterialCommunityIcons name="white-balance-sunny" size={32} color="white" style={{marginLeft: 8}} />
              </View>
           </InfoCard>
        </View>
        
        {/* --- 성장 그래프 --- */}
        <ChartCard />

        {/* --- 하단 버튼 --- */}
        <TouchableOpacity style={styles.bottomButton} onPress={()=> router.push('/(test)/instructions')}>
            <Text style={styles.bottomButtonText}>Test your mobility for free</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

// --- 재사용 가능한 카드 컴포넌트들 ---

const StatisticsCard = () => {
  const percentage = 71;
  const radius = 55;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (percentage / 100) * circumference;

  return (
    <View style={styles.card}>
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
                stroke="#63B4FF"
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={progress}
                strokeLinecap="round"
                transform={`rotate(-90 ${radius + strokeWidth / 2} ${radius + strokeWidth / 2})`}
            />
        </Svg>
        <View style={styles.statTextContainer}>
            <Text style={styles.statLabel}>통계</Text>
            <Text style={styles.statValue}>{percentage}</Text>
        </View>
      </View>
    </View>
  );
};

const BodyScoreCard = () => {
    return (
        <View style={[styles.card, { padding: 16 }]}>
            <View style={styles.bodyScoreContainer}>
                {/* <MaterialCommunityIcons name="human" size={60} color="rgba(255,255,255,0.8)" /> */}
                {/* <Image source={require('../../assets/images/body_outline.png')} /> */}
                <BodyOutline />
                <View style={styles.scoresContainer}>
                    {_renderScoreRow('목', '88점')}
                    {_renderScoreRow('어깨', '88점')}
                    {_renderScoreRow('허리', '90점')}
                    {_renderScoreRow('무릎', '75점')}
                    {_renderScoreRow('골반', '65점')}
                </View>
            </View>
        </View>
    );
};

const _renderScoreRow = (part: string, score: string) => (
    <View style={styles.scoreRow}>
        <Text style={styles.scorePart}>{part}</Text>
        <Text style={styles.scoreValue}>{score}</Text>
    </View>
);

const InfoCard = ({ title, children }: { title: string, children: React.ReactNode }) => {
    return (
        <View style={[styles.card, { height: 120, justifyContent: 'space-between' }]}>
            <Text style={styles.infoCardTitle}>{title}</Text>
            {children}
        </View>
    );
};

const ChartCard = () => {
    const chartData = {
        labels: ["10.01", "10.08", "10.12", "10.25", "11.08", "11.12"],
        datasets: [{
            data: [20, 60, 25, 15, 70, 100],
            color: (opacity = 1) => `rgba(36, 216, 118, ${opacity})`,
            strokeWidth: 4,
        }],
    };
    return (
        <View style={styles.chartContainer}>
            <LineChart
                data={chartData}
                width={width - (CARD_CONTAINER_PADDING * 2)}
                height={200}
                withDots={false}
                withInnerLines={false}
                withOuterLines={false}
                withShadow={false}
                bezier
                chartConfig={{
                    backgroundColor: '#2E4B4F',
                    backgroundGradientFrom: '#2E4B4F',
                    backgroundGradientTo: '#2E4B4F',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity * 0.7})`,
                    propsForBackgroundLines: { stroke: 'transparent' },
                }}
                style={{ borderRadius: 16 }}
            />
        </View>
    );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1C2C35',
  },
  container: {
    flex: 1,
    padding: CARD_CONTAINER_PADDING,
  },
  headerTitle: {
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
    backgroundColor: '#2E4B4F',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statCardContent: {
    width: '100%',
    aspectRatio: 1,
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
  bodyScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-around',
  },
  scoresContainer: {
    flex: 1,
    marginLeft: 12,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 4,
  },
  scorePart: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  scoreValue: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoCardTitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    alignSelf: 'flex-start',
  },
  videoTimeText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  focusPartContent: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  chartContainer: {
    backgroundColor: '#2E4B4F',
    borderRadius: 16,
    paddingTop: 16,
    marginBottom: 30,
  },
  bottomButton: {
    backgroundColor: '#2E4B4F',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  bottomButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
