import { Container, Typography } from "@mui/material";
import styles from "../styles/Home.module.css";

import CardGrid from "../components/CardGrid";
import AutoComplete from "../components/AutoComplete";

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

        <CardGrid />
      </Container>
    </Container>
  );
}
