// components/WorkoutCard.tsx
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Workout } from '../data/workoutData';

interface Props {
  item: Workout;
}

const WorkoutCard = ({ item }: Props) => {
  return (
    <ImageBackground
      source={{ uri: item.image }}
      style={styles.card}
      imageStyle={styles.image}
    >
       <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}>
            
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    height: '95%',
    borderRadius: 24,
    overflow: 'hidden',
  },
  image: {
    borderRadius: 24,
  },
  gradient: {
    // 그라데이션이 전체 높이를 차지하고, 내부 컨텐츠(텍스트)를 아래쪽으로 정렬합니다.
    height: '100%',
    justifyContent: 'flex-end',
  },
  textContainer: {
    // 이 컨테이너는 텍스트가 가장자리에서 일관된 간격을 갖도록 보장합니다.
    // 하단 여백을 늘려 텍스트를 카드 하단에서 위로 더 올립니다.
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    marginTop: 4,
  },
});

export default WorkoutCard;