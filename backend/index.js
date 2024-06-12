const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const uri = 'mongodb+srv://shashankg1219:raja8978@cluster0.lswccon.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB connection string
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connectToDatabase() {
  if (!db) {
    await client.connect();
    db = client.db('workoutTracker'); // Replace with your database name
  }
  return db;
}

app.use(bodyParser.json());
app.use(cors()); // Enable CORS

app.get('/getUserData/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    if (!ObjectId.isValid(userId)) {
      throw new Error('Invalid user ID');
    }
    const db = await connectToDatabase();
    const collection = db.collection('users');
    const user = await collection.findOne({ _id: new ObjectId(userId) });
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('No data available');
    }
  } catch (error) {
    console.error('Error getting user data:', error);
    res.status(500).send(error.message);
  }
});

app.post('/writeFormData', async (req, res) => {
  const formattedData = req.body;
  try {
    const db = await connectToDatabase();
    const collection = db.collection('users');
    await collection.insertOne(formattedData);
    res.send('Data written');
  } catch (error) {
    console.error('Error writing form data:', error);
    res.status(500).send(error.message);
  }
});

app.get('/getFormData', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('users');
    const exercisesPLZ = await collection.find().toArray();
    res.json(exercisesPLZ);
  } catch (error) {
    console.error('Error getting form data:', error);
    res.status(500).send(error.message);
  }
});

app.put('/updateLastPerformedDate/:key', async (req, res) => {
  const key = req.params.key;
  const date = req.body.date;
  try {
    if (!ObjectId.isValid(key)) {
      throw new Error('Invalid key');
    }
    const db = await connectToDatabase();
    const collection = db.collection('users');
    await collection.updateOne(
      { _id: new ObjectId(key) },
      { $set: { lastPerformed: date } }
    );
    res.send('Date updated');
  } catch (error) {
    console.error('Error updating last performed date:', error);
    res.status(500).send(error.message);
  }
});

app.delete('/deleteDocument/:collection/:id', async (req, res) => {
  const { collection, id } = req.params;
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid document ID');
    }
    const db = await connectToDatabase();
    const result = await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 1) {
      res.send('Document deleted');
    } else {
      res.status(404).send('Document not found');
    }
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).send(error.message);
  }
});

app.post('/addWorkoutToCalendar', async (req, res) => {
  const { date } = req.body;
  try {
    const db = await connectToDatabase();
    const collection = db.collection('history');
    await collection.insertOne({ date });
    res.send('Workout date added');
  } catch (error) {
    console.error('Error adding workout to calendar:', error);
    res.status(500).send(error.message);
  }
});

app.get('/getWorkoutDays', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('history');
    const values = await collection.find().project({ _id: 0, date: 1 }).toArray();
    res.json(values.map(doc => doc.date));
  } catch (error) {
    console.error('Error getting workout days:', error);
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
