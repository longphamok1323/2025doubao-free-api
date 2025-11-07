import axios from "axios";

// Configuration
const API_BASE = process.env.API_BASE || "http://127.0.0.1:8000";
const SESSION_ID = process.env.SESSION_ID || "4a7348990949f13ff78c17d7f090034c";
// Use external image URL to avoid base64 issues
const IMAGE_URL = process.env.IMAGE_URL ||
  "http://a.rdis.tssoft.top:15041/save/result/10down1-0.5384468772194603-[%20%20%20%20-33.833%20%20%20%20%20%208.4583]-[%20%20%20%20-67.667%20%20%20%20%20-21.146]-37fe1478e05f469aaa70f0dc02475ab8.jpg";

async function main() {
  const messages = [
    { role: "user", content: "你好，豆包！现在几点？" }
  ];

  const payload = { model: "doubao", messages, stream: false };
  const headers = {
    Authorization: `Bearer ${SESSION_ID}`,
    "Content-Type": "application/json",
  };

  const { data, status } = await axios.post(
    `${API_BASE}/v1/chat/completions`,
    payload,
    { headers, timeout: 300000 }
  );

  console.log("HTTP", status);
  console.log(JSON.stringify(data, null, 2));
  const answer = data?.choices?.[0]?.message?.content;
  if (answer) console.log("Answer:", answer);
}

main().catch((err) => {
  console.error("Request failed:", err?.response?.status, err?.response?.data || err?.message);
  process.exit(1);
});


