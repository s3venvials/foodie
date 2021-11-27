import React from "react";
import { useSession, signIn, signOut } from "next-auth/client";
import { useRouter } from "next/router";
import Fastfood from "@mui/icons-material/Fastfood";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
  Button,
  MenuItem,
  Menu,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MobileNav from "./MobileNav";

export default function Navigation() {
  const { push } = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [session] = useSession();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => push("/")}
          >
            <Fastfood />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              FC
            </Typography>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
          {matches ? (
            <MobileNav />
          ) : (
            <>
              <MenuItem>
                <Button variant="text" onClick={() => push("/")}>
                  Home
                </Button>
              </MenuItem>
              <MenuItem>
                <Button variant="text" onClick={() => push("/privacypolicy")}>
                  Terms/Policies
                </Button>
              </MenuItem>
              {session?.user ? (
                <>
                  <div>
                    <Button
                      id="menu-icon"
                      aria-controls="menu-icon"
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                      startIcon={<PersonIcon />}
                      endIcon={<ArrowDropDownIcon />}
                    >
                      {session?.user.name}
                    </Button>
                    <Menu
                      id="mobile-menu"
                      aria-labelledby="mobile-dropdown-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                    >
                      <MenuItem
                        onClick={() => {
                          push("/auth/account");
                          handleClose();
                        }}
                      >
                        <AccountCircleIcon sx={{ mr: 1 }} /> View Account
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          signOut();
                          handleClose();
                        }}
                      >
                        <ExitToAppIcon sx={{ mr: 1 }} /> Sign Out
                      </MenuItem>
                    </Menu>
                  </div>
                </>
              ) : (
                <>
                  <MenuItem>
                    <Button
                      // startIcon={<ExitToAppIcon />}
                      variant="text"
                      onClick={() => signIn()}
                    >
                      Sign In
                    </Button>
                  </MenuItem>
                  <Button
                    // startIcon={<PersonAddIcon />}
                    variant="text"
                    onClick={() => push("/auth/signup")}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
