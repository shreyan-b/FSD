import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';
import path from "path";

dotenv.config();

const app = express();   // ✅ Create app first

// ✅ Use middleware AFTER creating app
app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Test route
app.get('/', (req, res) => {
  res.send("Welcome to InkPulse API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
