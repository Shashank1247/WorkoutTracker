import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableWithoutFeedback, Alert } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  renderers,
  MenuTrigger,
} from "react-native-popup-menu";
import {
  deleteDocument,
  updateLastPerformedDate,
  addWorkoutToCalendar,
} from "../../apiService";
import WorkoutCard from "../singleWorkout/WorkoutCard";

const { SlideInMenu } = renderers;

const WorkoutCardWithPressMenu = (props) => {
  const { workout, setItemChange } = props;
  const { name: title, lastPerformed, exercises, key } = workout;

  const navigation = useNavigation();

  const handleStartWorkout = async () => {
    try {
      await updateLastPerformedDate(key, new Date().toLocaleDateString());
      await addWorkoutToCalendar(new Date().toLocaleDateString());
      setItemChange((value) => !value);
      navigation.navigate("WorkoutScreen", {
        title,
        lastPerformed,
        exercises,
        key,
      });
    } catch (error) {
      console.error("Error starting workout:", error);
      Alert.alert("Error", "Failed to start workout");
    }
  };

  const handleDeleteWorkout = async () => {
    try {
      await deleteDocument("users", key);
      setItemChange((value) => !value);
    } catch (error) {
      console.error("Error deleting document:", error);
      Alert.alert("Error", "Failed to delete workout");
    }
  };

  return (
    <View key={key}>
      <Menu renderer={SlideInMenu}>
        <MenuTrigger
          customStyles={{
            TriggerTouchableComponent: TouchableWithoutFeedback,
          }}
        >
          <WorkoutCard workout={workout} />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption
            style={{ padding: 36, backgroundColor: "#1B1B1B" }}
            onSelect={handleStartWorkout}
          >
            <Text
              style={{
                fontFamily: "LexendDeca_700Bold",
                fontSize: 19,
                color: "white",
              }}
            >
              Start Workout
            </Text>
          </MenuOption>
          <MenuOption
            onSelect={handleDeleteWorkout}
          >
            <Text
              style={{
                padding: 36,
                fontFamily: "LexendDeca_400Regular",
                fontSize: 16,
                color: "red",
              }}
            >
              Delete
            </Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default WorkoutCardWithPressMenu;
