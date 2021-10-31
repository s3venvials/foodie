import React from "react";
import { Grid, Skeleton, Box } from "@mui/material";
import Card from "./Card";

export default function CardGrid({ meals, loaded }) {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
