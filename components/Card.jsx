import React, { useState } from "react";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import Backdrop from "../components/Backdrop";
import Button from "@mui/material/Button";

export default function RecipeReviewCard({ meal }) {
  const [showBackdrop, setShowBackdrop] = useState(false);
  const router = useRouter();

  const handleNavToRecipe = () => {
    setShowBackdrop(true);
    router.push(`/meal/${meal.idMeal}`);
  };

  return (
    <>
      <Backdrop isVisible={showBackdrop} />
      <Card sx={{ maxWidth: 345 }} className="customCard">
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" title={meal.strCategory}>
              {meal.strCategory?.charAt(0) ?? meal.strMeal.charAt(0)}
            </Avatar>
          }
          title={meal.strMeal}
          subheader={meal.strArea ?? ""}
        />
        <CardMedia
          component="img"
          height="194"
          image={meal.strMealThumb}
          alt="Paella dish"
          onClick={handleNavToRecipe}
        />

        <CardActions disableSpacing>
          <Button variant="text" onClick={() => router.push(`/meal/${meal.idMeal}`)}>View</Button>
        </CardActions>
      </Card>
    </>
  );
}
