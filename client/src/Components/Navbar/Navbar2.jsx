import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { useAuth } from "../../Context/AuthContext";

function ResponsiveAppBar() {
  const { auth } = useAuth();
  const userName = auth.name;
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#ffff",
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="a"
            href="#app-bar-with-responsive-menu"
            variant="h6"
            noWrap
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Logo />
          </Box>
        </Box>
        <Avatar sx={{ bgcolor: "#3f51b5", marginRight: "30px" }}>{userName[0]}</Avatar>
      </Toolbar>
    </AppBar>
  );
}

export default ResponsiveAppBar;
