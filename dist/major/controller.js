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
exports.deleteMajor = exports.updateMajor = exports.createMajor = exports.getMajorById = exports.getAllMajors = void 0;
const model_1 = __importDefault(require("./model"));
const getAllMajors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const majors = yield model_1.default.findAll({
            order: [['name', 'ASC']]
        });
        return res.status(200).json(majors);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching majors', error });
    }
});
exports.getAllMajors = getAllMajors;
const getMajorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const major = yield model_1.default.findByPk(req.params.id);
        if (!major) {
            return res.status(404).json({ message: 'Major not found' });
        }
        return res.status(200).json(major);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching major', error });
    }
});
exports.getMajorById = getMajorById;
const createMajor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        const existingMajor = yield model_1.default.findOne({ where: { name } });
        if (existingMajor) {
            return res.status(400).json({ message: 'Major with this name already exists' });
        }
        const major = yield model_1.default.create({
            name
        });
        return res.status(201).json(major);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error creating major', error });
    }
});
exports.createMajor = createMajor;
const updateMajor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [updated] = yield model_1.default.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated === 0) {
            return res.status(404).json({ message: 'Major not found' });
        }
        const updatedMajor = yield model_1.default.findByPk(req.params.id);
        return res.status(200).json(updatedMajor);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error updating major', error });
    }
});
exports.updateMajor = updateMajor;
const deleteMajor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield model_1.default.destroy({
            where: { id: req.params.id }
        });
        if (deleted === 0) {
            return res.status(404).json({ message: 'Major not found' });
        }
        return res.status(200).json({ message: 'Major deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error deleting major', error });
    }
});
exports.deleteMajor = deleteMajor;
