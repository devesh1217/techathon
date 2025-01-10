import { createCanvas } from "canvas";
import crypto from "crypto";

export async function GET() {
  const canvas = createCanvas(200, 50);
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#f2f2f2";
  ctx.fillRect(0, 0, 200, 50);

  // Generate random text
  const CAPTCHA_LENGTH = 6;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captchaText = "";
  for (let i = 0; i < CAPTCHA_LENGTH; i++) {
    captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // Draw CAPTCHA text with random rotation and position
  ctx.font = "30px Arial";
  ctx.fillStyle = "#333";
  for (let i = 0; i < CAPTCHA_LENGTH; i++) {
    const x = 20 + i * 30;
    const y = 30 + Math.random() * 10;
    const angle = Math.random() * 0.4 - 0.2;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillText(captchaText[i], 0, 0);
    ctx.restore();
  }

  // Add noise lines
  ctx.strokeStyle = "#ccc";
  for (let i = 0; i < 10; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * 200, Math.random() * 50);
    ctx.lineTo(Math.random() * 200, Math.random() * 50);
    ctx.stroke();
  }

  // Add noise dots
  for (let i = 0; i < 100; i++) {
    ctx.fillStyle = `rgba(0,0,0,${Math.random()})`;
    ctx.beginPath();
    ctx.arc(Math.random() * 200, Math.random() * 50, 1, 0, Math.PI * 2);
    ctx.fill();
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
