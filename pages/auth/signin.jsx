import React, { useEffect, useState } from "react";
import axios from "axios";
import { getProviders, signIn } from "next-auth/client";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function SignIn({ providers }) {
  const [imageUrl, setImageUrl] = useState("");
  console.log(providers);

  const getColorAndIcon = (name) => {
    switch (name) {
      case "GitHub":
        return { color: "#5c6bc0", icon: <GitHubIcon /> };
      case "Facebook":
        return { color: "#2196f3", icon: <FacebookIcon /> };
      case "Google":
        return { color: "#e53935", icon: <GoogleIcon /> };
      default:
        return;
    }
  };

  useEffect(() => {
    let isActive = true;

    const getSingleRandomImg = async () => {
      try {
        const res = await axios.get("/api/mealdb?type=getSingleRandom");
        if (res.status === 200 && res.data) {
          setImageUrl(res.data.meals[0].strMealThumb);
          return;
        }
        setImageUrl("https://source.unsplash.com/random");
      } catch (error) {
        console.log(error);
        setImageUrl("https://source.unsplash.com/random");
      }
    };

    if (isActive) {
      getSingleRandomImg();
    }

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={12}
          md={6}
          sx={{
            backgroundImage: `url(${imageUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 15,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
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
                      sx={{ color: `${getColorAndIcon(provider.name).color}`, mb: 2 }}
                    >
                      Sign in with {provider.name}
                    </Button>
                  </div>
                ))}
              </>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
