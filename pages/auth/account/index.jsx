import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession, signOut } from "next-auth/client";
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import styles from "../../../styles/Home.module.css";

export default function Account() {
  const [session] = useSession();
  const router = useRouter();
  const [user, setUser] = useState({ name: "", image: "", email: "" });
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!session) {
      router.push("/auth/signin");
    }
  }, [session]);

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

  useEffect(() => {
    const getFavs = async () => {
      try {
        const res = await axios.get(
          `/api/mongodb?type=getAllFavRecipes&id=${session.user.email}`
        );
        setFavorites([...res.data]);
      } catch (error) {
        console.log(error);
      }
    };
    getFavs();
  }, []);

  const BoxList = ({ data }) => {
    return (
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <nav aria-label="main mailbox folders">
          <List>
            {data.map((item) => (
              <ListItem
                key={item.idMeal}
                button
                divider
                onClick={() => router.push(`/meal/${item.idMeal}`)}
              >
                <ListItemText
                  primary={item.strMeal}
                  sx={{ textAlign: "center" }}
                />
              </ListItem>
            ))}
          </List>
        </nav>
      </Box>
    );
  };

  const deleteAccount = async () => {
    try {
      const res = await axios.delete(`/api/mongodb?type=deleteUserAccount&id=${session.user.email}`);
      if (res.status === 200) {
        signOut();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container className={styles.container}>
      {session && (
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
            <Box textAlign="center" sx={{ mb: 2 }}>
              <img
                src={user.image}
                alt="profile-avatar"
                width="152"
                height="152"
                style={{ borderRadius: "20em" }}
              />
              <Typography variant="h6" align="center" gutterBottom>
                {user.name}
              </Typography>
              <Typography variant="h6" align="center" gutterBottom>
                {user.email}
              </Typography>
              <Button variant="contained" color="error" onClick={deleteAccount}>Delete Account</Button>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5" textAlign="center" gutterBottom>
                  Favorites
                </Typography>
                <BoxList data={favorites} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5" textAlign="center" gutterBottom>
                  My Recipes
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      )}
    </Container>
  );
}
