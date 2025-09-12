// data/workoutDetailData.ts
export interface WorkoutDetail {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  isLarge?: boolean; // 첫 번째 아이템처럼 큰 카드를 위한 플래그
}

export const workoutDetails: WorkoutDetail[] = [
  {
    id: 'desk',
    title: 'Desk job 사무직',
    subtitle: '너무 오랫동안 책상에 앉아 생기는 긴장을 풀어주세요',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
    isLarge: true,
  },
  {
    id: 'sleep',
    title: 'Sleep',
    subtitle: '깊고 효율적인 수면을 준비하세요',
    image: 'https://images.unsplash.com/photo-1532187643623-dbf26778b45f',
  },
  {
    id: 'morning',
    title: 'Morning',
    subtitle: '점진적인 스트레칭으로 하루를 올바르게 시작하세요',
    image: 'https://images.unsplash.com/photo-1528722828814-77b9b833cc59',
  },
  {
    id: 'travel',
    title: 'Travel',
    subtitle: '장거리 여행에서 몸이 회복되도록 도와주세요',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbb5b9',
  },
    {
    id: 'rotation',
    title: 'Rotation',
    subtitle: 'Release your body by working on rotational ranges of motion',
    image: 'https://images.unsplash.com/photo-1518611012118-6960229c173e',
  },
  {
    id: 'lower_back',
    title: 'Lower back wellness',
    subtitle: 'Take care of your lower back with specific mobilization',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b',
  },
];