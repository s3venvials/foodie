import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Box,
  Skeleton,
  IconButton,
  Paper,
  Checkbox,
} from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
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
        mb: 5,
      }}
    >
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h4" paragraph textAlign="center">
          Ingredients
        </Typography>
        <nav aria-label="main ingrediants list">
          <List>
            {list.map((ingrediant, index) => (
              <Fragment key={ingrediant + index}>
                <ListItem divider>
                  <ListItemText primary={ingrediant} />
                  <ListItemIcon>
                    <Checkbox />
                  </ListItemIcon>
                </ListItem>
              </Fragment>
            ))}
          </List>
        </nav>
      </Paper>
    </Box>
  );
};

export default function Meal() {
  const [meal, setMeal] = useState({});
  const [loaded, setLoaded] = useState(true);
  const URL = "https://www.foodiecuisines.com";

  useEffect(() => {
    let isActive = true;
    let idMeal;

    if (window !== undefined) {
      idMeal = window.location.pathname.split("/")[2];
    }

    const getMealById = async () => {
      try {
        setLoaded(false);

        let response = await axios.get(
          `/api/mealdb?type=getRecipeById&id=${idMeal}`
        );

        if (response.data.meals === null) {
          response = await axios.get(
            `/api/mongodb?type=getRecipeById&id=${idMeal}`
          );
        }

        if (isActive) {
          setLoaded(true);
          setMeal(response.data.meals[0] ?? []);
        }
      } catch (error) {
        if (isActive) setMeal([]);
      }
    };

    if (isActive) {
      getMealById();
    }

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <Container className="container">
      <Container className="secondaryMain">
        <Grid container spacing={1}>
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
                    {meal.strYoutube && (
                      <IconButton
                        title="View Recipe On YouTube"
                        style={{ float: "right" }}
                        onClick={() =>
                          window.open(`${meal.strYoutube}`) ||
                          window.location.replace(`${meal.strYoutube}`)
                        }
                      >
                        <YouTubeIcon color="error" fontSize="medium" />
                      </IconButton>
                    )}
                    <FavIcon
                      meal={meal}
                      style={{ float: "right" }}
                      title="Add To Favorites"
                    />

                    <ShareButton
                      url={`${URL}/meal/${meal.idMeal}`}
                      iconSize={23}
                      quote="Check out this amazing recipe!"
                      style={{ float: "right", marginTop: "0.5em" }}
                    />
                  </Grid>
                </Grid>

                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="h4" paragraph>
                    Instructions
                  </Typography>
                  <Typography paragraph>{meal.strInstructions}</Typography>
                </Paper>
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
