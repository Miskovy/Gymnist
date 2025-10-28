import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { AdminModel } from "../admin/model";
import  generateToken  from "../middlewares/generateJWT";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const admin = await AdminModel.findOne({
      where: { email }
    });

    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = await generateToken({
      id: admin.id,
    });

    return res.status(200).json({ success: true, token});
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};