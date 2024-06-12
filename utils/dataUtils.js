import { getFormData } from '../apiService'; // Adjust the import path as necessary

export async function setDataFromDB(setWorkouts) {
  try {
    const data = await getFormData();
    const workoutObjectsArray = createWorkoutObjects(data);
    setWorkouts(workoutObjectsArray);
  } catch (error) {
    console.error("Error setting data from DB:", error);
  }
}

export function createWorkoutObjects(actualData) {
  return actualData.map((workout) => {
    const exercisesArray = Object.values(workout.exercises).map(exerciseObj => {
      const setsArray = Object.values(exerciseObj.exercise.sets).map(set => ({
        reps: set.reps.$numberInt,
        weight: set.weight,
      }));
      return {
        name: exerciseObj.exercise.name,
        sets: setsArray,
      };
    });

    return {
      name: workout.name,
      exercises: exercisesArray,
      lastPerformed: workout.lastPerformed,
      key: workout._id.$oid, // Assuming _id from MongoDB is the unique key
    };
  });
}
