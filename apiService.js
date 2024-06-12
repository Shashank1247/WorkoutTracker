import axios from 'axios';

const API_URL = 'http://192.168.1.154:3000'; // Use the IP address and port of your backend server

async function addWorkoutToCalendar(date) {
  try {
    const response = await axios.post(`${API_URL}/addWorkoutToCalendar`, { date });
    return response.data;
  } catch (error) {
    console.error('Error adding workout to calendar:', error.response ? error.response.data : error.message);
    throw error;
  }
}

async function updateLastPerformedDate(key, date) {
  try {
    const response = await axios.put(`${API_URL}/updateLastPerformedDate/${key}`, { date });
    return response.data;
  } catch (error) {
    console.error('Error updating last performed date:', error.response ? error.response.data : error.message);
    throw error;
  }
}

async function deleteDocument(collection, id) {
  try {
    const response = await axios.delete(`${API_URL}/deleteDocument/${collection}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting document:', error.response ? error.response.data : error.message);
    throw error;
  }
}

async function getWorkoutDays() {
  try {
    const response = await axios.get(`${API_URL}/getWorkoutDays`);
    return response.data;
  } catch (error) {
    console.error('Error getting workout days:', error.response ? error.response.data : error.message);
    throw error;
  }
}

async function getFormData() {
  try {
    const response = await axios.get(`${API_URL}/getFormData`);
    return response.data;
  } catch (error) {
    console.error('Error getting form data:', error.response ? error.response.data : error.message);
    throw error;
  }
}

async function writeFormData(formattedData) {
  try {
    const response = await axios.post(`${API_URL}/writeFormData`, formattedData);
    return response.data;
  } catch (error) {
    console.error('Error writing form data:', error.response ? error.response.data : error.message);
    throw error;
  }
}

export {
  addWorkoutToCalendar,
  updateLastPerformedDate,
  deleteDocument,
  getWorkoutDays,
  getFormData, // Ensure this function is correctly exported
  writeFormData,
};
