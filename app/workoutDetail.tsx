// screens/WorkoutDetailScreen.tsx
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WorkoutDetail, workoutDetails } from '../data/workoutDetailData';

// ListItem 컴포넌트
const ListItem = ({ item }: { item: WorkoutDetail }) => (
  <TouchableOpacity style={[styles.itemContainer, item.isLarge && styles.largeItemContainer]}>
    <ImageBackground source={{ uri: item.image }} style={styles.itemImage} imageStyle={{ borderRadius: 20 }}>
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      >
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
      </LinearGradient>
    </ImageBackground>
  </TouchableOpacity>
);

export default function WorkoutDetailScreen() {
  // 이전 화면에서 전달받은 파라미터 (예: 'Daily')
  const { categoryTitle } = useLocalSearchParams<{ categoryTitle: string }>();

  return (
    <SafeAreaView style={styles.container}>
      {/* FlatList는 헤더가 아니므로 헤더는 네비게이터에서 설정합니다. */}
      <FlatList
        data={workoutDetails}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  itemContainer: {
    marginBottom: 16,
    height: 150, // 일반 카드 높이
  },
  largeItemContainer: {
    height: 250, // 큰 카드 높이
  },
  itemImage: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'flex-end',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
    justifyContent: 'flex-end',
    padding: 20,
  },
  itemTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  itemSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginTop: 4,
  },
});
