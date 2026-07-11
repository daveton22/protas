// api/content.js
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
const KEY = "protas:content";
const DEFAULT_CONTENT = {
  text: {},
  html: {},
  attrs: {},
  inlineStyle: {},
  cssVars: {},
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();

  if (req.method === "GET") {
    const data = (await redis.get(KEY)) || DEFAULT_CONTENT;
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    const incoming = req.body;
    if (!incoming || typeof incoming !== "object" || Array.isArray(incoming)) {
      return res.status(400).json({ message: "Format data tidak valid." });
    }
    await redis.set(KEY, incoming);
    return res.status(200).json({ message: "Tersimpan.", data: incoming });
  }

  res.status(404).json({ message: "Not found" });
}
