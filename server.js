import express from "express";
import fetch from "node-fetch";

const app = express();

app.use(express.json());

// 🔑 BOT TOKEN
const BOT_TOKEN = "8650238704:AAEE4KSVTDBI-31LniTL212I_1P9bNghrGo";

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("Bot Running 🚀");
});

// 🤖 Telegram Webhook
app.post(`/bot${BOT_TOKEN}`, async (req, res) => {

  const msg = req.body.message;

  if (!msg) return res.sendStatus(200);

  const chatId = msg.chat.id;
  const text = msg.text;

  // /start
  if (text === "/start") {

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: "Welcome 👋\n\nBot Connected Successfully ✅"
      })
    });

  }

  res.sendStatus(200);
});

// 🚀 Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Running 🚀");
});
