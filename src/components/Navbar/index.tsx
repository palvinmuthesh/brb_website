import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from "../../theme";
import ThemeToggle from "../ThemeToggle";
import { logout } from "../../redux/slices/authSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useContext } from 'react';
import { UserContext } from '../../userContext';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // md = 960px
  const { mode, toggleTheme } = useThemeContext();  

  // const [user, setUser] = useState(localStorage.getItem("user"));
  // const [admin, setAdmin] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const isAdmin = user?.user?.role !== "user";

  // useEffect(() => {
  //   console.log(user, JSON.parse(user!).user._id)
  //   try {
  //     if (JSON.parse(user!).user.role == "user") {
  //       setAdmin(false);
  //     } else {
  //       setAdmin(true);
  //     }
  //   } catch (error) {
  //     console.error('Booking Data error:', error);
  //   }
  // }, [])

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleMenuClose();
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  const menuItems = [
    { text: "Home", path: "/" },
    { text: "Booking", path: "/bookingList" },
    { text: "Logout", logout: true },
  ];

  const menuItems1 = [
    { text: "Reporting", path: "/" },
    { text: "Booking", path: "/bookingList" },
    { text: "Logout", logout: true },
  ];

  return (
    <>
      {isMobile ? (
        // Mobile View Top Navbar
        <AppBar position="static"
          style={{
            background: mode === 'light' ? '#6C63FF' : '#9C27B0',
          }}>
          <Toolbar className="flex justify-between">
            <IconButton onClick={() => setDrawerOpen(true)} color="inherit">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              BRB Booking
            </Typography>
            <div style={{position: "absolute", right: "10px"}}>
              <ThemeToggle/>
            </div>
          </Toolbar>
        </AppBar>
      ) : (
        // Desktop View Sidebar
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            width: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: 240,
              boxSizing: "border-box",
              backgroundColor: mode === 'light' ? '#6C63FF' : '#9C27B0',
              color: "white",
            },
          }}
        >
          {/* <Toolbar /> */}
          <div style={{alignSelf: "center"}}>
          <label style={{marginTop: 15, display: "inline-block"}}>Trigger Mode</label>
            <ThemeToggle/>
          </div>
          <Box sx={{ overflow: "auto", mt: 2 }}>
          <List>
          {(!isAdmin ? menuItems : menuItems1).map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => {
              if (item.logout) {
                handleLogout(); 
              } else if(item.path) {
                handleNavigate(item.path); 
              }
            }}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
          ))}
          </List>
          </Box>
        </Drawer>
      )}

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250 }} role="presentation">
        <List>
        {(!isAdmin ? menuItems : menuItems1).map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton onClick={() => {
            if (item.logout) {
              handleLogout(); 
            } else if(item.path) {
              handleNavigate(item.path); 
            }
          }}>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
        </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
