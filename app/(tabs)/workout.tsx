// screens/WorkoutScreen.tsx
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import WorkoutCard from '../../components/WorkoutCard';
import { workouts } from '../../data/workoutData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.75;
const SPACING = (SCREEN_WIDTH - CARD_WIDTH) / 2;
const CARD_GAP = 16; // 카드 사이에 추가할 시각적 간격

export default function WorkoutScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // 스크롤 이벤트 타입을 명확하게 지정하여 타입 안정성을 높입니다.
  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(event.nativeEvent.contentOffset.x / (CARD_WIDTH));
      setActiveIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* AuthContext에서 사용자 이름을 가져와 개인화된 인사를 표시합니다. */}
        <Text style={styles.headerText}>Hi, { 'there'}</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={workouts}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SPACING,
          alignItems: 'center',
        }}
        snapToInterval={CARD_WIDTH}
        decelerationRate="fast"
        onMomentumScrollEnd={onMomentumScrollEnd}
        renderItem={({ item, index }) => (
          // 각 카드 아이템에 수평 패딩을 추가하여 카드 사이에 시각적인 간격을 만듭니다.
          <View style={{ width: CARD_WIDTH, paddingHorizontal: CARD_GAP / 2 }}>
              <WorkoutCard item={item} />
          </View>
        )}
      />

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {workouts.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, activeIndex === index ? styles.dotActive : {}]}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  header: {
    // 헤더에 충분한 상단 패딩을 주어 상태 표시줄과의 간격을 확보합니다.
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#555',
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: 'white',
  },
});
