import React, { useState } from "react";
import Header from "./Header";
import { Button, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

const FixedTopBar = ({ category, setCategory }) => {
  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate(`/create-post?category=${encodeURIComponent(category)}`);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 24px",
        zIndex: 1300,
      }}
    >
      <Header />
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <Button variant="contained" color="primary" onClick={handleCreatePost}>
          Create Blog
        </Button>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel id="category-select-label">Filter</InputLabel>
          <Select
            labelId="category-select-label"
            value={category}
            label="Filter"
            onChange={handleCategoryChange}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

const Layout = ({ children }) => {
  const [category, setCategory] = useState("All");

  return (
    <>
      <FixedTopBar category={category} setCategory={setCategory} />
      <main style={{ minHeight: "100vh" }}>
        {children(category)}</main>
    </>
  );
};

export default Layout;
