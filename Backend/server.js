const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URI);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error : ${error.message}`);
  }
};

connectDB();

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: String,
  phone: String,
  id: String,
  creationDate: Date,
});

const User = mongoose.model("User", userSchema);

app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post("/api/users/create", async (req, res) => {
  const { username, password, phoneNumber, email } = req.body;
  try {
    const newUser = await User.create({
      username,
      email,
      password,
      phone: phoneNumber,
      creationDate: new Date(),
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
