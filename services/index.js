import axios from "axios";
import axiosThrottle from 'axios-request-throttle';

axiosThrottle.use(axios, { requestsPerSecond: 25 });

const BASE_URL = `https://www.themealdb.com/api/json/v2/${process.env.NEXT_PUBLIC_MD_KEY}`;

// https://www.themealdb.com/api.php

export const getRandom = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/randomselection.php`);
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

export const getByIngredient = async (req, res, ingredient) => {
  try {
    const response = await axios.get(`${BASE_URL}/filter.php?i=${ingredient}`);
    if (response.status === 200) {
      return res.status(200).json(response.data);
    }
    return res.status(403).json({ message: "failed to make request" });
  } catch (error) {
    console.log(error);
  }
};
