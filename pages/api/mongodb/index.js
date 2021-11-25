import {
  getUserById,
  addFavoriteRecipe,
  getAllFavRecipes,
  deleteUserAccount,
  createRecipe,
  getById,
  deleteRecipe,
  editRecipe,
} from "../../../services/mongodb";

export default async function handler(req, res) {
  const { type, id, user } = req.query;

  switch (type) {
    case "getUserById":
      await getUserById(req, res, id);
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
    case "createRecipe":
      await createRecipe(req, res);
      break;
    case "getRecipeById":
      await getById(req, res, id);
      break;
    case "deleteRecipe":
      await deleteRecipe(req, res, id, user);
      break;
    case "editRecipe":
      await editRecipe(req, res);
    default:
      break;
  }
}
