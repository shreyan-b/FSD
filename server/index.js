import express from 'express';

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';
import path from "path";


const cors = require("cors");

app.use(cors({
  origin: "*",
  credentials: true
}));

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/posts", postRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.get('/', (req, res) => {
  res.send("Welcome to InkPulse API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
