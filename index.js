const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

const COC_API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjE4ZjMyM2VhLWI0MWItNDNjZS1iZjBkLTAzZTY3MzE3MzdiNCIsImlhdCI6MTc4OTA1MjE2Nywic3ViIjoiZGV2ZWxvcGVyL2Q0MWYyMTljLTFkNjgtNGRmNi1iNDVmLThkNjA3NzgzMWIxMiIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjc0LjIyMC40OS4xOCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.SeZh_Vf15iC0V5PM0THP_MvhfsN6aV2cVl1i7bkVNy6WHT5tanMGuSIdFUtWfvIKHnrEdRkYQSINMCq_Fbm_LQ";
const BASE_URL = "https://api.clashofclans.com/v1";

// طباعة الـ IP للتأكد
async function logServerIP() {
  try {
    const ipRes = await axios.get("https://api.ipify.org?format=json");
    console.log("MY_RENDER_SERVER_IP: ", ipRes.data.ip);
  } catch (e) {
    console.log("Could not fetch IP");
  }
}
logServerIP();

// استخدام مسار مباشر بدلاً من الـ Query لضمان وصول الـ # أو %23 بشكل سليم
app.get("/api/*", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  // استخراج المسار الذي بعد /api/
  const endpoint = req.params[0];
  if (!endpoint) {
    return res.status(400).json({ error: "Endpoint parameter is required" });
  }

  try {
    const targetUrl = `${BASE_URL}/${endpoint}`;
    console.log("Fetching from Supercell:", targetUrl);

    const response = await axios.get(targetUrl, {
      headers: {
        Authorization: `Bearer ${COC_API_KEY}`,
        Accept: "application/json",
      },
    });
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Supercell Error Response:", error.response ? error.response.data : error.message);
    const statusCode = error.response ? error.response.status : 500;
    const errorData = error.response ? error.response.data : { message: error.message };
    return res.status(statusCode).json(errorData);
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
