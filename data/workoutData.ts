// data/workoutData.ts
export interface Workout {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export const workouts: Workout[] = [
  {
    id: '1',
    title: 'Daily',
    subtitle: 'Improve for the long term',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
  },
  {
    id: '2',
    title: 'Activate',
    subtitle: 'Activate to perform better',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
  },
  {
    id: '3',
    title: 'Recover',
    subtitle: 'Recover better',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
  },
  {
    id: '4',
    title: 'Library',
    subtitle: 'More than 300 exercises',
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e',
  },
];