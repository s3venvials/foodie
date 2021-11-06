import React, { useState } from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Backdrop from "../components/Backdrop";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({ meal }) {
  const [session] = useSession();
  const [expanded, setExpanded] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const router = useRouter();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
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

        {meal.strInstructions && (
          <CardContent>
            <Typography variant="body2" color="text.secondary" noWrap>
              {meal.strInstructions ?? ""}
            </Typography>
          </CardContent>
        )}

        <CardActions disableSpacing>
          {meal.strInstructions && (
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          )}
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>{meal.strInstructions ?? ""}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}
