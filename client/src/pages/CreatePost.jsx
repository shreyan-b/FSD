import React, { useState, useContext } from "react";
import { API } from "../service/api";
import FileUpload from "../components/FileUpload";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./PostCreate.css";

const categories = [
  "All",
  "Technology",
  "Lifestyle",
  "Travel",
  "Food",
  "Health",
  "Science",
  "Education",
  "Business",
  "Entertainment",
  "Sports",
  "Art",
  "Finance",
  "Fashion",
  "Photography",
];

const CreatePost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext); // Access user context to get token
  const urlParams = new URLSearchParams(location.search);
  const initialCategory = urlParams.get("category") || "All";

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: initialCategory,
    imageUrl: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const form = new FormData();
    form.append("image", file);

    const response = await API.uploadImage(form, user.token);

    console.log("Uploaded Image URL:", response.imageUrl);
    setFormData({ ...formData, imageUrl: response.imageUrl });
  };

  const handleSubmit = async () => {
    try {
      if (!user?.token) {
        throw new Error("User not authenticated");
      }
      // Don't save category as "All" - treat as empty string
      const categoryToSave = formData.category === "All" ? "" : formData.category;
      const postToSend = { ...formData, category: categoryToSave };

      const newPost = await API.createPost(postToSend, user.token);
      navigate("/home", { state: { newPost } });
    } catch (error) {
      console.error("Create post failed:", error);
    }
  };

  return (
  
    <div className="post-form">
      <input
        className="post-title"
        type="text"
        name="title"
        onChange={handleChange}
        value={formData.title}
        placeholder="Title"
      />
      <textarea
        className="post-content"
        name="content"
        onChange={handleChange}
        value={formData.content}
        placeholder="Content"
      />
      <select
        className="post-category"
        name="category"
        onChange={handleChange}
        value={formData.category}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <div className="actions-container">
        <FileUpload onFileChange={handleFileChange} />
        <button className="submit-btn" onClick={handleSubmit}>
          Create Post
        </button>
      </div>

      {formData.imageUrl && (
        <img
          src={formData.imageUrl}
          alt="preview"
          className="post-image-preview"
        />
      )}
    </div>
  );
};

export default CreatePost;
