import React, { useState } from "react";
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
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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

export default function RecipeReviewCard(meal) {
  const [expanded, setExpanded] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const router = useRouter();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleNavToRecipe = () => {
    setShowBackdrop(true);
    router.push(`/meal/${meal.meal.idMeal}`);
  }

  return (
    <>
    <Backdrop isVisible={showBackdrop} />
    <Card sx={{ maxWidth: 345 }} className="customCard">
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {meal.meal.strCategory.charAt(0)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={meal.meal.strMeal}
          subheader={meal.meal.strArea}
        />
        <CardMedia
          component="img"
          height="194"
          image={meal.meal.strMealThumb}
          alt="Paella dish"
          onClick={handleNavToRecipe}
        />
      <CardContent>
        <Typography variant="body2" color="text.secondary" noWrap>
          {meal.meal.strInstructions}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>{meal.meal.strInstructions}</Typography>
        </CardContent>
      </Collapse>
    </Card>
    </>
  );
}
