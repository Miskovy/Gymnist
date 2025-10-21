import { join } from 'path';
import * as fs from 'fs';


export async function saveBase64Image(
  base64: string,
  filename: string,
  folder: string = "uploads"
): Promise<string> {
  const matches = base64.match(/^data:(.+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error("Invalid base64 format");
  }

  const ext = matches[1].split("/")[1];
  const buffer = Buffer.from(matches[2], "base64");

  const uploadsDir = join(process.cwd(), "public", folder);

  try {
    await fs.mkdirSync(uploadsDir, { recursive: true });
  } catch (err) {
    console.error("Failed to create directory:", err);
    throw err;
  }

  const filePath = join(uploadsDir, filename);

  try {
    await fs.writeFileSync(filePath, buffer);
  } catch (err) {
    console.error("Failed to write image file:", err);
    throw err;
  }

  const baseUrl = process.env.APP_URL || 'http://localhost:3000';
  const url = `${baseUrl}/${folder}/${filename}`;
  return url;
}