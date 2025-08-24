// const express = require('express');
// const mongoose = require('mongoose');
// require('dotenv').config();

// const app = express();
// app.use(express.json());

// const PORT = 5000 || 5000;

// // MongoDB connection
// mongoose.connect('mongodb://ggg:89hp5UognpH02EPL@ac-yhbtcxs-shard-00-00.zmimumf.mongodb.net:27017,ac-yhbtcxs-shard-00-01.zmimumf.mongodb.net:27017,ac-yhbtcxs-shard-00-02.zmimumf.mongodb.net:27017/ggg?ssl=true&replicaSet=atlas-ls57jw-shard-0&authSource=admin&retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 10000, // 10 ثواني
// })
// .then(() => console.log('✅ Connected to MongoDB'))
// .catch(err => console.error('❌ DB Error:', err));

// // Simple route
// app.get('/', (req, res) => {
//     res.send('Hello from backend!');
// });

// app.listen(5000, () => console.log(`🚀 Server running on port ${PORT}`));


// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://ggg:89hp5UognpH02EPL@ac-yhbtcxs-shard-00-00.zmimumf.mongodb.net:27017,ac-yhbtcxs-shard-00-01.zmimumf.mongodb.net:27017,ac-yhbtcxs-shard-00-02.zmimumf.mongodb.net:27017/ggg?ssl=true&replicaSet=atlas-ls57jw-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // 10 ثواني
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ DB Error:', err));

// Simple User schema
const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});
const User = mongoose.model("User", UserSchema);

// Register
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  await user.save();
  res.json({ message: "User registered!" });
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    res.json({ message: "Login success!" });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
});
app.get("/", (req, res) => {
  res.send("Server is running!");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
