// screens/ExercisesScreen.tsx
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import WorkoutCard from '../../components/WorkoutCard';
import { exercises } from '../../../data/workoutData';


// Exercise Card Component
const ExerciseCard = ({ item }: { item: typeof exercises[0] }) => (
  <TouchableOpacity style={styles.card} onPress={() => router.push({
              pathname: '/workoutInfo',
              params: { exerciseId: item.id }
            })}>
    <Image source={{ uri: item.image }} style={styles.cardImage} />
    <View style={styles.cardTextContainer}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardCategory}>{item.category}</Text>
    </View>
  </TouchableOpacity>
);

export default function WorkoutScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* --- Custom Header --- */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ROMEX</Text>
        <Text style={styles.flag}>🇰🇷</Text>
      </View>

      <FlatList
        data={exercises}
        renderItem={({ item }) => <ExerciseCard item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={
          <>
            {/* --- Screen Title --- */}
            <Text style={styles.screenTitle}>Exercises list</Text>
            {/* --- Search and Filter --- */}
            <View style={styles.searchContainer}>
              <View style={styles.searchBar}>
                <Ionicons name="search" size={20} color="#8A8A8E" />
                <TextInput
                  placeholder="Search for an exercise"
                  placeholderTextColor="#8A8A8E"
                  style={styles.searchInput}
                />
              </View>
              <TouchableOpacity style={styles.filterButton}>
                <MaterialCommunityIcons name="tune-variant" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </>
        }
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1C2C35',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  flag: {
    fontSize: 24,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  screenTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#2E4B4F',
    borderRadius: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    color: 'white',
    marginLeft: 8,
    height: 48,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: '#2E4B4F',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#2E4B4F',
    borderRadius: 20,
    marginBottom: 16,
    width: '48%', // Ensures two columns with a small gap
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 100,
  },
  cardTextContainer: {
    padding: 12,
  },
  cardTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardCategory: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginTop: 4,
  },
});