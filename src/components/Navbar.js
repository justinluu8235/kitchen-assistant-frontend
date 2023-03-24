import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = (props) => {
  const [anchorElNav, setAnchorElNav] = useState();
  const [anchorElUser, setAnchorElUser] = useState();

  const pages = [
    { name: "Recipes", href: "/recipes" },
    { name: "Menu", href: "/menu" },
    { name: "Shopping List", href: "/shoppingList" },
    { name: "Pantry", href: "/pantry" },
    { name: "Search Recipes", href: "/searchRecipes" },
    { name: "My Friends", href: "/userFriends" },
  ];

  const accountLoggedInPages = [
    { name: "Profile", href: "/profile/" },
    { name: "Log out", href: "" },
  ];
  const accountLoggedOutPages = [
    { name: "Log In", href: "/login/" },
    { name: "Sign Up", href: "/signup/" },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { handleLogout, user, isAuth } = props;

  return (
    <AppBar position="static">
      <Container maxWidth="xl" style={{ backgroundColor: "var(--card-bg)" }}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "salmon",
              textDecoration: "none",
            }}
          >
            KITCHEN ASSISTANT
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page["name"]} onClick={handleCloseNavMenu}>
                  <a style={{ color: "var(--textColor)" }} href={page["href"]}>
                    {page["name"]}
                  </a>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".08rem",
              color: "salmon",
              textDecoration: "none",
            }}
          >
            KITCHEN ASSISTANT
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page["name"]}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <a style={{ color: "var(--background)" }} href={page["href"]}>
                  {page["name"]}
                </a>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                <AccountCircleIcon
                  fontSize="large"
                  style={{ color: "white" }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
              {isAuth ? (
                <>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Signed in as: {user["username"]}</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <a style={{ color: "var(--textColor)" }} href="/profile/">
                        Profile
                      </a>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">
                      <a style={{ color: "var(--textColor)" }} href="">
                        Log Out
                      </a>
                    </Typography>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <a style={{ color: "var(--textColor)" }} href="/login/">
                        Login
                      </a>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <a style={{ color: "var(--textColor)" }} href="/signup/">
                        Sign Up
                      </a>
                    </Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
