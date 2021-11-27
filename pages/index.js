import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import axios from "axios";
import { Container, Typography, Button, Box } from "@mui/material";
import styles from "../styles/Home.module.css";

import CardGrid from "../components/CardGrid";
import AutoComplete from "../components/AutoComplete";
import FoodCategories from "../components/FoodCategories";

export default function Home() {
  const [meals, setMeals] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { push } = useRouter();
  const [session] = useSession();

  useEffect(() => {
    const getRandomRecipes = async () => {
      try {
        setLoaded(false);
        if (JSON.parse(sessionStorage.getItem("meals"))) {
          const cacheMeals = JSON.parse(sessionStorage.getItem("meals"));
          setMeals([...cacheMeals]);
          setLoaded(true);
          return;
        }
        const response = await axios.get("/api/mealdb?type=getRandomRecipes");
        setMeals([...response.data.meals.slice(0, 9)]);
        sessionStorage.setItem(
          "meals",
          JSON.stringify([...response.data.meals.slice(0, 9)])
        );
        setLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    getRandomRecipes();
  }, []);

  return (
    <Container className={styles.container}>
      <Container className={styles.main}>
        <Typography
          variant="h3"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold" }}
        >
          Welcome to
          <Typography variant="span" color="primary">
            {" "}
            Foodie Cuisines!
          </Typography>
        </Typography>

        <Typography variant="h5" gutterBottom align="center">
          Browse recipes from all over the world, get inspired and create and
          share your own!
        </Typography>

        {!session && (
          <Box textAlign="center" sx={{ mt: 2 }}>
            <Button
              onClick={() =>
                push(
                  `/auth/signup?callbackUrl=${process.env.NEXT_PUBLIC_BASE_URL}`
                )
              }
              variant="contained"
              size="large"
            >
              Add Your Recipe
            </Button>
          </Box>
        )}

        <AutoComplete />
        <FoodCategories />

        <CardGrid meals={meals} loaded={loaded} />
      </Container>
    </Container>
  );
}
