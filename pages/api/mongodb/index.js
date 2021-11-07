import {
  getUserByEmail,
  addFavoriteRecipe,
  getAllFavRecipes,
  deleteUserAccount,
} from "../../../services/mongodb";

export default async function handler(req, res) {
  const { type, id } = req.query;

  switch (type) {
    case "getUserByEmail":
      await getUserByEmail(req, res, id);
      break;
    case "addFavoriteRecipe":
      await addFavoriteRecipe(req, res);
      break;
    case "getAllFavRecipes":
      await getAllFavRecipes(req, res, id);
      break;
    case "deleteUserAccount":
      await deleteUserAccount(req, res, id);
      break;
    default:
      break;
  }
}
