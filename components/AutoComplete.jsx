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
    let active = true;

    const getRecipes = async () => {
      try {
        const res = await axios.get(
          `/api/mealdb?type=getByIngredient&ingredient=${inputValue}`
        );

        if (res.status === 200 && res.data) {
          if (res.data.meals?.length > 0) {
            setRecipes([...res.data.meals]);
            return;
          }
        }
        setRecipes([]);
      } catch (error) {
        console.log(error);
      }
    };

    if (inputValue !== "" && active) {
      getRecipes();
    }

    return () => {
      active = false;
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
          <TextField {...params} label="Search by ingredient" />
        )}
      />
    </>
  );
}
