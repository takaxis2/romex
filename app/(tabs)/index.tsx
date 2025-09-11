// screens/DashboardScreen.tsx
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 카드 컴포넌트
const InfoCard = ({ title, value, large = false }: { title: string; value: string; large?: boolean }) => (
  <View style={[styles.card, large && styles.largeCard]}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={[styles.cardValue, large && styles.largeCardValue]}>{value}</Text>
  </View>
);

const DashboardScreen = () => {
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
        <TouchableOpacity style={styles.actionCard}>
          <Feather name="target" size={24} color="#4A90E2" />
          <Text style={styles.actionText}>모빌리티 테스트를 받아 모빌리티 집중도를 알아보세요</Text>
        </TouchableOpacity>
         <TouchableOpacity style={styles.actionCard}>
          <Feather name="activity" size={24} color="#4A90E2" />
          <Text style={styles.actionText}>Test your mobility to reveal your mobility score</Text>
        </TouchableOpacity>

        {/* Button */}
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Test your mobility for free</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  memberInfo: {
    fontSize: 14,
    color: '#888',
    marginBottom: 24,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 16,
  },
  card: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12,
  },
  largeCard: {
    flex: 1.5, // Make it larger
  },
  cardTitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  largeCardValue: {
    fontSize: 32,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  actionText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  primaryButton: {
    backgroundColor: '#4A90E2',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;