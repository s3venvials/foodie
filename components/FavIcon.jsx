import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/client";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function FavIcon({ meal, style, title }) {
  const [session] = useSession();
  const [favorites, setFavorites] = useState([]);
  const [color, setColor] = useState("grey");

  const addToFavorite = async (mealObj) => {
    const { idMeal, strMeal } = mealObj;
    try {
      const res = await axios.post("/api/mongodb?type=addFavoriteRecipe", {
        id: session.user.email,
        idMeal,
        strMeal,
      });
      setFavorites([...res.data.favorites]);
      if (res.data.action === "remove") {
        setColor("grey");
      }
      if (res.data.action === "add") {
        setColor("red");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getFavs = async () => {
      try {
        const res = await axios.get(
          `/api/mongodb?type=getAllFavRecipes&id=${session.user.email}`
        );
        res.data.map((fav) => {
          if (fav.idMeal === meal.idMeal) {
            setColor("red");
          }
          return fav;
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (session) {
      getFavs();
    }
  }, [meal, favorites]);

  return (
    <>
      {session ? (
        <IconButton
          aria-label="add to favorites"
          onClick={() => addToFavorite(meal)}
          sx={style}
          title={title}
        >
          <FavoriteIcon sx={{ color }} />
        </IconButton>
      ) : (
        <div></div>
      )}
    </>
  );
}
