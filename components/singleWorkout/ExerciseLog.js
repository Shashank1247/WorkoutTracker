import { View, Text, StyleSheet, Platform } from "react-native";
import { useState } from "react";
import { Checkbox } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Set = ({ index, reps, weight }) => {
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation();
  return (
    <View style={styles.setRow}>
      <Text style={styles.textFont}>{index + 1}</Text>
      <Text style={styles.textFont}>{reps} reps</Text>
      <Text style={styles.textFont}>{weight} kg</Text>
      <View
        style={Platform.OS === "ios" ? styles.checkbox : styles.checkboxAndroid}
      >
        <Checkbox
          color="#007AFF"
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            if (!checked) {
              navigation.navigate("Timer");
            }
            setChecked(!checked);
          }}
        />
      </View>
    </View>
  );
};

const ExerciseLog = ({ exercise }) => {
  const { name, sets } = exercise;
  console.log("ExerciseLog sets:", sets); // Debug statement

  return (
    <View style={styles.set}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{name}</Text>
      </View>

      <View style={styles.setRow}>
        <Text style={styles.textFont}>Set</Text>
        <Text style={styles.textFont}>Reps</Text>
        <Text style={styles.textFont}>Weight</Text>
        <Text style={styles.textFont}>Done</Text>
      </View>
      <View>
        {Array.isArray(sets) && sets.length > 0 ? (
          sets.map((set, index) => (
            <Set key={index} index={index} reps={set.reps} weight={set.weight} />
          ))
        ) : (
          <Text style={styles.noSetsText}>No sets available</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  set: {
    backgroundColor: "white",
    marginBottom: 16,
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: "#ECECEA",
    borderRadius: 22,
    paddingBottom: 16,
  },
  titleContainer: {
    height: 48,
    backgroundColor: "#1B1B1B",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingLeft: 8,
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontFamily: "LexendDeca_400Regular",
    fontSize: 22,
  },
  checkbox: {
    margin: 10,
    backgroundColor: "rgba(158, 150, 150, .2)",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  checkboxAndroid: {
    margin: 10,
  },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  textFont: {
    fontFamily: "LexendDeca_400Regular",
    color: "#1B1B1B",
  },
  noSetsText: {
    textAlign: "center",
    fontFamily: "LexendDeca_400Regular",
    fontSize: 16,
    color: "#1B1B1B",
    marginVertical: 16,
  },
});

export default ExerciseLog;
