# FitTrack (Workout Tracking Application)

## Design and Purpose

The Workout Tracking Application is designed to help users track their fitness progress by logging their workouts. The app is intended for fitness enthusiasts who want to monitor their exercise routines and track their improvements over time. The target audience includes individuals of all fitness levels who are interested in maintaining a healthy lifestyle.



## Screenshots


<p float="left">
 <img width="429" alt="Screenshot 2024-06-12 at 6 48 05 PM" src="https://github.com/Shashank1247/WorkoutTracker/assets/68177728/eb2e6b90-1013-4bfd-852b-78f04a841a77">
<img width="429" alt="workoutScreen" src="https://github.com/Shashank1247/WorkoutTracker/assets/68177728/b55eebb8-2e89-4b67-8aa1-1749c89a9ab0">

<img width="429" alt="calender" src="https://github.com/Shashank1247/WorkoutTracker/assets/68177728/b7b23a11-cbc5-40a6-9bbe-74ede64c7cd2">

<img width="429" alt="timer" src="https://github.com/Shashank1247/WorkoutTracker/assets/68177728/d1eb1395-707d-4747-8c00-4aab9bbd7dc8">


</p>

## Server API Design and Specification

### API Overview

The backend server for the Workout Tracking Application provides several APIs to support the app's functionality. These APIs allow users to manage their workout sessions, retrieve workout data, and update their profiles.

### Endpoints

1. **Create Workout Session**
    - **Endpoint:** `/api/workouts`
    - **Method:** POST
    - **Parameters:**
      - `name` (string): The name of the workout.
      - `exercises` (array): List of exercises included in the workout.
      - `date` (string): The date of the workout session.
    - **Example Call:**
      ```json
      {
          "name": "Morning Routine",
          "exercises": [
              {"name": "Push-ups", "reps": 20},
              {"name": "Squats", "reps": 30}
          ],
          "date": "2024-06-12"
      }
      ```

2. **Get Workout Sessions**
    - **Endpoint:** `/api/workouts`
    - **Method:** GET
    - **Parameters:** None
    - **Example Call:**
      ```json
      GET /api/workouts
      ```

3. **Update Workout Session**
    - **Endpoint:** `/api/workouts/:id`
    - **Method:** PUT
    - **Parameters:**
      - `id` (string): The ID of the workout session to be updated.
      - `name` (string, optional): The name of the workout.
      - `exercises` (array, optional): List of exercises included in the workout.
      - `date` (string, optional): The date of the workout session.
    - **Example Call:**
      ```json
      {
          "name": "Evening Routine",
          "exercises": [
              {"name": "Pull-ups", "reps": 15},
              {"name": "Lunges", "reps": 25}
          ],
          "date": "2024-06-12"
      }
      ```

4. **Delete Workout Session**
    - **Endpoint:** `/api/workouts/:id`
    - **Method:** DELETE
    - **Parameters:**
      - `id` (string): The ID of the workout session to be deleted.
    - **Example Call:**
      ```json
      DELETE /api/workouts/60a7b3e2e25e1b001c8d6c8d
      ```


## Experiences

### Design and Development

The design and development process of the Workout Tracking Application involved several stages, including requirement gathering, UI/UX design, implementation, and testing. The main challenge was ensuring a seamless user experience while maintaining robust functionality.

#### Major Challenges and Solutions
- **Challenge:** Integrating the backend with the frontend.
  - **Solution:** We used RESTful APIs to facilitate smooth communication between the server and the client. Proper error handling and data validation were implemented to ensure reliability.
- **Challenge:** Managing state and data consistency.
  - **Solution:** We adopted a state management library to manage the application's state effectively.

#### Modules and Techniques
- **Frontend:** Developed using React Native, ensuring cross-platform compatibility.
- **Backend:** Built with Node.js and Express, providing a robust server framework.
- **State Management:** Utilized Redux for state management.
- **Database:** MongoDB was used for storing workout data, providing scalability and flexibility.

### Future Plan

- **Feature Enhancements:** Adding more workout metrics, such as tracking calories burned and integrating with wearable devices.
- **UI Improvements:** Refining the user interface based on user feedback to enhance usability.
- **Social Features:** Implementing features that allow users to share their progress and compete with friends.


---

