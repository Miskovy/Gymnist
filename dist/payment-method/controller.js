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
exports.deletePaymentMethod = exports.updatePaymentMethod = exports.createPaymentMethod = exports.getPaymentMethodById = exports.getAllPaymentMethods = void 0;
const model_1 = __importDefault(require("./model"));
const handleImages_1 = require("../utils/handleImages");
const getAllPaymentMethods = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paymentMethods = yield model_1.default.findAll();
        return res.status(200).json(paymentMethods);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching payment methods', error });
    }
});
exports.getAllPaymentMethods = getAllPaymentMethods;
const getPaymentMethodById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paymentMethod = yield model_1.default.findByPk(req.params.id);
        if (!paymentMethod) {
            return res.status(404).json({ message: 'Payment method not found' });
        }
        return res.status(200).json(paymentMethod);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching payment method', error });
    }
});
exports.getPaymentMethodById = getPaymentMethodById;
const createPaymentMethod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, type, isActive } = req.body;
        const base64 = req.body.image;
        const folder = 'payment-methods';
        const imageUrl = yield (0, handleImages_1.saveBase64Image)(base64, req, folder);
        const paymentMethod = yield model_1.default.create({
            name,
            description,
            type,
            image: imageUrl,
            isActive
        });
        return res.status(201).json(paymentMethod);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error creating payment method', error });
    }
});
exports.createPaymentMethod = createPaymentMethod;
const updatePaymentMethod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const paymentMethod = yield model_1.default.findByPk(id);
        if (!paymentMethod) {
            return res.status(404).json({ message: 'Payment method not found' });
        }
        const { name, description, type, isActive, image } = req.body;
        const updateData = {};
        if (image) {
            const folder = 'payment-methods';
            updateData.image = yield (0, handleImages_1.saveBase64Image)(image, req, folder);
        }
        if (name !== undefined)
            updateData.name = name;
        if (description !== undefined)
            updateData.description = description;
        if (type !== undefined)
            updateData.type = type;
        if (isActive !== undefined)
            updateData.isActive = isActive;
        yield model_1.default.update(updateData, { where: { id } });
        const updatedPaymentMethod = yield model_1.default.findByPk(id);
        return res.status(200).json({
            message: 'Payment method updated successfully',
            data: updatedPaymentMethod
        });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error updating payment method', error });
    }
});
exports.updatePaymentMethod = updatePaymentMethod;
const deletePaymentMethod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield model_1.default.destroy({
            where: { id: req.params.id }
        });
        if (deleted === 0) {
            return res.status(404).json({ message: 'Payment method not found' });
        }
        return res.status(200).json({ message: 'Payment method deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error deleting payment method', error });
    }
});
exports.deletePaymentMethod = deletePaymentMethod;
