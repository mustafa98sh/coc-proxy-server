const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// ضع مفتاح كلاش أوف كلانس الخاص بك هنا
const COC_API_KEY = "ضع_مفتاح_API_الخاص_بك_هنا";
const BASE_URL = "https://api.clashofclans.com/v1";

app.get("/", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  const endpoint = req.query.endpoint;
  if (!endpoint) {
    return res.status(400).json({ error: "Endpoint parameter is required" });
  }

  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${COC_API_KEY}`,
        Accept: "application/json",
      },
    });
    return res.status(200).json(response.data);
  } catch (error) {
    const statusCode = error.response ? error.response.status : 500;
    const errorData = error.response ? error.response.data : { message: error.message };
    return res.status(statusCode).json(errorData);
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});