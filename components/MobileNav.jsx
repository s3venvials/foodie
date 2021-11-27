import React from "react";
import { useSession, signIn, signOut } from "next-auth/client";
import { useRouter } from "next/router";
import { Menu, MenuItem, IconButton } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AppsIcon from '@mui/icons-material/Apps';
import PolicyIcon from '@mui/icons-material/Policy';

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
      icon: <PersonIcon sx={{ mr: 1 }} />,
      onClick: () => {
        router.push("/auth/account");
        handleClose();
      },
    },
    {
      id: 1,
      label: "View Account",
      icon: <AccountCircleIcon sx={{ mr: 1 }} />,
      onClick: () => {
        router.push("/auth/account");
        handleClose();
      },
    },
    {
      id: 2,
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
      },
    },
  ];

  return (
    <div>
      <IconButton
        id="menu-icon"
        aria-controls="menu-icon"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <RestaurantMenuIcon />
      </IconButton>
      <Menu
        id="mobile-menu"
        aria-labelledby="mobile-dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => { router.push("/"); handleClose() }}><AppsIcon sx={{ mr: 1 }} /> Home</MenuItem>
        <MenuItem onClick={() => { router.push("/privacypolicy"); handleClose() }}>
          <PolicyIcon sx={{ mr: 1 }} /> Terms/Policies
        </MenuItem>
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
