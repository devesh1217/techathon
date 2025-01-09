import path from "path";
import fs from "fs/promises";
import { parseCSV } from "../../../utils/parseCSV";

export async function GET(req) {
  const filePath = path.join(process.cwd(), "public", "data", "road_accidents.csv");
  try {
    const file = await fs.readFile(filePath, "utf8");
    const data = await parseCSV(file);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), { status: 500 });
  }
}
