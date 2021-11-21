import {
  getRandoms,
  getById,
  getByIngredient,
  getCategories,
  getCategoryByName,
  getSingleRandom,
  getAreas,
} from "../../../services/mealdb";

export default async function handler(req, res) {
  const { type, id, ingredient, category, source, user } = req.query;

  switch (type) {
    case "getRandomRecipes":
      await getRandoms(req, res);
      break;
    case "getSingleRandom":
      await getSingleRandom(req, res);
      break;
    case "getRecipeById":
      await getById(req, res, id, source, user);
      break;
    case "getByIngredient":
      await getByIngredient(req, res, ingredient);
      break;
    case "getCategories":
      await getCategories(req, res);
      break;
    case "getCategoryByName":
      await getCategoryByName(req, res, category);
      break;
    case "getAreas":
      await getAreas(req, res);
      break;
    default:
      break;
  }
}
