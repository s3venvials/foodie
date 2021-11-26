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
        let temp = [];
        const mealsA = await axios.get(
          `/api/mealdb?type=getCategoryByName&category=${category}`
        );
        const mealsB = await axios.get(`/api/mongodb?type=searchByCategory&c=${category}`);
        setLoaded(true);

        if (mealsA.status === 200 && mealsA.data) {
          if (mealsA.data.meals !== null) {
            temp = mealsA.data.meals.concat(mealsB.data.meals);
          } else {
            temp = mealsB.data.meals;
          }
        }
        const assortedArr = temp.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
        if (temp.length > 0 && isActive) {
          setMeals(assortedArr);
          return;
        }
      } catch (error) {
        if (isActive) setMeals([]);
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
