import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/client";
import { Container, Typography, Paper, Box } from "@mui/material";
import styles from "../../../styles/Home.module.css";

export default function Account() {
  const [session] = useSession();
  const [user, setUser] = useState({ name: '', image: '', email: '' });

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `/api/mongodb?type=getUserByEmail&id=${session.user.email}`
        );
        setUser(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return (
    <Container className={styles.container}>
      <Container className={styles.main}>
        <Paper sx={{ padding: 2 }}>
          <Typography
            variant="h3"
            gutterBottom
            align="center"
            sx={{ fontWeight: "bold" }}
            color="deepskyblue"
          >
            Account
          </Typography>
          <Box textAlign="center"><img src={user.image} alt="profile-avatar" width="152" height="152" /></Box>
          <Typography variant="h6" align="center" gutterBottom>{user.name}</Typography>
          <Typography variant="h6" align="center" gutterBottom>{user.email}</Typography>
        </Paper>
      </Container>
    </Container>
  );
}
