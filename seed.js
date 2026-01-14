require('dotenv').config();
const mongoose = require('mongoose');
const Task = require('./models/Task');

const seedTasks = [
  { title: "Fix Login Bug", description: "Users can't log in on mobile", status: "todo", category: "Bug" },
  { title: "New Dashboard UI", description: "Design the new dark mode", status: "in-progress", category: "Design" },
  { title: "API Integration", description: "Connect to the payment gateway", status: "todo", category: "Feature" },
  { title: "Update Docs", description: "Update the README file", status: "done", category: "General" }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    await Task.deleteMany({});
    await Task.insertMany(seedTasks);
    console.log("✅ Database Seeded with Categories!");
    process.exit();
  })
  .catch(err => console.log(err));