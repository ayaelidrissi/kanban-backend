require('dotenv').config();
const mongoose = require('mongoose');
const Task = require('./models/Task');

const sampleTasks = [
  { title: "Setup Project Structure", description: "Initialize MERN folders and install dependencies", status: "done", order: 0 },
  { title: "Connect MongoDB", description: "Configure .env and connect to Cluster1", status: "done", order: 1 },
  { title: "Build Task API", description: "Create GET, POST, and PATCH routes", status: "in-progress", order: 0 },
  { title: "Implement Drag & Drop", description: "Install hello-pangea/dnd and build UI", status: "todo", order: 0 },
  { title: "User Authentication", description: "Secure the board with JWT login", status: "todo", order: 1 }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");
    
    await Task.deleteMany({}); // Clears existing tasks so you don't get duplicates
    await Task.insertMany(sampleTasks);
    
    console.log("✅ Database Seeded Successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding Error:", err);
    process.exit(1);
  }
};

seedDB();