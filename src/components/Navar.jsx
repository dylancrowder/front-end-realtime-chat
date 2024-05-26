import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          component={Link}
          to="/"
          edge="start"
          color="inherit"
          aria-label="logo"
          sx={{ mr: 2 }}
        >
          ChatApp
          <SentimentVerySatisfiedIcon sx={{ fontSize: 25, marginLeft: 0 }} />
        </IconButton>
        <div style={{ flexGrow: 1 }} />
        <div>
          <IconButton
            onClick={handleMenuOpen}
            edge="end"
            sx={{ ml: 2 }}
            color="inherit"
          >
            <PersonIcon sx={{ fontSize: 35 }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
              <ListItemIcon>
                <LoginIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Log In</ListItemText>
            </MenuItem>
            <MenuItem
              component={Link}
              to="/logout"
              
              onClick={handleMenuClose}
              sx={{
                "&:hover": {
                  bgcolor: "secondary.main",
                  color: "white",
                  "& .MuiListItemIcon-root": {
                    color: "white",
                  },
                },
              }}
            >
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Log Out</ListItemText>
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
