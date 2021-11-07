import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Skeleton,
} from "@mui/material";
import FavIcon from "../../components/FavIcon";
import ShareButton from "../../components/ShareButton";

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
        Ingredients
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
  const [loaded, setLoaded] = useState(true);
  const URL = "https://www.foodiecuisines.com";

  useEffect(() => {
    let active = true;
    let mealId;

    if (window !== undefined) {
      mealId = window.location.pathname.split("/")[2];
    }

    const getMealById = async () => {
      try {
        setLoaded(false);
        const response = await axios.get(
          `/api/mealdb?type=getRecipeById&id=${mealId}`
        );
        setLoaded(true);
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
        <Grid container spacing={3}>
          {loaded ? (
            <>
              <Grid item xs={12} md={6}>
                <img src={`${meal.strMealThumb}`} alt="meal" width="100%" />
                <Grid container>
                  <Grid item xs={8}>
                    <Typography
                      variant="subtitle2"
                      component="h6"
                      sx={{ marginTop: "0.3em" }}
                    >
                      {meal.strMeal}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <FavIcon
                      meal={meal}
                      style={{ float: "right" }}
                      title="add to favorites"
                    />
                    <ShareButton
                      url={`${URL}/meal/${meal.idMeal}`}
                      style={{ float: "right", marginTop: "0.5em" }}
                      iconSize={23}
                      quote="Check out this amazing recipe!"
                    />
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
            </>
          ) : (
            <>
              <Grid item xs={12} md={6}>
                <Box>
                  <Skeleton variant="rectangular" height={675} />
                  <Skeleton />
                  <Skeleton width="60%" />
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box>
                  <Skeleton variant="rectangular" height={675} />
                  <Skeleton />
                  <Skeleton width="60%" />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Skeleton variant="rectangular" height={375} />
                  <Skeleton />
                  <Skeleton width="60%" />
                </Box>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </Container>
  );
}
