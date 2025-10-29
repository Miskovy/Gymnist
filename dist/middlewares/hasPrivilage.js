"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasPrivilege = void 0;
const model_1 = require("../admin/model");
const hasPrivilege = (requiredName, requiredAction) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const adminId = (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id;
            if (!adminId) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            // Check if admin has the required privilege
            const hasAccess = yield model_1.AdminPrivilegeModel.findOne({
                where: {
                    adminId: adminId
                },
                include: [{
                        model: model_1.PrivilegeModel,
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
        }
        catch (error) {
            console.error("Privilege check error:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    });
};
exports.hasPrivilege = hasPrivilege;
