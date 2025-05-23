const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.set("trust proxy", true);

app.get("/", async (req, res) => {
  const ip = req.ip;

  const msg = `🚨 New Visitor IP: ${ip}`;
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(msg)}`;

  await fetch(url);

  res.send("<h1>Hello!</h1><p>Your IP has been logged.</p>");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
