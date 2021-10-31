import * as React from "react";
import { useRouter } from "next/router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Fastfood from "@mui/icons-material/Fastfood";

export default function Navigation() {
  const router = useRouter();

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
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
