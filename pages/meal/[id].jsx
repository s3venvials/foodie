import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import { Favorite, Share } from "@mui/icons-material";

const IngrediantsList = (meal) => {
  const [list, setList] = useState([]);
  let ingrediants = [];
  let measurements = [];

  useEffect(() => {
    if (
      Object.keys(meal.meal) !== undefined &&
      Object.keys(meal.meal).length !== 0 &&
      ingrediants.length === 0
    ) {
      const temp = [];
      for (const [key, value] of Object.entries(meal.meal)) {
        if (key.includes("strIngredient") && value) {
          ingrediants.push(value);
        }
        if (key.includes("strMeasure") && value) {
          measurements.push(value);
        }
      }
      ingrediants.forEach((value, index) => {
        const value2 = measurements[index];
        temp.push(`${value} - ${value2}`);
      });
      setList(temp);
    }
  }, [meal]);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 360,
        mb: 5,
      }}
    >
      <Typography variant="h4" paragraph>
        Ingrediants
      </Typography>
      <nav aria-label="main ingrediants list">
        <List>
          {list.map((ingrediant, index) => (
            <ListItem key={ingrediant + index}>
              <ListItemText primary={ingrediant} />
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
};

export default function Meal() {
  const [meal, setMeal] = useState({});

  useEffect(() => {
    let active = true;
    let mealId;

    if (window !== undefined) {
      mealId = window.location.pathname.split("/")[2];
    }

    const getMealById = async () => {
      try {
        const response = await axios.get(
          `/api/mealdb?type=getRecipeById&id=${mealId}`
        );
        setMeal(response.data.meals[0]);
      } catch (error) {
        console.log(error);
      }
    };

    if (active) {
      getMealById();
    }

    return () => {
      active = false;
    };
  }, []);

  return (
    <Container className="container">
      <Container className="secondaryMain">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <img src={`${meal.strMealThumb}`} alt="meal" width="100%" />
            <Grid container>
              <Grid item xs={8}>
                <Typography variant="subtitle2" component="h6" sx={{ marginTop: "0.3em" }}>
                  {meal.strMeal}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <IconButton
                  sx={{ float: "right" }}
                  aria-label="add to favorites"
                  title="add to favorites"
                >
                  <Favorite />
                </IconButton>
                <IconButton
                  aria-label="share"
                  title="share"
                  sx={{ float: "right" }}
                >
                  <Share />
                </IconButton>
              </Grid>
            </Grid>

            <Typography variant="h4" paragraph sx={{ mt: 2 }}>
              Instructions
            </Typography>
            <Typography paragraph>{meal.strInstructions}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <IngrediantsList meal={meal} />
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}
