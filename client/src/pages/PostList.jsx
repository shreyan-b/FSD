import React, { useState, useEffect } from "react";
import { API } from "../service/api";
import "./PostList.css"; // optional styling file

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

const PostList = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const categoryQuery = selectedCategory === "All" ? "" : `?category=${selectedCategory}`;
    API.getPosts(categoryQuery).then(setPosts);
  }, [selectedCategory]);

  return (
    <div className="post-list-container">
      <div className="category-filter">
        <label htmlFor="category-select">Filter by category: </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="post-list">
        {posts.length === 0 && <p>No posts found</p>}

        {posts.map((post) => (
          <div key={post._id} className="post-card">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-meta"><strong>Category:</strong> {post.category} | <strong>Author:</strong> {post.author.username}</p>
            {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="post-image" />}
            <p className="post-snippet">{post.content.slice(0, 150)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
