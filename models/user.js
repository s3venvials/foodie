import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  image: String,
  emailVerified: Boolean,
  createdAt: Date,
  updatedAt: Date,
  favorites: [
    {
      idMeal: String,
      strMeal: String,
    }
  ],
  recipes: [
    {
      idMeal: String,
      public_id: String,
      strMeal: String,
      strArea: String,
      strCategory: String,
      strYoutube: String,
      strMealThumb: String,
      strInstructions: String,
      strIngredient1: String,
      strIngredient2: String,
      strIngredient3: String,
      strIngredient4: String,
      strIngredient5: String,
      strIngredient6: String,
      strIngredient7: String,
      strIngredient8: String,
      strIngredient9: String,
      strIngredient10: String,
      strIngredient11: String,
      strIngredient12: String,
      strIngredient13: String,
      strIngredient14: String,
      strIngredient15: String,
      strIngredient16: String,
      strIngredient17: String,
      strIngredient18: String,
      strIngredient19: String,
      strIngredient20: String,
      strMeasure1: String,
      strMeasure2: String,
      strMeasure3: String,
      strMeasure4: String,
      strMeasure5: String,
      strMeasure6: String,
      strMeasure7: String,
      strMeasure8: String,
      strMeasure9: String,
      strMeasure10: String,
      strMeasure11: String,
      strMeasure12: String,
      strMeasure13: String,
      strMeasure14: String,
      strMeasure15: String,
      strMeasure16: String,
      strMeasure17: String,
      strMeasure18: String,
      strMeasure19: String,
      strMeasure20: String,
    }
  ],
});

export default mongoose.models.users || mongoose.model('users', UserSchema);