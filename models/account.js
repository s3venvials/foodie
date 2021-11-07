import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  compoundId: String,
  userId: mongoose.Schema.Types.ObjectId,
  providerType: String,
  providerId: String,
  providerAccountId: String,
});

export default mongoose.models.accounts || mongoose.model('accounts', AccountSchema);