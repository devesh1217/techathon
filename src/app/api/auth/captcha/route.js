import { createCanvas } from "canvas";
import crypto from "crypto";

export async function GET() {
  const canvas = createCanvas(200, 50);
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#f2f2f2";
  ctx.fillRect(0, 0, 200, 50);

  // Generate random text
  const CAPTCHA_LENGTH = 5;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captchaText = "";
  for (let i = 0; i < CAPTCHA_LENGTH; i++) {
    captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // Draw CAPTCHA text
  ctx.font = "30px Arial";
  ctx.fillStyle = "#333";
  ctx.fillText(captchaText, 50, 35);

  // Add noise lines
  ctx.strokeStyle = "#ccc";
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * 200, Math.random() * 50);
    ctx.lineTo(Math.random() * 200, Math.random() * 50);
    ctx.stroke();
  }

  // Generate a token
  const captchaToken = crypto.randomBytes(16).toString("hex");
  const base64Image = canvas.toDataURL().split(",")[1];

  // Save token and text in a temporary store (e.g., Redis, in-memory cache)
  global.captchaStore = global.captchaStore || {};
  global.captchaStore[captchaToken] = captchaText;

  // Return image and token
  return new Response(
    JSON.stringify({ captchaImage: base64Image, captchaToken }),
    { status: 200 }
  );
}
