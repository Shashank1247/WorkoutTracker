import React, { useState } from "react";
import { TextInput, View, StyleSheet, Text, ScrollView } from "react-native";
import { Formik } from "formik";
import Workout from "../components/createTemplateForm/Workout";
import EndFormButtons from "../components/createTemplateForm/EndFormButtons";
import { writeFormData, getFormData } from "../apiService"; // Import getFormData
import { formatFormForFirebaseUpload } from "../formFormatter";
import { useNavigation } from "@react-navigation/native";
import { setDataFromDB } from "./HomeScreen"; // Import from HomeScreen

const submitForm = async (values, navigation, setWorkouts) => {
  try {
    const form = formatFormForFirebaseUpload(values);
    await writeFormData(form);

    // Update values in home screen so it re-renders and shows the new objects
    const data = await getFormData(); // Fetch updated data
    setDataFromDB(data, setWorkouts);

    navigation.navigate("Home");
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};

const CreateTemplateScreen = ({ route }) => {
  const { setWorkouts } = route.params;
  const navigation = useNavigation();
  const [workoutsNum, setWorkoutsNum] = useState(Array(1).fill(0));

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{}}
      onSubmit={(values) => submitForm(values, navigation, setWorkouts)}
    >
      {({ handleChange, handleBlur, setFieldValue, handleSubmit, values }) => (
        <ScrollView>
          <View>
            <View style={styles.workoutTitleContainer}>
              <Text style={styles.workoutTitle}>⚙️ Workout Title ⚙️</Text>
            </View>
            <TextInput
              style={[
                styles.textInput,
                {
                  marginHorizontal: 24,
                  marginBottom: 24,
                  fontFamily: "LexendDeca_400Regular",
                },
              ]}
              placeholder="Push Workout V1"
              onChangeText={handleChange("templateName")}
              onBlur={handleBlur("templateName")}
              value={values.templateName}
            />

            {workoutsNum.map((exercise, index) => (
              <Workout
                key={index}
                handleBlur={handleBlur}
                handleChange={handleChange}
                index={index}
                setFieldValue={setFieldValue}
              />
            ))}

            <EndFormButtons
              handleSubmit={handleSubmit}
              workoutsNum={workoutsNum}
              setWorkoutsNum={setWorkoutsNum}
            />
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "rgba(158, 150, 150, .2)",
    borderRadius: 8,
    padding: 5,
    fontSize: 25,
  },
  workoutTitle: {
    fontFamily: "LexendDeca_400Regular",
    fontWeight: "bold",
    fontSize: 24,
  },
  workoutTitleContainer: {
    marginVertical: 24,
    alignItems: "center",
  },
});

export default CreateTemplateScreen;
