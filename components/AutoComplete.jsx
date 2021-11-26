import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { TextField, Autocomplete } from "@mui/material";
import BackdropLoader from "./Backdrop";

export default function ComboBox() {
  const [recipes, setRecipes] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState("");
  const [showBackdrop, setShowBackdrop] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (value) {
      setShowBackdrop(true);
      router.push(`/meal/${value.idMeal}`);
      return;
    }
  }, [value]);

  useEffect(() => {
    let isActive = true;

    const getRecipes = async () => {
      try {
        const mealsA = await axios.get(
          `/api/mealdb?type=getByIngredient&ingredient=${inputValue}`
        );
        const mealsB = await axios.get(
          `/api/mongodb?type=searchByIngredient&ingredient=${inputValue}`
        );

        let temp = [];
        if (mealsA.status === 200 && mealsA.data) {
          if (mealsA.data.meals !== null) {
            temp = mealsA.data.meals.concat(mealsB.data.meals);
          } else {
            temp = mealsB.data.meals;
          }
          const assortedArr = temp.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
          if (temp.length > 0 && isActive) {
            setRecipes(assortedArr);
            return;
          }
        }
      } catch (error) {
        setRecipes([]);
      }
    };

    if (inputValue !== "") {
      getRecipes();
    }

    return () => {
      isActive = false;
    };
  }, [inputValue]);

  return (
    <>
      <BackdropLoader isVisible={showBackdrop} />
      <Autocomplete
        disablePortal
        id="searchRecipeIngredientsField"
        options={recipes}
        getOptionLabel={(recipe) => recipe.strMeal || ""}
        filterOptions={(x) => x}
        sx={{ mt: 5, mb: 2 }}
        value={value ?? ""}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue ?? ""}
        onInputChange={(event, inputValue) => {
          setInputValue(inputValue);
        }}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search by ingredients"
            placeholder="e.g chicken,garlic,salt"
          />
        )}
      />
    </>
  );
}
