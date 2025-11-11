// data/workoutData.ts
export interface Workout {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  video_url: string;
}

export const exercises = [
  // Core & Abs
  { id: '1', video_url:process.env.EXPO_PUBLIC_RESOURCE_URL+'', title: 'ankle_varus_extension', category: 'ankle', image: 'https://images.unsplash.com/photo-1727712763476-f4e4e183ca4e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&fm=jpg&q=60&w=3000' },
  { id: '2', video_url:process.env.EXPO_PUBLIC_RESOURCE_URL+'', title: 'calf_raise', category: 'ankle', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b' },
  { id: '3', video_url:process.env.EXPO_PUBLIC_RESOURCE_URL+'', title: 'kneeling_shin_stretch', category: 'ankle', image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5' },

  // Legs & Glutes
  { id: '4', video_url:process.env.EXPO_PUBLIC_RESOURCE_URL+'', title: 'sternocleidomastoid_stretch', category: 'neck', image: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba' },
  { id: '5', video_url:process.env.EXPO_PUBLIC_RESOURCE_URL+'', title: 'stretching_all_neck_muscles', category: 'neck', image: 'https://plus.unsplash.com/premium_photo-1664299888383-a1ba33510b91?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170' },
  { id: '6', video_url:process.env.EXPO_PUBLIC_RESOURCE_URL+'', title: 'trapezius_stretch', category: 'neck', image: 'https://plus.unsplash.com/premium_photo-1667516733879-0ec040fde7d0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1460' },

  // Upper Body
  { id: '7', video_url:process.env.EXPO_PUBLIC_RESOURCE_URL+'', title: '90_90_mobility', category: 'pelvis', image: 'https://plus.unsplash.com/premium_photo-1666956838404-02f23fa07123?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHVzaCUyMHVwfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600' },
  { id: '8', video_url:process.env.EXPO_PUBLIC_RESOURCE_URL+'', title: 'catcow', category: 'pelvis', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e' },
  { id: '9', video_url:process.env.EXPO_PUBLIC_RESOURCE_URL+'', title: 'frog_stretching', category: 'pelvis', image: 'https://plus.unsplash.com/premium_photo-1683120903102-ca698a2abc20?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170' },
  { id: '10', video_url:process.env.EXPO_PUBLIC_RESOURCE_URL+'', title: 'lunge_stretch(pelvis)', category: 'pelvis', image: 'https://images.unsplash.com/photo-1600026453249-24a43274d65a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=685' },
  { id: '11', video_url:process.env.EXPO_PUBLIC_RESOURCE_URL+'', title: 'standing_knee_extension', category: 'pelvis', image: 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170' },
  
  { id: '12', video_url:process.env.EXPO_PUBLIC_RESOURCE_URL+'', title: 'active_shoulder', category: 'shoulder', image: 'https://images.unsplash.com/photo-1739283180407-21e27d5c0735?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170' },
  { id: '13', video_url:process.env.EXPO_PUBLIC_RESOURCE_URL+'', title: 'push_up_press', category: 'shoulder', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438' },
  { id: '14', video_url:process.env.EXPO_PUBLIC_RESOURCE_URL+'', title: 'shoulder_joint_mobility', category: 'shoulder', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b' },
  { id: '15', video_url:process.env.EXPO_PUBLIC_RESOURCE_URL+'', title: 'shrug', category: 'shoulder', image: 'https://plus.unsplash.com/premium_photo-1664299909954-0e26df7f6351?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170' },
  { id: '16', video_url:process.env.EXPO_PUBLIC_RESOURCE_URL+'', title: 'slide_stretch', category: 'shoulder', image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3' },

  // HIIT (High-Intensity Interval Training)
  { id: '17', video_url:process.env.EXPO_PUBLIC_RESOURCE_URL+'', title: 'prone_cobra', category: 'thoracic_spine', image: 'https://images.unsplash.com/photo-1623874514711-0f321325f318' },
  { id: '18', video_url:process.env.EXPO_PUBLIC_RESOURCE_URL+'', title: 'wall_thoracic_mobility', category: 'thoracic_spine', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a' },
  { id: '19', video_url:process.env.EXPO_PUBLIC_RESOURCE_URL+'', title: 'wall_thoracic_mobility_2', category: 'thoracic_spine', image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f' },
  { id: '20', video_url:process.env.EXPO_PUBLIC_RESOURCE_URL+'', title: 'y_raise', category: 'thoracic_spine', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48' },

  { id: '21', video_url:process.env.EXPO_PUBLIC_RESOURCE_URL+'', title: 'bird_dog', category: 'waist', image: 'https://images.unsplash.com/photo-1623874514711-0f321325f318' },
  { id: '22', video_url:process.env.EXPO_PUBLIC_RESOURCE_URL+'', title: 'bridge', category: 'waist', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a' },
  { id: '23', video_url:process.env.EXPO_PUBLIC_RESOURCE_URL+'', title: 'dead_bug', category: 'waist', image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f' },
];