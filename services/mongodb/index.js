import { dbConnect } from "../../lib/dbConnect";
import user from "../../models/user";

export const getUserByEmail = async (req, res, email) => {
  const { method } = req;

  if (method !== "GET") {
    return;
  }

  try {
    await dbConnect();

    const foundUser = await user.find({ email });
    if (foundUser) {
      return res.status(200).json(foundUser);
    }
    return res.status(204).json({ message: "user not found" });
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};

export const addFavoriteRecipe = async (req, res) => {
  const { method } = req;

  if (method !== "POST") {
    return;
  }

  const { id, idMeal, strMeal } = req.body;

  try {
    await dbConnect();

    const _user = await user.findOne({ email: id });
    let document;
    let action;

    if (_user) {
      const favExist = _user.favorites?.find((f) => f.idMeal === idMeal);

      if (favExist) {
        document = await user.findOneAndUpdate(
          { email: id },
          { $pull: { favorites: { idMeal } } },
          { returnOriginal: false }
        );
        action = "remove";
      } else {
        document = await user.findOneAndUpdate(
          { email: id },
          {
            $push: { favorites: { idMeal, strMeal } },
            $currentDate: { lastModified: true },
          },
          { returnOriginal: false }
        );
        action = "add";
      }
    }

    return res.status(200).json({ favorites: document.favorites, action });
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};

export const getAllFavRecipes = async (req, res, id) => {
  const { method } = req;

  if (method !== "GET") {
    return;
  }

  try {
    await dbConnect();

    const _user = await user.findOne({ email: id });

    if (_user && _user.favorites && _user.favorites.length > 0) {
      return res.status(200).json(_user.favorites);
    }

    return res.status(200).json([]);
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};
