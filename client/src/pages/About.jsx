import React from "react";
import { Box, Typography, Link, Paper, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const About = () => {
  return (
    <Box
      sx={{position: "relative",  p: 3, pt: 10 ,
        maxWidth: 900,
        mx: "auto",
        my: 8,
        p: { xs: 3, sm: 6 },
        backgroundColor: "#f9f9fb",
        borderRadius: 4,
        boxShadow: "0 8px 24px rgba(140, 30, 30, 0.2)",
      }}
      component={Paper}
      elevation={4}
    >
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 700,
          letterSpacing: "0.05em",
          color: "#223a66",
          mb: 4,
          textAlign: "center",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        About Us
      </Typography>

      <Typography
        variant="body1"
        component="p"
        mb={3}
        sx={{ fontSize: 18, color: "#3b3b3b", lineHeight: 1.7 }}
      >
        Welcome to our platform, a thriving community where creativity and
        innovation take center stage. Our goal is to empower individuals by
        providing a refined and intuitive space to share their unique stories,
        insightful ideas, and passionate pursuits through thoughtfully crafted posts.
      </Typography>

      <Typography
        variant="body1"
        component="p"
        mb={3}
        sx={{ fontSize: 18, color: "#3b3b3b", lineHeight: 1.7 }}
      >
        We believe every voice matters. With a sleek design and powerful tools,
        users are equipped to express themselves authentically. Whether you are here to
        explore inspiring content or showcase your own, you are an integral part of an
        inclusive and engaging community.
      </Typography>

      <Typography
        variant="body1"
        component="p"
        mb={5}
        sx={{ fontSize: 18, color: "#3b3b3b", lineHeight: 1.7 }}
      >
        Experience seamless navigation across devices, with reliable support to ensure
        your journey here is fulfilling. Our commitment is to foster an environment
        that is respectful, safe, and welcoming to all.
      </Typography>

      <Box
        sx={{
          textAlign: "center",
          borderTop: "1px solid #ebc5c5ff",
          pt: 4,
        }}
      >
        <Typography variant="h6" component="p" sx={{ fontWeight: 600, mb: 1 }}>
          Interested in contributing?
        </Typography>

        <Link
          href="https://github.com/your-github-username"
          target="_blank"
          rel="noopener"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            color: "#223a66",
            textDecoration: "none",
            transition: "color 0.3s ease",
            "&:hover": {
              color: "#4078c0",
              cursor: "pointer",
              transform: "scale(1.2)",
            },
          }}
          aria-label="GitHub Profile"
        >
          <IconButton
            color="inherit"
            sx={{
              mr: 1,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.3)",
              },
            }}
            aria-label="GitHub Icon"
          >
            <GitHubIcon fontSize="large" />
          </IconButton>
          <Typography sx={{ fontWeight: 700, fontSize: 18 }}>
            your-github-username
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default About;
