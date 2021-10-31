import React from "react";
import { useSession, signIn, signOut } from "next-auth/client";
import { useRouter } from "next/router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Fastfood from "@mui/icons-material/Fastfood";
import LoginIcon from "@mui/icons-material/Login";
import MenuItem from "@mui/material/MenuItem";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export default function Navigation() {
  const router = useRouter();
  const [session] = useSession();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => router.push("/")}
          >
            <Fastfood />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              FC
            </Typography>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
          {session?.user ? (
            <>
            <MenuItem>
            <Typography>Welcome {session.user.name}!</Typography>
            </MenuItem>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => signOut()}
              startIcon={<ExitToAppIcon />}
            >
              Signout
            </Button>
            </>
          ) : (
            <Button
              color="primary"
              variant="contained"
              onClick={() => signIn()}
              startIcon={<LoginIcon />}
              sx={{ mr: 2 }}
            >
              Signin
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
