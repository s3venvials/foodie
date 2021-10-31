import React from "react";
import { useSession, signIn, signOut } from "next-auth/client";
import { Menu, MenuItem, IconButton, Typography } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import LoginIcon from "@mui/icons-material/Login";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export default function MobileNav() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [session] = useSession();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <RestaurantMenuIcon />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {session?.user ? (
          <>
            <MenuItem onClick={() => signOut()}>
              <ExitToAppIcon sx={{ mr: 1 }} /> SignOut
            </MenuItem>
            <MenuItem>
              <Typography>Welcome {session.user.name}!</Typography>
            </MenuItem>
          </>
        ) : (
          <MenuItem onClick={() => signIn()}>
            <LoginIcon sx={{ mr: 1 }} /> SignIn
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
