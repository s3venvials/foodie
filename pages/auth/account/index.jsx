import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { getSession, signin, signOut, useSession } from "next-auth/client";
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
  Skeleton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EditIcon from "@mui/icons-material/Edit";
import SimpleAccordion from "../../../components/Accordion";
import Modal from "../../../components/Modal";
import PopUpMsg from "../../../components/PopUpMsg";
import styles from "../../../styles/Home.module.css";
const sha1 = require("sha1");

const BoxList = ({ data, isDeleteable, onDelete, isEditable }) => {
  const router = useRouter();
  const deleteRecipe = async (idMeal, public_id) => {
    const session = await getSession();
    if (session) {
      const response = await axios.put(
        `/api/mongodb?type=deleteRecipe&id=${idMeal}&user=${
          session?.user?.id ?? ""
        }`
      );
      if (response.status === 200) {
        onDelete(idMeal);
        const d = new Date().getTime() / 1000;
        const sha = sha1(
          `public_id=${public_id}&timestamp=${d}${process.env.NEXT_PUBLIC_CLOUDINARY_SECRET}`
        );
        await axios.post(
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
                <IconButton
                  title="view"
                  onClick={() => router.push(`/meal/${item.idMeal}`)}
                >
                  <OpenInNewIcon color="primary" />
                </IconButton>
              </ListItemIcon>
              {isEditable && (
                <ListItemIcon>
                  <IconButton
                    title="edit"
                    onClick={() =>
                      router.push(
                        `/meal/addrecipe?idMeal=${item.idMeal}&type=edit`
                      )
                    }
                  >
                    <EditIcon color="primary" />
                  </IconButton>
                </ListItemIcon>
              )}
              {isDeleteable && (
                <ListItemIcon>
                  <IconButton
                    title="delete"
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
  const [openMsg, setOpenMsg] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [session] = useSession();

  useEffect(() => {
    let isActive = true;
    const getUser = async () => {
      try {
        const session = await getSession();

        if (!session) {
          signin();
        } else {
          let res = { status: 0, data: { recipes: [], favorites: [] } };
          if (session.user.id) {
            res = await axios.get(
              `/api/mongodb?type=getUserById&id=${session.user.id}`
            );
            if (isActive) setLoaded(true);
          }
          if (res.status === 200 && res.data && isActive) {
            setUser(res.data);
            setRecipes(res.data.recipes);
            setFavs(res.data.favorites);
          }
        }
      } catch (error) {}
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
      const session = await getSession();
      const res = await axios.delete(
        `/api/mongodb?type=deleteUserAccount&id=${session.user.id}`
      );
      if (res.status === 200) {
        signOut();
      }
    } catch (error) {}
  };

  const removeRecipe = (id) => {
    const temp = recipes.filter((r) => r.idMeal !== id);
    const temp2 = favs.filter((f) => f.idMeal !== id);
    setRecipes(temp);
    setFavs(temp2);
    setOpenMsg(true);
  };

  return (
    <Container className={styles.container}>
      <Container className={styles.main}>
        {session && loaded ? (
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
                    isEditable={true}
                    onDelete={removeRecipe}
                  />
                </SimpleAccordion>
              </Grid>
            </Grid>
            <PopUpMsg
              open={openMsg}
              severity="error"
              message="Recipe Deleted!"
              setOpen={(value) => setOpenMsg(value)}
            />
          </Paper>
        ) : (
          <Paper>
            <Typography variant="h3"><Skeleton /></Typography>
            <Box textAlign="center"><Skeleton variant="circular" width={152} height={152} /></Box>
            <Typography variant="h6"><Skeleton /></Typography>
            <Typography variant="h6"><Skeleton /></Typography>
            <Typography variant="h6"><Skeleton /></Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}><Skeleton /></Grid>
              <Grid item xs={6}><Skeleton /></Grid>
              <Grid item xs={6}><Skeleton /></Grid>
              <Grid item xs={6}><Skeleton /></Grid>
            </Grid>
          </Paper>
        )}
      </Container>
    </Container>
  );
}
