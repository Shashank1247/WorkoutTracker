import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import { useFonts, LexendDeca_300Light, LexendDeca_400Regular, LexendDeca_500Medium, LexendDeca_700Bold } from "@expo-google-fonts/lexend-deca";
import WorkoutCardWithPressMenu from "../components/home/WorkoutCardWithPressMenu";
import { getFormData } from "../apiService";
import Boxes from "../components/home/Boxes";

export function setDataFromDB(data, setWorkouts) {
  const workoutObjectsArray = data.map(item => ({
    key: item._id, // Ensure this matches the key property
    name: item.name,
    exercises: Object.values(item.exercises).map(ex => ({
      name: ex.exercise.name,
      sets: Object.values(ex.exercise.sets).map(set => ({
        reps: set.reps.$numberInt,
        weight: set.weight,
      })),
    })),
    lastPerformed: item.lastPerformed,
  }));
  setWorkouts(workoutObjectsArray);
}

const HomeScreen = () => {
  const [workouts, setWorkouts] = useState([]);
  const [itemChange, setItemChange] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  let [fontsLoaded] = useFonts({
    LexendDeca_300Light,
    LexendDeca_400Regular,
    LexendDeca_500Medium,
    LexendDeca_700Bold,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFormData();
        setDataFromDB(data, setWorkouts);
        setDataLoaded(true);
      } catch (error) {
        console.error("Error setting data from DB:", error);
      }
    };

    fetchData();
  }, [itemChange]);

  if (fontsLoaded && dataLoaded) {
    return (
      <View style={styles.home}>
        <ScrollView>
          <Text style={styles.heroText}>Hi Shashank 👋</Text>
          <Text style={styles.subHeroText}>What are we hitting today?</Text>
          <Boxes setWorkouts={setWorkouts} />
          {workouts.map((workout) => (
            <WorkoutCardWithPressMenu key={workout.key} workout={workout} setItemChange={setItemChange} />
          ))}
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  home: { flex: 1, backgroundColor: "white" },
  heroText: {
    fontSize: 29,
    fontFamily: "LexendDeca_700Bold",
    marginLeft: 24,
    marginTop: 32,
    marginBottom: 16,
    color: "#1B1B1B",
  },
  subHeroText: {
    fontSize: 16,
    fontFamily: "LexendDeca_400Regular",
    color: "#1B1B1B",
    marginLeft: 24,
    marginBottom: 16,
  },
});

export default HomeScreen;
