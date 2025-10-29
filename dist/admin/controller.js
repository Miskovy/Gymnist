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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePrivilege = exports.updatePrivilege = exports.createPrivilege = exports.getAllPrivileges = exports.addPrivilegesAdmin = exports.deleteAdmin = exports.updateAdmin = exports.createAdmin = exports.getAdmin = exports.getAllAdmins = void 0;
const model_1 = require("./model");
const bcrypt_1 = __importDefault(require("bcrypt"));
// Helper function for success response
const successResponse = (res, data, statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        data
    });
};
// Admin Controllers
const getAllAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield model_1.AdminModel.findAll();
        return successResponse(res, { admins }, 200);
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});
exports.getAllAdmins = getAllAdmins;
const getAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const admin = yield model_1.AdminModel.findByPk(id);
        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin Not Found' });
        }
        // Get admin privileges
        const adminPrivileges = yield model_1.AdminPrivilegeModel.findAll({
            where: { adminId: id },
            include: [{ model: model_1.PrivilegeModel, as: 'privilege' }]
        });
        // Group privileges by name
        const groupedPrivileges = adminPrivileges.reduce((acc, curr) => {
            const privilege = curr.privilege;
            if (!privilege)
                return acc;
            if (!acc[privilege.name]) {
                acc[privilege.name] = [];
            }
            acc[privilege.name].push({
                id: privilege.id,
                action: privilege.action,
            });
            return acc;
        }, {});
        return successResponse(res, Object.assign(Object.assign({}, admin.toJSON()), { privileges: groupedPrivileges }), 200);
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});
exports.getAdmin = getAdmin;
const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        // Hash password
        if (data.password) {
            data.password = yield bcrypt_1.default.hash(data.password, 10);
        }
        // Create admin
        yield model_1.AdminModel.create(data);
        return successResponse(res, { message: 'Admin Created Successfully' }, 201);
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});
exports.createAdmin = createAdmin;
const updateAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        const admin = yield model_1.AdminModel.findByPk(id);
        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin Not Found' });
        }
        // Hash password if provided
        if (data.password) {
            data.password = yield bcrypt_1.default.hash(data.password, 10);
        }
        // Update admin
        yield admin.update(data);
        return successResponse(res, { message: 'Admin Updated Successfully' }, 200);
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});
exports.updateAdmin = updateAdmin;
const deleteAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const admin = yield model_1.AdminModel.findByPk(id);
        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin Not Found' });
        }
        // Delete admin
        yield admin.destroy();
        return successResponse(res, { message: 'Admin Deleted Successfully' }, 200);
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});
exports.deleteAdmin = deleteAdmin;
// Privilege Management
const addPrivilegesAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const privilegesList = req.body.privilegesIds;
        const admin = yield model_1.AdminModel.findByPk(id);
        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin Not Found' });
        }
        // Delete existing privileges
        yield model_1.AdminPrivilegeModel.destroy({ where: { adminId: id } });
        // Add new privileges
        const privilegesToAdd = privilegesList.map((privilegeId) => ({
            adminId: id,
            privilegeId
        }));
        yield model_1.AdminPrivilegeModel.bulkCreate(privilegesToAdd);
        return successResponse(res, { message: 'Admin has privileges successfully' }, 200);
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});
exports.addPrivilegesAdmin = addPrivilegesAdmin;
// Privilege Controllers
const getAllPrivileges = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const privileges = yield model_1.PrivilegeModel.findAll();
        // Group privileges by name
        const grouped = privileges.reduce((acc, curr) => {
            if (!acc[curr.name]) {
                acc[curr.name] = [];
            }
            acc[curr.name].push({
                id: curr.id,
                action: curr.action,
            });
            return acc;
        }, {});
        return successResponse(res, { privileges: grouped }, 200);
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});
exports.getAllPrivileges = getAllPrivileges;
// create privalge
const createPrivilege = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        yield model_1.PrivilegeModel.create(data);
        return successResponse(res, { message: 'Privilege Created Successfully' }, 201);
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});
exports.createPrivilege = createPrivilege;
const updatePrivilege = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        const privilege = yield model_1.PrivilegeModel.findByPk(id);
        if (!privilege) {
            return res.status(404).json({ success: false, message: 'Privilege Not Found' });
        }
        yield privilege.update(data);
        return successResponse(res, { message: 'Privilege Updated Successfully' }, 200);
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});
exports.updatePrivilege = updatePrivilege;
const deletePrivilege = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const privilege = yield model_1.PrivilegeModel.findByPk(id);
        if (!privilege) {
            return res.status(404).json({ success: false, message: 'Privilege Not Found' });
        }
        yield privilege.destroy();
        return successResponse(res, { message: 'Privilege Deleted Successfully' }, 200);
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});
exports.deletePrivilege = deletePrivilege;
