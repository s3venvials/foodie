import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import Card from "./Card";

export default function CardGrid() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const getRandomRecipe = async () => {
      try {
        for (let i = 0; i < 6; i++) {
          const response = await axios.get("/api/mealdb?type=getRandomRecipe");
          setMeals((prevState) => [...prevState, ...response.data.meals]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getRandomRecipe();
  }, []);

  return (
    <Grid container spacing={2}>
      {meals.map((meal) => (
        <Grid item xs={12} sm={4} key={meal.idMeal}>
          <Card meal={meal} />
        </Grid>
      ))}
    </Grid>
  );
}
