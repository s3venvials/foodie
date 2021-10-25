import { getRandom, getById } from "../../../services";

export default async function handler(req, res) {
  const { type, id } = req.query;

  switch (type) {
    case "getRandomRecipe":
        await getRandom(req, res);
      break;
    case "getRecipeById":
        await getById(req, res, id);
      break;
    default:
      break;
  }
}
