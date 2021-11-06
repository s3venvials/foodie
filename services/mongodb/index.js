import { dbConnect } from "../../lib/dbConnect";
import user from "../../models/user";

export const getUserByEmail = async (req, res, email) => {
  try {
    await dbConnect();

    const foundUser = await user.find({ email });
    if (foundUser) {
      return res.status(200).json(foundUser);
    }
    return res.status(403).json({ message: "user not found" });
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};
