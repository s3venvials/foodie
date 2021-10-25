import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// https://www.themealdb.com/api.php

export const getRandom = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/random.php`);
    if (response.status === 200) {
      return res.status(200).json(response.data);
    }
    return res.status(403).json({ message: "failed to make request" });
  } catch (error) {
    console.log(error);
  }
};

export const getById = async (req, res, id) => {
  try {
    const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
    if (response.status === 200) {
      return res.status(200).json(response.data);
    }
    return res.status(403).json({ message: "failed to make request" });
  } catch (error) {
    console.log(error);
  }
};
