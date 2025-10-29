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
exports.deletePackage = exports.updatePackage = exports.createPackage = exports.getPackageById = exports.getAllPackages = void 0;
const model_1 = __importDefault(require("./model"));
const model_2 = __importDefault(require("../payment-method/model"));
const handleImages_1 = require("../utils/handleImages");
const getAllPackages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const packages = yield model_1.default.findAll({
            include: [{
                    model: model_2.default,
                    as: 'paymentMethod'
                }]
        });
        return res.status(200).json(packages);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching packages', error });
    }
});
exports.getAllPackages = getAllPackages;
const getPackageById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const packageItem = yield model_1.default.findByPk(req.params.id, {
            include: [{
                    model: model_2.default,
                    as: 'paymentMethod'
                }]
        });
        if (!packageItem) {
            return res.status(404).json({ message: 'Package not found' });
        }
        return res.status(200).json(packageItem);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching package', error });
    }
});
exports.getPackageById = getPackageById;
const createPackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, maxEntranceCount, description, startDate, endDate, paymentMethodId, priceMonthly, priceQuarterly, priceSemiAnnually, priceAnnually } = req.body;
        let imageUrl;
        if (req.body.image) {
            const base64 = req.body.image;
            const folder = 'packages';
            imageUrl = yield (0, handleImages_1.saveBase64Image)(base64, req, folder);
        }
        const packageItem = yield model_1.default.create({
            name,
            maxEntranceCount,
            description,
            image: imageUrl,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            paymentMethodId,
            priceMonthly,
            priceQuarterly,
            priceSemiAnnually,
            priceAnnually
        });
        const createdPackage = yield model_1.default.findByPk(packageItem.id, {
            include: [{
                    model: model_2.default,
                    as: 'paymentMethod'
                }]
        });
        return res.status(201).json(createdPackage);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error creating package', error });
    }
});
exports.createPackage = createPackage;
const updatePackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const packageItem = yield model_1.default.findByPk(id);
        if (!packageItem) {
            return res.status(404).json({ message: 'Package not found' });
        }
        const { name, maxEntranceCount, description, startDate, endDate, paymentMethodId, priceMonthly, priceQuarterly, priceSemiAnnually, priceAnnually, image } = req.body;
        const updateData = {};
        if (image) {
            const folder = 'packages';
            updateData.image = yield (0, handleImages_1.saveBase64Image)(image, req, folder);
        }
        // Only update fields that are provided in the request body
        if (name !== undefined)
            updateData.name = name;
        if (maxEntranceCount !== undefined)
            updateData.maxEntranceCount = maxEntranceCount;
        if (description !== undefined)
            updateData.description = description;
        if (startDate !== undefined)
            updateData.startDate = new Date(startDate);
        if (endDate !== undefined)
            updateData.endDate = new Date(endDate);
        if (paymentMethodId !== undefined)
            updateData.paymentMethodId = paymentMethodId;
        if (priceMonthly !== undefined)
            updateData.priceMonthly = priceMonthly;
        if (priceQuarterly !== undefined)
            updateData.priceQuarterly = priceQuarterly;
        if (priceSemiAnnually !== undefined)
            updateData.priceSemiAnnually = priceSemiAnnually;
        if (priceAnnually !== undefined)
            updateData.priceAnnually = priceAnnually;
        yield model_1.default.update(updateData, { where: { id } });
        const updatedPackage = yield model_1.default.findByPk(id, {
            include: [{
                    model: model_2.default,
                    as: 'paymentMethod'
                }]
        });
        return res.status(200).json({
            message: 'Package updated successfully',
            data: updatedPackage
        });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error updating package', error });
    }
});
exports.updatePackage = updatePackage;
const deletePackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield model_1.default.destroy({
            where: { id: req.params.id }
        });
        if (deleted === 0) {
            return res.status(404).json({ message: 'Package not found' });
        }
        return res.status(200).json({ message: 'Package deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error deleting package', error });
    }
});
exports.deletePackage = deletePackage;
