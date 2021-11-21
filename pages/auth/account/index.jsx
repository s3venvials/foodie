import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { getSession, signOut } from "next-auth/client";
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SimpleAccordion from "../../../components/Accordion";
import Modal from "../../../components/Modal";
import styles from "../../../styles/Home.module.css";
const sha1 = require("sha1");

const BoxList = ({ data, isDeleteable, onDelete }) => {
  const router = useRouter();
  const deleteRecipe = async (idMeal, public_id) => {
    const session = await getSession();
    if (session) {
      const response = await axios.put(
        `/api/mongodb?type=deleteRecipe&id=${idMeal}&user=${
          session?.user?.email ?? ""
        }`
      );
      if (response.status === 200) {
        onDelete(idMeal);
        const d = new Date().getTime() / 1000;
        const sha = sha1(
          `public_id=${public_id}&timestamp=${d}${process.env.NEXT_PUBLIC_CLOUDINARY_SECRET}`
        );
        const result = await axios.post(
          "https://api.cloudinary.com/v1_1/frontndev/image/destroy",
          {
            public_id,
            timestamp: d,
            signature: sha,
            api_key: process.env.NEXT_PUBLIC_CLOUDINARY_ID,
          }
        );
      }
    }
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <nav aria-label="main mailbox folders">
        <List>
          {data.map((item) => (
            <ListItem key={item.idMeal} button divider>
              <ListItemText
                primary={item.strMeal}
                sx={{ textAlign: "center" }}
              />
              <ListItemIcon>
                <IconButton onClick={() => router.push(`/meal/${item.idMeal}`)}>
                  <OpenInNewIcon color="primary" />
                </IconButton>
              </ListItemIcon>
              {isDeleteable && (
                <ListItemIcon>
                  <IconButton
                    onClick={() => deleteRecipe(item.idMeal, item.public_id)}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </ListItemIcon>
              )}
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
};

export default function Account() {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState({ name: "", image: "", email: "" });
  const [recipes, setRecipes] = useState([]);
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    let isActive = true;
    const getUser = async () => {
      try {
        const session = await getSession();

        if (!session) {
          router.push("/auth/signin");
        }

        const res = await axios.get(
          `/api/mongodb?type=getUserByEmail&id=${session.user.email}`
        );
        setUser(res.data);
        setRecipes(res.data.recipes);
        setFavs(res.data.favorites);
      } catch (error) {
        console.log(error);
      }
    };
    if (isActive) {
      getUser();
    }
    return () => {
      isActive = false;
    };
  }, []);

  const deleteAccount = async () => {
    try {
      const res = await axios.delete(
        `/api/mongodb?type=deleteUserAccount&id=${user.email}`
      );
      if (res.status === 200) {
        signOut();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeRecipe = (id) => {
    const temp = recipes.filter((r) => r.idMeal !== id);
    const temp2 = favs.filter((f) => f.idMeal !== id);
    setRecipes(temp);
    setFavs(temp2);
  };

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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setOpenModal(true)}
                >
                  Delete Account
                </Button>
                <Modal
                  open={openModal}
                  onClose={() => setOpenModal(false)}
                  title="Delete Account Confirmation"
                  dialogContentText="Please select the confirm button to verify that you want to delete your account and that you understand that by doing so your account can not be recovered."
                  btnActions={
                    <>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={deleteAccount}
                      >
                        Confirm
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setOpenModal(false)}
                      >
                        Cancel
                      </Button>
                    </>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="success"
                  endIcon={<AddCircleOutlineIcon />}
                  onClick={() => router.push("/meal/addrecipe")}
                >
                  Add Recipe
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <SimpleAccordion title="Favorites">
                <BoxList data={favs} />
              </SimpleAccordion>
            </Grid>
            <Grid item xs={12} sm={6}>
              <SimpleAccordion title="Recipes">
                <BoxList
                  data={recipes}
                  isDeleteable={true}
                  onDelete={removeRecipe}
                />
              </SimpleAccordion>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Container>
  );
}
