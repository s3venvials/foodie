import { Container, Typography, Button, ButtonGroup } from "@mui/material";
import styles from "../styles/Home.module.css";

import CardGrid from "../components/CardGrid";
import AutoComplete from "../components/AutoComplete";
import FoodCategories from "../components/FoodCategories";

export default function Home() {
  return (
    <Container className={styles.container}>
      <Container className={styles.main}>
        <Typography
          variant="h3"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold" }}
        >
          Welcome to
          <Typography variant="span" color="primary">
            {" "}
            Foodie Cusines!
          </Typography>
        </Typography>

        <Typography variant="h5" gutterBottom align="center">
          Browse recipes from all over the world, get inspired and create and
          share your own!
        </Typography>

        <AutoComplete />
        <FoodCategories />

        <CardGrid />
      </Container>
    </Container>
  );
}
