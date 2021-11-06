import React from "react";
import { useSession, signIn, signOut } from "next-auth/client";
import { useRouter } from "next/router";
import Fastfood from "@mui/icons-material/Fastfood";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
  Button,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MobileNav from "./MobileNav";

export default function Navigation() {
  const router = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
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
          {matches ? (
            <MobileNav />
          ) : (
            <>
              {session?.user ? (
                <>
                  <MenuItem onClick={() => router.push('/auth/account')}>
                    <AccountCircleIcon sx={{ mr: 1 }} /> {session?.user.name}
                  </MenuItem>
                  <Button variant="outlined" onClick={() => signOut()}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button
                  startIcon={<ExitToAppIcon />}
                  variant="contained"
                  onClick={() => signIn()}
                >
                  Sign In
                </Button>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
