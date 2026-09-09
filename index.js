const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// ضع مفتاح كلاش الجديد المربوط بالـ IP أو المفتاح العام هنا
const COC_API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjBkNzMzODg5LWU0ZmEtNDhjZC1iZGUyLWMwNzNhODI5MjhiNiIsImlhdCI6MTc4ODk4NDcxOCwic3ViIjoiZGV2ZWxvcGVyL2Q0MWYyMTljLTFkNjgtNGRmNi1iNDVmLThkNjA3NzgzMWIxMiIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjEzNi4xMjQuMzMuMjMyIl0sInR5cGUiOiJjbGllbnQifV19.wmCOgsxrFaodHeAfZm1wgG0-3YFmmXqDVF7rPeVTbQiIIoqXnTlHXVpW5ZwJXBc42fDoeJ6GRaMs15tk8zQ90g";
const BASE_URL = "https://api.clashofclans.com/v1";

app.get("/", async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

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