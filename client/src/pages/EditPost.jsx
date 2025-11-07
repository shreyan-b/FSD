import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { API } from "../service/api";
import { AuthContext } from "../context/AuthContext";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Redirect to login if no user
  React.useEffect(() => {
    if (!user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await API.getPostById(id);
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        console.error("Failed to fetch post:", error);
        setError("Failed to fetch post");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (!title.trim() || !content.trim()) {
        setError("Title and content are required");
        return;
      }

      const response = await API.updatePost(id, { 
        title, 
        content,
        category: post.category // Preserve the original category
      }, user.token);
      
      if (response) {
        // Ensure we're still authenticated
        if (user) {
          navigate("/home", { replace: true }); // Navigate to authenticated home page and replace history
        } else {
          navigate("/", { replace: true }); // Navigate to login if somehow we lost auth
        }
      }
    } catch (error) {
      console.error("Failed to update post:", error);
      setError(error.response?.data?.message || "Failed to update post");
    }
  };

  if (loading) return <Typography>Loading post data...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!post) return <Typography>Post not found.</Typography>;

  // Check if current logged-in user is the author
  const userId = user?.id || user?._id;
  if (!userId || userId !== post.author._id.toString()) {
    return <Typography>You are not authorized to edit this post.</Typography>;
  }

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit}
      sx={{  position: "relative", minHeight: "100vh", p: 3, pt: 10 ,
        maxWidth: 600, 
        mx: "auto", 
        mt: 4, 
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 3 
      }}
    >
      <Typography variant="h5">Edit Post</Typography>
      
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <TextField
        label="Title"
        fullWidth
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={!title.trim()}
        helperText={!title.trim() ? "Title is required" : ""}
      />

      <TextField
        label="Content"
        fullWidth
        required
        multiline
        minRows={6}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        error={!content.trim()}
        helperText={!content.trim() ? "Content is required" : ""}
      />

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button 
          variant="contained" 
          type="submit"
          disabled={!title.trim() || !content.trim()}
        >
          Save Changes
        </Button>
        <Button 
          variant="outlined" 
          onClick={() => navigate(`/post/${id}`)}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default EditPost;
