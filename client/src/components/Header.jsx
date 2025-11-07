import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = () => {
  const navigate = useNavigate();
    const location = useLocation();
  
  

   
  const { user, logout } = useContext(AuthContext);

  console.log("User object in Header:", user);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    handleMenuClose();
  };

  const handleHomeClick = () => {
  console.log("Home clicked, current path:", location.pathname);
  if (location.pathname === "/home") {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });

  } else {
    navigate("/home");
  }
};


  

  return (
    <AppBar
      position="fixed" // changed from static to sticky
      sx={{
        boxShadow: "none",
        backgroundColor: "#c4d5e6ff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
         // make sure it stays on top
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 15,
          position: "relative",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            cursor: "pointer",
            fontSize: "1.2rem",
            color: "#151413ff",
            fontWeight: "bold",
          }}
           onClick={handleHomeClick}

        >
          HOME
        </Typography>

        <Button
          color="inherit"
          sx={{
            cursor: "pointer",
            fontSize: "1.2rem",
            color: "#151413ff",
            fontWeight: "bold",
          }}
          onClick={() => navigate("/about")}
        >
          About
        </Button>

        <Button
          color="inherit"
          sx={{
            fontSize: "1.2rem",
            color: "#151413ff",
            fontWeight: "bold",
            "&:hover": {
              color: "red",
              backgroundColor: "transparent",
            },
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>

        {/* Profile avatar and menu in top right corner */}
        <Tooltip title="User Profile">
          <IconButton
            sx={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
            }}
            onClick={handleMenuOpen}
          >
            <AccountCircleIcon sx={{ fontSize: 40, color: "#49095eff" }} />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem sx={{ pointerEvents: 'none', opacity: 1 }}>
            <Typography sx={{ fontWeight: 'bold' }}>
              {user?.username || 'Guest User'}
            </Typography>
          </MenuItem>
          <MenuItem sx={{ pointerEvents: 'none', opacity: 1 }}>
            <Typography sx={{ fontSize: '0.9rem', color: 'text.secondary' }}>
              {user?.email || 'Not logged in'}
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
