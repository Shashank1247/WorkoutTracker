import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const WorkoutCard = ({ workout }) => {
  const { name: title, lastPerformed, exercises, key } = workout;

  return (
    <View style={styles.card} key={key}>
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.lastPerformed}>Performed: {lastPerformed}</Text>
        </View>
        <View>
          {Array.isArray(exercises) && exercises.length > 0 ? (
            exercises.map((exercise, index) => (
              <View style={styles.workoutNameContainer} key={index}>
                <View>
                  <Text style={styles.workoutName}>{exercise.name}</Text>
                </View>
                <View>
                  <Text style={styles.workoutName}>
                    X {exercise.sets.length}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noExercises}>No exercises available</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  home: { flex: 1, backgroundColor: 'white' },
  card: {
    backgroundColor: 'white',
    marginTop: 16,
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: '#ECECEA',
    borderRadius: 22,
    paddingBottom: 16,
  },
  titleContainer: {
    height: 48,
    backgroundColor: '#1B1B1B',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 16,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { color: 'white', fontFamily: 'LexendDeca_400Regular', fontSize: 22 },
  lastPerformed: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'LexendDeca_400Regular',
  },
  workoutNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  workoutName: {
    fontSize: 16,
    fontFamily: 'LexendDeca_400Regular',
    marginHorizontal: 24,
    marginBottom: 8,
  },
  noExercises: {
    fontSize: 16,
    fontFamily: 'LexendDeca_400Regular',
    marginHorizontal: 24,
    marginBottom: 8,
    color: 'red',
  },
});

export default WorkoutCard;
