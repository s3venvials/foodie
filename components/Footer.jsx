import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export default function BottomAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        color="inherit"
        sx={{ top: "auto", bottom: "0" }}
      >
        <Toolbar>
          <Typography variant="body1">
            All Rights Reserved Base App {new Date().getFullYear()}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
