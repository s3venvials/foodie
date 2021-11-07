import * as React from "react";
import { getProviders, signIn } from "next-auth/client";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function SignUp({ providers }) {
  const getColorAndIcon = (name) => {
    switch (name) {
      case "GitHub":
        return { color: "#5c6bc0", icon: <GitHubIcon /> };
      case "Facebook":
        return { color: "#2196f3", icon: <FacebookIcon /> };
      case "Google":
        return { color: "#e53935", icon: <GoogleIcon /> };
      default:
        return { color: "", icon: "" };
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box sx={{ mt: 2 }}>
            <>
              {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <Button
                    variant="outlined"
                    onClick={() => signIn(provider.id)}
                    fullWidth
                    startIcon={getColorAndIcon(provider.name).icon}
                    sx={{
                      color: `${getColorAndIcon(provider.name).color}`,
                      mb: 2,
                    }}
                  >
                    Sign up with {provider.name}
                  </Button>
                </div>
              ))}
            </>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
