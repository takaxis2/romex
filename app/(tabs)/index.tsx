// screens/DashboardScreen.tsx
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useRef } from 'react';
import { BackHandler, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// 카드 컴포넌트
const InfoCard = ({ title, value, large = false }: { title: string; value: string; large?: boolean }) => (
  <View style={[styles.card, large && styles.largeCard]}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={[styles.cardValue, large && styles.largeCardValue]}>{value}</Text>
  </View>
);

// 액션 카드 컴포넌트
const ActionCard = ({ iconName, text }: { iconName: React.ComponentProps<typeof Feather>['name']; text: string }) => (
  <TouchableOpacity style={styles.actionCard}>
    <Feather name={iconName} size={24} color="#4A90E2" />
    <Text style={styles.actionText}>{text}</Text>
  </TouchableOpacity>
);

// 주요 버튼 컴포넌트
const PrimaryButton = ({ text }: { text: string }) => (
  <TouchableOpacity style={styles.primaryButton}>
    <Text style={styles.primaryButtonText}>{text}</Text>
  </TouchableOpacity>
);


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
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <View style={styles.profileIcon}>
            <Text style={styles.profileInitial}>T</Text>
          </View>
        </View>
        <Text style={styles.memberInfo}>GOWOD member since April 2025</Text>
        
        {/* Cards */}
        <View style={styles.cardContainer}>
          <InfoCard title="움직임 시간 / Mobility time" value="00h00" large />
          <InfoCard title="모빌리티 점수 / Mobility score" value="--" />
        </View>

        {/* Action Cards */}
        <ActionCard iconName="target" text="모빌리티 테스트를 받아 모빌리티 집중도를 알아보세요" />
        <ActionCard iconName="activity" text="Test your mobility to reveal your mobility score" />

        {/* Button */}
        <PrimaryButton text="Test your mobility for free" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  scrollContainer: {
    paddingBottom: 100, // 하단 네비게이션 바에 가려지지 않도록
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  memberInfo: {
    color: '#aaa',
    fontSize: 14,
    paddingHorizontal: 20,
    marginTop: 4,
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    width: '48.5%', // 간격을 고려한 너비
    minHeight: 120,
  },
  fullWidthCard: {
    width: '100%',
  },
  cardTitle: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 8,
  },
  cardValue: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  scoreCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  actionCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  actionSubText: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 4,
  },
  primaryButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    paddingTop: 15,
    paddingBottom: 30, // SafeArea 고려
    borderTopWidth: 1,
    borderColor: '#333',
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: 20,
  },
  largeCardValue: {
    fontSize: 32,
  },
  largeCard: {
    flex: 1.5, // Make it larger
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollContentContainer: {
//     padding: 20,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   headerTitle: {
//     fontSize: 32,
//     fontWeight: 'bold',
//   },
//   profileIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#E0E0E0',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   profileInitial: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   memberInfo: {
//     fontSize: 14,
//     color: '#888',
//     marginBottom: 24,
//   },
//   cardContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 24,
//     gap: 16,
//   },
//   card: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//     padding: 16,
//     borderRadius: 12,
//   },
//   largeCard: {
//     flex: 1.5, // Make it larger
//   },
//   cardTitle: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 8,
//   },
//   cardValue: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   largeCardValue: {
//     fontSize: 32,
//   },
//   actionCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F0F8FF',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//   },
//   actionText: {
//     marginLeft: 12,
//     fontSize: 14,
//     color: '#333',
//     flex: 1,
//   },
//   primaryButton: {
//     backgroundColor: '#4A90E2',
//     padding: 18,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   primaryButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });
