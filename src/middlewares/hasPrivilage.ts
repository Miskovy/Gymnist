import { Request, Response, NextFunction } from "express";
import { AdminPrivilegeModel, PrivilegeModel } from "../admin/model";

export const hasPrivilege = (requiredName: string, requiredAction: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminId = (req as any).currentUser?.id;

      if (!adminId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Check if admin has the required privilege
      const hasAccess = await AdminPrivilegeModel.findOne({
        where: {
          adminId: adminId
        },
        include: [{
          model: PrivilegeModel,
          where: {
            name: requiredName,
            action: requiredAction
          }
        }]
      });

      if (!hasAccess) {
        return res.status(403).json({
          error: "Access denied. you don't have the required privilege."
        });
      }

      next();
    } catch (error) {
      console.error("Privilege check error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
};