import express from "express";
import multer from "multer";
import path from "path";
import Post from "../models/Post.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Upload image route
router.post("/upload-image", verifyToken, upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    res.json({ imageUrl: `/uploads/${req.file.filename}` });
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({ message: "Image upload failed." });
  }
});

// Create new post
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, content, category, imageUrl } = req.body;
    const newPost = new Post({
      title,
      content,
      category,
      imageUrl,
      author: req.user.id,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all posts with optional filter and pagination
router.get("/", async (req, res) => {
  try {
    const category = req.query.category;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    let filter = {};
    if (category && category !== "All") {
      filter.category = category;
    }

    const postsQuery = Post.find(filter)
      .populate("author", "username")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const posts = await postsQuery.exec();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get post by ID (populate full author info with _id included)
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("Post get by id error:", error);
    res.status(500).json({ message: error.message });
  }
});

// Delete post (only author allowed)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    // First check if the post exists and belongs to the user
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // If we get here, user owns the post, so delete it
    await Post.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Server delete error:', error);
    return res.status(500).json({ success: false });
  }
});

// Update post (only author allowed)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { title, content, category, imageUrl } = req.body;

    // Only update provided fields
    if (title !== undefined) post.title = title;
    if (content !== undefined) post.content = content;
    if (category !== undefined) post.category = category;
    if (imageUrl !== undefined) post.imageUrl = imageUrl;

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
