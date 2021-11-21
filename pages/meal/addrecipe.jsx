import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/client";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Grid,
  Button,
  Paper,
  MenuItem,
} from "@mui/material";
import BoxList from "../../components/BoxList";
import SimpleAccordion from "../../components/Accordion";
import styles from "../../styles/Home.module.css";

const formSchema = [
  {
    id: 0,
    label: "Recipe Name",
    name: "strMeal",
    value: "strMeal",
    sm: 6,
    required: true,
  },
  {
    id: 1,
    label: "Recipe Area",
    select: true,
    name: "strArea",
    value: "strArea",
    sm: 6,
    required: true,
  },
  {
    id: 2,
    label: "Recipe Category",
    select: true,
    name: "strCategory",
    value: "strCategory",
    sm: 6,
    required: true,
  },
  {
    id: 3,
    label: "YouTube Media Link",
    name: "strYoutube",
    value: "strYoutube",
    sm: 6,
    required: false,
  },
  {
    id: 4,
    name: "file",
    value: "file",
    sm: 12,
    required: true,
    type: "file",
  },
  {
    id: 5,
    label: "Instructions",
    name: "strInstructions",
    value: "strInstructions",
    multiline: true,
    rows: 10,
    sm: 12,
    required: true,
  },
];

export default function AddRecipe() {
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [file, setFile] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [measurement, setMeasurement] = useState("");
  const [state, setState] = useState({
    idMeal: "",
    strMeal: "",
    strArea: "",
    strCategory: "",
    strYoutube: "",
    strMealThumb: "",
    strInstructions: "",
    ingredients: [],
    public_id: "",
  });

  useEffect(() => {
    const getAreas = async () => {
      try {
        const res = await axios.get("/api/mealdb?type=getAreas");
        if (res.status === 200 && res.data) {
          setAreas(res.data.meals);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAreas();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get("/api/mealdb?type=getCategories");
        if (res.status === 200 && res.data) {
          setCategories(res.data.categories);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const recipe = state;
    const session = await getSession();
    const formData = new FormData();
    if (session) {
      formData.append("file", file.file);
      formData.append("upload_preset", "foodie");
      const result = await axios.post(
        "https://api.cloudinary.com/v1_1/frontndev/image/upload",
        formData
      );
      if (result.data) {
        console.log(result);
        recipe.strMealThumb = result.data.secure_url;
        recipe.public_id = result.data.public_id;
      }
      console.log(recipe);
      const res = await axios.post("/api/mongodb?type=createRecipe", {
        recipe,
        id: session.user.email,
      });
    }

    setFile("");
    setState({
      strMeal: "",
      strArea: "",
      strCategory: "",
      strYoutube: "",
      strInstructions: "",
    });
  };

  const handleFile = (event) => {
    const { name, files, value } = event.target;
    setFile((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleIngredients = (i, m) => {
    if (!i || !m) return;

    const newIngredient = `${i} - ${m}`;

    setState((prevState) => ({
      ...prevState,
      ingredients: [...prevState.ingredients, newIngredient],
    }));

    setIngredient("");
    setMeasurement("");
  };

  const handleDelete = (index) => {
    const temp = [...state.ingredients];
    temp.splice(index, 1);
    
    setState((prevState) => ({
      ...prevState,
      ingredients: temp,
    }));
  };

  return (
    <Container className={styles.container}>
      <Container className={styles.main}>
        <Paper sx={{ p: 3 }}>
          <Typography
            variant="h4"
            gutterBottom
            textAlign="center"
            sx={{ fontWeight: "bold" }}
          >
            Add Recipe
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {formSchema.map((field) => (
                <Grid item xs={12} sm={field.sm} key={field.id}>
                  <TextField
                    size="small"
                    fullWidth
                    label={field.label}
                    name={field.name}
                    value={
                      field.name === "file" ? file.name : state[field.value]
                    }
                    multiline={field.multiline}
                    rows={field.rows}
                    select={field.select}
                    required={field.required}
                    onChange={field.name === "file" ? handleFile : handleChange}
                    type={field.type}
                  >
                    {field.name === "strCategory" &&
                      categories.map((c) => (
                        <MenuItem key={c.idCategory} value={c.strCategory}>
                          {c.strCategory}
                        </MenuItem>
                      ))}
                    {field.name === "strArea" &&
                      areas.map((a) => (
                        <MenuItem key={a.strArea} value={a.strArea}>
                          {a.strArea}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>
              ))}
              <Grid item xs={12} sm={4} lg={5}>
                <TextField
                  size="small"
                  fullWidth
                  label="Ingredient"
                  value={ingredient}
                  name="ingredient"
                  onChange={(e) => setIngredient(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4} lg={5}>
                <TextField
                  size="small"
                  fullWidth
                  label="Measurement"
                  value={measurement}
                  name="measurement"
                  onChange={(e) => setMeasurement(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4} lg={2}>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  onClick={() => handleIngredients(ingredient, measurement)}
                >
                  Add Ingredient
                </Button>
              </Grid>
              <Grid item xs={12} sm={4} lg={5}>
                <SimpleAccordion title="Ingredients">
                  <BoxList data={state.ingredients} onDelete={handleDelete} />
                </SimpleAccordion>
              </Grid>
              <Grid item xs={12} sm={4} lg={2}>
                <Button type="submit" variant="contained" fullWidth>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Container>
  );
}
