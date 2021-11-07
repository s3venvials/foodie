import React from "react";
import { useSession, signIn, signOut } from "next-auth/client";
import { useRouter } from "next/router";
import { Menu, MenuItem, IconButton } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default function MobileNav() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [session] = useSession();
  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const links = [
    {
      id: 0,
      label: `${session?.user.name ?? ""}`,
      icon: <AccountCircleIcon sx={{ mr: 1 }} />,
      onClick: () => {
        router.push("/auth/account");
        handleClose();
      },
    },
    {
      id: 1,
      label: "Sign Out",
      icon: <ExitToAppIcon sx={{ mr: 1 }} />,
      onClick: () => signOut(),
    },
  ];

  const authLinks = [
    {
      id: 0,
      label: "Sign In",
      icon: <LoginIcon sx={{ mr: 1 }} />,
      onClick: () => signIn(),
    },
    {
      id: 1,
      label: "Sign Up",
      icon: <PersonAddIcon sx={{ mr: 1 }} />,
      onClick: () => {
        router.push("/auth/signup");
        handleClose();
      }
    },
  ];

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
        {session?.user
          ? links.map((link) => (
              <MenuItem key={link.id} onClick={link.onClick}>
                {link.icon} {link.label}
              </MenuItem>
            ))
          : authLinks.map((link) => (
              <MenuItem key={link.id} onClick={link.onClick}>
                {link.icon} {link.label}
              </MenuItem>
            ))}
      </Menu>
    </div>
  );
}
