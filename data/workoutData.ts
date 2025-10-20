// data/workoutData.ts
export interface Workout {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export const exercises = [
  // Core & Abs
  { id: '1', title: 'Plank Challenge', category: 'Core • Abs', image: 'https://images.unsplash.com/photo-1727712763476-f4e4e183ca4e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&fm=jpg&q=60&w=3000' },
  { id: '2', title: 'Leg Raises', category: 'Core • Abs', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b' },
  { id: '3', title: 'Russian Twist', category: 'Core • Abs', image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5' },

  // Legs & Glutes
  { id: '4', title: 'Deep Squat', category: 'Legs • Glutes', image: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba' },
  { id: '5', title: 'Lunges', category: 'Legs • Glutes', image: 'https://plus.unsplash.com/premium_photo-1664299888383-a1ba33510b91?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170' },
  { id: '6', title: 'Glute Bridge', category: 'Legs • Glutes', image: 'https://plus.unsplash.com/premium_photo-1667516733879-0ec040fde7d0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1460' },

  // Upper Body
  { id: '7', title: 'Push-up Power', category: 'Upper Body • Chest', image: 'https://plus.unsplash.com/premium_photo-1666956838404-02f23fa07123?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHVzaCUyMHVwfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600' },
  { id: '8', title: 'Dumbbell Rows', category: 'Upper Body • Back', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e' },
  { id: '9', title: 'Shoulder Press', category: 'Upper Body • Shoulders', image: 'https://plus.unsplash.com/premium_photo-1683120903102-ca698a2abc20?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170' },
  { id: '10', title: 'Bicep Curls', category: 'Upper Body • Arms', image: 'https://images.unsplash.com/photo-1600026453249-24a43274d65a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=685' },

  // Cardio
  { id: '11', title: 'Jumping Jacks', category: 'Cardio', image: 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170' },
  { id: '12', title: 'Burpees', category: 'Cardio', image: 'https://images.unsplash.com/photo-1739283180407-21e27d5c0735?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170' },
  { id: '13', title: 'High Knees', category: 'Cardio', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438' },

  // Flexibility & Yoga
  { id: '14', title: 'Morning Yoga Flow', category: 'Flexibility • Yoga', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b' },
  { id: '15', title: 'Downward-Facing Dog', category: 'Flexibility • Yoga', image: 'https://plus.unsplash.com/premium_photo-1664299909954-0e26df7f6351?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170' },
  { id: '16', title: 'Deep Stretch Routine', category: 'Flexibility • Stretching', image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3' },

  // HIIT (High-Intensity Interval Training)
  { id: '17', title: 'Full Body HIIT', category: 'HIIT', image: 'https://images.unsplash.com/photo-1623874514711-0f321325f318' },
  { id: '18', title: '20-Min Tabata', category: 'HIIT', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a' },

  // ETC
  { id: '19', title: 'Kettlebell Swing', category: 'Full Body', image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f' },
  { id: '20', title: 'Battle Ropes', category: 'Full Body', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48' },
];