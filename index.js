const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

const COC_API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjE4ZjMyM2VhLWI0MWItNDNjZS1iZjBkLTAzZTY3MzE3MzdiNCIsImlhdCI6MTc4OTA1MjE2Nywic3ViIjoiZGV2ZWxvcGVyL2Q0MWYyMTljLTFkNjgtNGRmNi1iNDVmLThkNjA3NzgzMWIxMiIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjc0LjIyMC40OS4xOCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.SeZh_Vf15iC0V5PM0THP_MvhfsN6aV2cVl1i7bkVNy6WHT5tanMGuSIdFUtWfvIKHnrEdRkYQSINMCq_Fbm_LQ";
const BASE_URL = "https://api.clashofclans.com/v1";

// مسار لجلب بيانات اللاعب
app.get("/player", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const tag = req.query.tag;
  if (!tag) return res.status(400).json({ error: "Tag is required" });

  try {
    const response = await axios.get(`${BASE_URL}/players/%23${tag}`, {
      headers: { Authorization: `Bearer ${COC_API_KEY}`, Accept: "application/json" }
    });
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    const statusCode = error.response ? error.response.status : 500;
    return res.status(statusCode).json(error.response ? error.response.data : { message: error.message });
  }
});

// مسار لجلب سجل المعارك
app.get("/battlelog", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const tag = req.query.tag;
  if (!tag) return res.status(400).json({ error: "Tag is required" });

  try {
    const response = await axios.get(`${BASE_URL}/players/%23${tag}/battlelog`, {
      headers: { Authorization: `Bearer ${COC_API_KEY}`, Accept: "application/json" }
    });
    return res.status(200).json(response.data);
  } catch (error) {
    const statusCode = error.response ? error.response.status : 500;
    return res.status(statusCode).json(error.response ? error.response.data : { message: error.message });
  }
});

// مسار لجلب سجل الدوريات
app.get("/leaguehistory", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const tag = req.query.tag;
  if (!tag) return res.status(400).json({ error: "Tag is required" });

  try {
    const response = await axios.get(`${BASE_URL}/players/%23${tag}/leaguehistory`, {
      headers: { Authorization: `Bearer ${COC_API_KEY}`, Accept: "application/json" }
    });
    return res.status(200).json(response.data);
  } catch (error) {
    const statusCode = error.response ? error.response.status : 500;
    return res.status(statusCode).json(error.response ? error.response.data : { message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
