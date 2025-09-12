// screens/ProfileScreen.tsx
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const equipment = [
  { name: 'Ball', icon: 'disc' },
  { name: 'Foam Roller', icon: 'voicemail' },
  { name: 'Band', icon: 'git-merge' },
  { name: 'Pipe', icon: 'bar-chart' },
  { name: 'Percussion gun', icon: 'radio' },
];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('Equipment');
  const router = useRouter();


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Custom Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity onPress={() => router.push('/setting')}>
            <Feather name="settings" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <TouchableOpacity style={styles.userInfo}>
          <View style={styles.profileIcon}><Text style={styles.profileInitial}>T</Text></View>
          <Text style={styles.userName}>t******@gmail.com</Text>
          <Feather name="chevron-right" size={24} color="#888" />
        </TouchableOpacity>

        {/* Premium Button */}
        <TouchableOpacity style={styles.premiumButton}>
          <Feather name="star" size={20} color="#0D0D0D" />
          <Text style={styles.premiumText}>Become Premium</Text>
        </TouchableOpacity>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {['Sports', 'Equipment', 'Goals'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Equipment Section (활성 탭에 따라 다른 내용 표시 가능) */}
        {activeTab === 'Equipment' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>집에 있는 장비를 선택하여 GOWOD가 운동을 맞춤화할 수 있도록 하세요.</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.equipmentContainer}>
              {equipment.map(item => (
                <View key={item.name} style={styles.equipmentItem}>
                  <View style={styles.equipmentIconWrapper}><Feather name={item.icon as any} size={28} color="white" /></View>
                  <Text style={styles.equipmentName}>{item.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Challenge & Reminders */}
        <View style={styles.section}>
            <InfoCard icon="award" title="GOWOD Challenge" description="Mobilize for the win! The GOWOD challenges allow you to reach goals and get rewarded" buttonText="Setup your challenge"/>
            <InfoCard icon="bell" title="Smart reminders" description="Improve your consistency. Configure reminders to not miss any more mobilization sessions" buttonText="Manage your reminders" isLast/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// InfoCard Props 타입 정의
type InfoCardProps = {
  icon: React.ComponentProps<typeof Feather>['name'];
  title: string;
  description: string;
  buttonText: string;
  isLast?: boolean;
};

// 재사용 가능한 정보 카드
const InfoCard = ({icon, title, description, buttonText, isLast = false}: InfoCardProps) => (
    <View style={[styles.infoCard, isLast && {marginBottom: 0}]}>
        <Feather name={icon} size={24} color="#4A90E2" />
        <View style={styles.infoCardContent}>
            <Text style={styles.infoCardTitle}>{title}</Text>
            <Text style={styles.infoCardDescription}>{description}</Text>
            <TouchableOpacity style={styles.infoCardButton}>
                <Text style={styles.infoCardButtonText}>{buttonText}</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 20,
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
  userName: {
    color: 'white',
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
  premiumButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0B90B', // A premium-looking color
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 24,
  },
  premiumText: {
    color: '#0D0D0D',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 20,
    marginBottom: 24,
    borderBottomWidth: 1,
    borderColor: '#333',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginRight: 24,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: 'white',
  },
  tabText: {
    color: '#888',
    fontSize: 16,
    fontWeight: '600',
  },
  activeTabText: {
    color: 'white',
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 16,
  },
  equipmentContainer: {
    paddingBottom: 16,
  },
  equipmentItem: {
    alignItems: 'center',
    marginRight: 24,
  },
  equipmentIconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  equipmentName: {
    color: 'white',
    fontSize: 14,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  infoCardContent: {
    flex: 1,
    marginLeft: 16,
  },
  infoCardTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoCardDescription: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 4,
    marginBottom: 12,
  },
  infoCardButton: {
    alignSelf: 'flex-start',
  },
  infoCardButtonText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
