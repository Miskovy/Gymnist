"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const validator_1 = require("./validator");
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const router = express_1.default.Router();
router.use(verifyToken_1.default);
// Privilege routes
router.post('/privileges', controller_1.createPrivilege);
router.get('/privileges', controller_1.getAllPrivileges);
router.post('/:id/privileges', validator_1.validateAdminId, validator_1.validatePrivileges, controller_1.addPrivilegesAdmin);
// Admin routes
router.get('/', controller_1.getAllAdmins);
router.get('/:id', validator_1.validateAdminId, controller_1.getAdmin);
router.post('/', validator_1.validateAdmin, controller_1.createAdmin);
router.put('/:id', validator_1.validateAdminId, validator_1.validateAdminUpdate, controller_1.updateAdmin);
router.delete('/:id', validator_1.validateAdminId, controller_1.deleteAdmin);
exports.default = router;
