import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import ExerciseLog from "../components/singleWorkout/ExerciseLog";

const WorkoutScreen = ({ route }) => {
  const navigation = useNavigation();
  const { title, exercises } = route.params;

  console.log("WorkoutScreen exercises:", exercises); // Debug statement

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View></View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>⚓️ {title} ⚓️</Text>
      </View>
      {Array.isArray(exercises) && exercises.length > 0 ? (
        exercises.map((exercise, index) => (
          <ExerciseLog key={index} exercise={exercise} />
        ))
      ) : (
        <Text style={styles.noExercisesText}>No exercises available</Text>
      )}
      <TouchableOpacity
        style={styles.finishButtonContainer}
        onPress={() => {
          Alert.alert("🎉 What a BEAST! 🎉", "Nice workout", [
            { text: "thx, I know!" },
          ]);
          navigation.navigate("Home");
        }}
      >
        <View style={styles.finishButton}>
          <Text
            style={{
              color: "white",
              fontFamily: "LexendDeca_500Medium",
            }}
          >
            Finish
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 32,
  },
  title: {
    fontWeight: "bold",
    fontFamily: "LexendDeca_400Regular",
    fontSize: 24,
    color: "#1B1B1B",
  },
  finishButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 40,
  },
  finishButton: {
    backgroundColor: "#1B1B1B",
    width: 100,
    height: 40,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  noExercisesText: {
    textAlign: "center",
    fontFamily: "LexendDeca_400Regular",
    fontSize: 16,
    color: "#1B1B1B",
    marginVertical: 16,
  },
});

export default WorkoutScreen;
