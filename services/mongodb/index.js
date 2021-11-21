import { dbConnect } from "../../lib/dbConnect";
import user from "../../models/user";
import account from "../../models/account";

export const getUserByEmail = async (req, res, email) => {
  const { method } = req;

  if (method !== "GET") {
    return res.status(405).json({ message: "failed" });
  }

  try {
    await dbConnect();

    const foundUser = await user.findOne({ email });
    if (foundUser) {
      return res.status(200).json(foundUser);
    }
    return res.status(204).json({ message: "user not found" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "There was an issue processing your request." });
  }
};

export const addFavoriteRecipe = async (req, res) => {
  const { method } = req;

  if (method !== "POST") {
    return res.status(405).json({ message: "failed" });
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
    return res
      .status(500)
      .json({ message: "There was an issue processing your request." });
  }
};

export const getAllFavRecipes = async (req, res, id) => {
  const { method } = req;

  if (method !== "GET") {
    return res.status(405).json({ message: "failed" });
  }

  try {
    await dbConnect();

    const _user = await user.findOne({ email: id });

    if (_user && _user.favorites && _user.favorites.length > 0) {
      return res.status(200).json(_user.favorites);
    }

    return res.status(200).json([]);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "There was an issue processing your request." });
  }
};

export const deleteUserAccount = async (req, res, id) => {
  try {
    const { method } = req;

    if (method !== "DELETE") {
      return res.status(405).json({ message: "failed" });
    }

    await dbConnect();

    const _user = await user.findOne({ email: id });
    const _account = await account.findOne({ userId: _user._id });

    if (_user && _account) {
      await user.deleteOne({ _id: _user._id });
      await account.deleteOne({ userId: _user._id });
      return res.status(200).json({ message: "success" });
    }

    return res.status(304).json({ message: "failed" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "There was an issue processing your request." });
  }
};

export const createRecipe = async (req, res) => {
  try {
    const { method, body } = req;
    const { recipe, id } = body;
    const { ingredients } = recipe;

    if (method !== "POST") {
      return res.status(405).json({ message: "failed" });
    }

    await dbConnect();

    const _user = await user.findOne({ email: id });

    ingredients.forEach((value, index) => {
      let ingredient = value.split("-")[0].trim();
      recipe[`strIngredient${index + 1}`] = ingredient;
    });

    ingredients.forEach((value, index) => {
      let measure = value.split("-")[1].trim();
      recipe[`strMeasure${index + 1}`] = measure;
    });

    const randomId = Math.floor(Math.random() * 90000) + 10000;
    recipe.idMeal = randomId.toString();

    if (_user) {
      await user.findOneAndUpdate(
        { email: id },
        {
          $push: { recipes: recipe },
        }
      );
    }

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "There was an issue processing your request." });
  }
};

export const getById = async (req, res, id, email) => {
  try {
    const { method } = req;

    if (method !== "GET") {
      return res.status(405).json({ message: "failed" });
    }

    await dbConnect();

    const _user = await user.findOne({ email });
    const found = _user.recipes.filter((r) => r.idMeal.toString() === id);
    return res.status(200).json({ meals: found });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "There was an issue processing your request." });
  }
};

export const deleteRecipe = async (req, res, idMeal, email) => {
  try {
    const { method } = req;

    if (method !== "PUT") {
      return res.status(405).json({ message: "failed" });
    }

    await dbConnect();
    await user.findOneAndUpdate(
      { email },
      { $pull: { recipes: { idMeal }, favorites: { idMeal } } }
    );

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "There was an issue processing your request." });
  }
};

export const editRecipe = async (req, res) => {
  try {
    const { method, body } = req;
    const { recipe, id } = body;
    const { ingredients, idMeal } = recipe;

    if (method !== "POST") {
      return res.status(405).json({ message: "failed" });
    }

    ingredients.forEach((value, index) => {
      let ingredient = value.split("-")[0].trim();
      recipe[`strIngredient${index + 1}`] = ingredient;
    });

    ingredients.forEach((value, index) => {
      let measure = value.split("-")[1].trim();
      recipe[`strMeasure${index + 1}`] = measure;
    });

    await dbConnect();
    await user.findOneAndUpdate({ email: id }, { $pull: { recipes: { idMeal } } });
    await user.findOneAndUpdate(
      { email: id },
      {
        $push: { recipes: recipe },
      }
    );

    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "There was an issue processing your request." });
  }
};
