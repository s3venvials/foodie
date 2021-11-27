import { AppBar, Box, Toolbar, Typography } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.primary" textAlign="center">
      {"Copyright © "}
      Foodie Cuisines {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function BottomAppBar() {
  return (
    <Box>
      <AppBar
        position="fixed"
        color="inherit"
        sx={{ top: "auto", bottom: "0" }}
      >
        <Toolbar>
          <Copyright />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
