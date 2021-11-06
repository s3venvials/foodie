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
});

export default mongoose.models.users || mongoose.model('users', UserSchema);