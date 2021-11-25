import React, { useState, useEffect } from "react";
import { getSession, useSession, signin } from "next-auth/client";
import { useRouter } from "next/router";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Grid,
  Button,
  Paper,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import BoxList from "../../components/BoxList";
import SimpleAccordion from "../../components/Accordion";
import PopUpMsg from "../../components/PopUpMsg";
import styles from "../../styles/Home.module.css";
const sha1 = require("sha1");

export default function AddRecipe() {
  const [session] = useSession();
  const { query, push } = useRouter();
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [file, setFile] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [measurement, setMeasurement] = useState("");
  const [loading, setLoading] = useState(false);
  const [openMsg, setOpenMsg] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
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
      required: query.type === "edit" ? false : true,
      type: "file",
      message:
        query.type === "edit"
          ? "Add a new image to replace or leave blank to use the existing."
          : "",
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

  useEffect(() => {
    let isActive = true;
    const getRecipe = async () => {
      try {
        const session = await getSession();
        if (!session) {
          push("/auth/signin");
        }
        const res = await axios.get(
          `/api/mongodb?type=getRecipeById&id=${query.idMeal}&user=${session.user.id}`
        );
        if (res.data) {
          const meal = res.data.meals[0];
          if (isActive) {
            const {
              idMeal,
              strMeal,
              strArea,
              strCategory,
              strInstructions,
              ingredients,
              public_id,
              strYoutube,
              strMealThumb,
            } = meal;
            setState({
              idMeal,
              strMeal,
              strArea,
              strCategory,
              strArea,
              strInstructions,
              ingredients,
              public_id,
              strYoutube,
              strMealThumb,
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (query.idMeal && query.type === "edit") {
      getRecipe();
    }
    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    let isActive = true;
    const getAreas = async () => {
      try {
        const res = await axios.get("/api/mealdb?type=getAreas");
        if (res.status === 200 && res.data && isActive) {
          setAreas(res.data.meals);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAreas();
    return () => {
      isActive = false;
    }
  }, []);

  useEffect(() => {
    let isActive = true;
    const getCategories = async () => {
      try {
        const res = await axios.get("/api/mealdb?type=getCategories");
        if (res.status === 200 && res.data && isActive) {
          setCategories(res.data.categories);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
    return () => {
      isActive = false;
    }
  }, []);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const recipe = state;
      const session = await getSession();
      const formData = new FormData();
      if (session) {
        setLoading(true);
        if (query.type === "edit") {
          if (file) {
            // delete old file
            const d = new Date().getTime() / 1000;
            const sha = sha1(
              `public_id=${state.public_id}&timestamp=${d}${process.env.NEXT_PUBLIC_CLOUDINARY_SECRET}`
            );
            await axios.post(
              "https://api.cloudinary.com/v1_1/frontndev/image/destroy",
              {
                public_id: state.public_id,
                timestamp: d,
                signature: sha,
                api_key: process.env.NEXT_PUBLIC_CLOUDINARY_ID,
              }
            );
            // add new file
            formData.append("file", file.file);
            formData.append("upload_preset", "foodie");
            setLoading(true);
            const result = await axios.post(
              "https://api.cloudinary.com/v1_1/frontndev/image/upload",
              formData
            );
            if (result.data) {
              recipe.strMealThumb = result.data.secure_url;
              recipe.public_id = result.data.public_id;
            }
          }
          await axios.post("/api/mongodb?type=editRecipe", {
            recipe,
            id: session.user.id,
          });
        } else {
          formData.append("file", file.file);
          formData.append("upload_preset", "foodie");
          const result = await axios.post(
            "https://api.cloudinary.com/v1_1/frontndev/image/upload",
            formData
          );
          if (result.data) {
            recipe.strMealThumb = result.data.secure_url;
            recipe.public_id = result.data.public_id;
          }
          await axios.post("/api/mongodb?type=createRecipe", {
            recipe,
            id: session.user.id,
          });

          setState({
            strMeal: "",
            strArea: "",
            strCategory: "",
            strYoutube: "",
            strInstructions: "",
          });
        }
      }

      setLoading(false);
      setSeverity("success");
      setMessage(query.type === "edit" ? "Recipe Edited!" : "Recipe Added!");
      setOpenMsg(true);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleFile = (event) => {
    const { name, files } = event.target;
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
    setSeverity("success");
    setMessage("Ingredient Added!");
    setOpenMsg(true);
  };

  const handleDelete = (index) => {
    const temp = [...state.ingredients];
    temp.splice(index, 1);

    setState((prevState) => ({
      ...prevState,
      ingredients: temp,
    }));

    setMessage("Ingredient Deleted!");
    setSeverity("error");
    setOpenMsg(true);
  };

  useEffect(() => {
    if (!session) {
      signin();
    }
  }, [session]);

  return (
    <Container className={styles.container}>
      <Container className={styles.main}>
        {session && (
          <Paper sx={{ p: 3 }}>
            <Typography
              variant="h4"
              gutterBottom
              textAlign="center"
              sx={{ fontWeight: "bold" }}
            >
              {query.type ? "Edit Recipe" : "Add Recipe"}
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {formSchema.map((field) => (
                  <Grid item xs={12} sm={field.sm} key={field.id}>
                    {field.message && (
                      <Typography
                        variant="body1"
                        color="primary"
                        gutterBottom
                        sx={{ fontWeight: "bold" }}
                      >
                        {field.message}{" "}
                      </Typography>
                    )}
                    <TextField
                      size="small"
                      fullWidth
                      label={field.label}
                      name={field.name}
                      value={
                        field.name === "file" ? file.value : state[field.value]
                      }
                      multiline={field.multiline}
                      rows={field.rows}
                      select={field.select}
                      required={field.required}
                      onChange={
                        field.name === "file" ? handleFile : handleChange
                      }
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
                  <Button
                    type="submit"
                    variant={loading ? "outlined" : "contained"}
                    fullWidth
                  >
                    {loading ? (
                      <CircularProgress color="inherit" size={24} />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </form>
            <PopUpMsg
              open={openMsg}
              severity={severity}
              message={message}
              setOpen={(value) => setOpenMsg(value)}
            />
          </Paper>
        )}
      </Container>
    </Container>
  );
}
