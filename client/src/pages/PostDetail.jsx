import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../service/api";
import { Typography, Box, Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AuthContext } from "../context/AuthContext";

const PostDetail = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await API.getPostById(id);
        setPost(data);
        console.log("Fetched post:", data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // Log user for debugging
  console.log("Logged-in user:", user);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await API.deletePost(id, user.token);
        // If successful, go to home page
        navigate("/home", { replace: true });
      } catch (error) {
        // Stay on the page and show error in console
        console.error('Delete error:', {
          error,
          status: error.response?.status,
          data: error.response?.data
        });
      }
    }
  };

  const handleEdit = () => {
    navigate(`/edit-post/${id}`);
  };

  if (loading) return <Typography>Loading post...</Typography>;
  if (!post) return <Typography>Post not found.</Typography>;

  // Extract userId safely from user object
  const userId = user?.id || user?._id || null;
  const authorId = post.author?._id ? post.author._id.toString() : null;
  console.log("Current logged in user:", user);
  console.log("Post author data:", post.author);
  console.log("UserId (after extraction):", userId);
  console.log("AuthorId (after extraction):", authorId);
  console.log("Are IDs equal?", userId === authorId);

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", p: 3, pt: 10 }}>
      <Box
        sx={{
          maxWidth: 800,
          mx: "auto",
          p: 3,
          border: "1px solid #ddd",
          borderRadius: 3,
          boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={2}>
          {post.title}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" mb={3}>
          By {post.author?.username || "Unknown Author"}
        </Typography>

        {post.imageUrl && (
          <Box
            component="img"
            src={`http://localhost:5000${post.imageUrl}`}
            alt={post.title}
            sx={{ width: "100%", maxHeight: 400, objectFit: "cover", borderRadius: 2, mb: 3 }}
          />
        )}

        <Typography
          variant="body1"
          whiteSpace="pre-line"
          sx={{ fontSize: "1.1rem", wordWrap: "break-word", overflowWrap: "break-word", wordBreak: "break-word" }}
        >
          {post.content}
        </Typography>

        {/* Show Edit/Delete only if logged-in user is post author */}
        {user && post.author && user.id && post.author._id && user.id === post.author._id.toString() ? (
          <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
            <Button variant="contained" color="primary" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        ) : (
          // Debug element to show why buttons aren't showing
          <Box sx={{ mt: 4, color: "grey.500", fontSize: "0.8rem" }}>
            {!user ? "No user logged in" : 
             !post.author ? "No author info" :
             !user.id ? "No user ID" :
             !post.author._id ? "No author ID" :
             `IDs don't match: ${user.id} !== ${post.author._id}`}
          </Box>
        )}
      </Box>

      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 2000,mr:25, borderRadius: 3, boxShadow: "0 4px 15px rgba(0,0,0,0.2)", textTransform: "none" }}
      >
        Back
      </Button>
    </Box>
  );
};

export default PostDetail;
