import { getUserByEmail } from "../../../services/mongodb";

export default async function handler(req, res) {
  const { type, id } = req.query;

  switch (type) {
    case "getUserByEmail":
      await getUserByEmail(req, res, id);
      break;
    default:
      break;
  }
}
