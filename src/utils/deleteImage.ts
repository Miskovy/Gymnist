import fs from "fs/promises";
import path from "path";

export const deleteImage = async (
  relativePath: string
): Promise<boolean> => {
  try {
    const filePath = path.join(__dirname, "..", "..", relativePath);

    try {
      await fs.access(filePath);
    } catch {
      return false;
    }
    try {
      await fs.unlink(filePath);
    } catch (err) {
      throw new Error("can't remove");
    }
    return true;
  } catch (err) {
    console.error("Error deleting photo:", err);
    throw err;
  }
};