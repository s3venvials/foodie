import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Skeleton, Box } from "@mui/material";
import Card from "./Card";

export default function CardGrid() {
  const [meals, setMeals] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    const getRandomRecipe = async () => {
      try {
        setLoaded(false);
        const response = await axios.get("/api/mealdb?type=getRandomRecipe");
        setMeals([...response.data.meals.slice(0, 9)]);
        setLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    getRandomRecipe();
  }, []);

  return (
    <Grid container spacing={2}>
      {loaded
        ? meals.map((meal) => (
            <Grid item xs={12} sm={6} md={4} key={meal.idMeal}>
              <Card meal={meal} />
            </Grid>
          ))
        : arr.map((num) => (
          <Grid item xs={12} sm={6} md={4} key={num}>
            <Box>
              <Skeleton />
              <Skeleton variant="rectangular" width={345} height={275} />
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
            </Grid>
          ))}
    </Grid>
  );
}
