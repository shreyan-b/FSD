import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useOutletContext } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { API } from "../service/api";
import Header from "../components/Header.jsx";

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

const Home = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (location.state?.newPost) {
      setPosts(prev => [location.state.newPost, ...prev]);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await API.getUserProfile(user.token);
        setProfile(data);
      } catch (error) {
        logout();
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchProfile();
    } else {
      navigate("/");
    }
  }, [user, logout, navigate]);

  useEffect(() => {
    const fetchPosts = async () => {
      const categoryQuery = category === "All" ? "" : `?category=${category}`;
      const fetchedPosts = await API.getPosts(categoryQuery);
      setPosts(fetchedPosts);
    };
    fetchPosts();
  }, [category]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleCreatePost = () => {
    navigate(`/create-post?category=${encodeURIComponent(category)}`);
  };

  if (loading) {
    return <Typography>Loading profile...</Typography>;
  }

  const handlePostClick = (postId) => {
  navigate(`/posts/${postId}`);
};

  return (
    <>
     
      <Box
        sx={{
          width: "100%",
          height: 300,
          backgroundImage: `url('/banner.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          mt: 0,
        }}
      />
      <Box
        sx={{
            
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          px: 0.9,
          mt: 2,
        }}
      >
        <Box sx={{ flexShrink: 0 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "green",
              fontSize: "0.875rem",
              padding: "6px 16px",
              mr: 3,
              ml: 2,
              "&:hover": { backgroundColor: "darkgreen" },
            }}
            onClick={handleCreatePost}
          >
            Create Blog
          </Button>
        </Box>
        <FormControl sx={{ minWidth: 150, ml: 7, mr: 4 }} size="small">
          <InputLabel id="category-select-label">Filter</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={category}
            label="Filter"
            onChange={handleCategoryChange}
            size="small"
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box
  sx={{
    maxWidth: 1100, // wider max width
    mx: "auto",
    mt: 4,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", // wider min box width for responsiveness
    gap: 4, // increase gap between boxes
    pb: 5,
  }}
>

        {posts.length === 0 ? (
          <Typography>No posts found</Typography>
        ) : (
          posts.map((post) => (
            <Box
  key={post._id}
  onClick={() => handlePostClick(post._id)}
  sx={{
    border: "1px solid #ddd",
    borderRadius: 2,
    p: 3,
    boxShadow: "0 2px 15px rgba(0,0,0,0.15)",
    background: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: 350,
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "scale(1.03)",
      boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
      cursor: "pointer",
    },
  }}
>


              <Typography variant="h6" mb={1}>
                {post.title}
              </Typography>
              {post.author && (
                <Typography variant="subtitle2" color="text.secondary" mb={1}>
                  By {post.author.username || "Unknown Author"}
                </Typography>
              )}
              {post.imageUrl && (
                <Box
                  component="img"
                  src={`http://localhost:5000${post.imageUrl}`}
                  alt={post.title}
                  sx={{
                    width: "100%",
                    maxHeight: 150,
                    objectFit: "cover",
                    borderRadius: 1,
                    mb: 1,
                  }}
                />
              )}
             <Typography
  variant="body2"
  sx={{
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 4, // limit to 4 lines
    WebkitBoxOrient: "vertical",
    whiteSpace: "normal",
  }}
>
  {post.content}
</Typography>
            </Box>
          ))
        )}
      </Box>
    </>
  );
};

export default Home;
