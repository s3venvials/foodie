import React, { useState } from "react";
import { getProviders, signin, signIn } from "next-auth/client";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Modal from "../../components/Modal";
import PrivatePolicy from "../privacypolicy";

const theme = createTheme();

export default function SignUp({ providers }) {
  const [disabled, setDisabled] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [checked, setChecked] = useState(false);

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

  const handleChange = (event) => {
    const { checked } = event.target;
    setChecked(checked);
    if (checked) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: "30%",
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
                    disabled={disabled}
                    variant="outlined"
                    onClick={() =>
                      signIn(provider.id, {
                        callbackUrl: `${window.location.origin}/auth/account`,
                      })
                    }
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
            <Box sx={{ textAlign: "center" }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={handleChange}
                      onClick={() => setDisabled(false)}
                    />
                  }
                  label={
                    <Typography>
                      By checking this box you agree to the{" "}
                      <Button variant="text" onClick={() => setOpenModal(true)}>
                        Terms/Policies
                      </Button>
                    </Typography>
                  }
                />
              </FormGroup>
              <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                btnActions={
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setOpenModal(false)}
                    >
                      OK
                    </Button>
                  </>
                }
              >
                <PrivatePolicy />
              </Modal>
              <Typography>Already have an account</Typography>
              <Button variant="text" onClick={() => signin()}>
                Sign In
              </Button>
            </Box>
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
