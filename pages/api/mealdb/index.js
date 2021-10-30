import { getRandom, getById, getByIngredient } from "../../../services";

export default async function handler(req, res) {
  const { type, id, ingredient } = req.query;

  switch (type) {
    case "getRandomRecipe":
        await getRandom(req, res);
      break;
    case "getRecipeById":
        await getById(req, res, id);
      break;
    case "getByIngredient":
        await getByIngredient(req, res, ingredient);
    default:
      break;
  }
}
