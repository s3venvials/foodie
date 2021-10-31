import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Box } from "@mui/material";
import CardGrid from "../../components/CardGrid";
import styles from "../../styles/Home.module.css";

export default function Category() {
  const [meals, setMeals] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [category, setCategory] = useState("");

  useEffect(() => {
    let isActive = true;

    if (window !== undefined) {
      setCategory(window.location.pathname.split("/")[2]);
    }

    const getRecipesByCategory = async () => {
      try {
        setLoaded(false);
        const res = await axios.get(
          `/api/mealdb?type=getCategoryByName&category=${category}`
        );
        setLoaded(true);

        if (res.status === 200 && res.data) {
          setMeals([...res.data.meals]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (isActive && category) {
      getRecipesByCategory();
    }

    return () => {
      isActive = false;
    };
  }, [category]);

  return (
    <Container className={styles.container}>
      <Container className={styles.main}>
        <Box textAlign="center">
          <Typography variant="h3" color="brown" gutterBottom>{category}</Typography>
        </Box>
        <CardGrid meals={meals} loaded={loaded} />
      </Container>
    </Container>
  );
}
