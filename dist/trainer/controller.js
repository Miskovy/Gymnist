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
exports.deleteTrainer = exports.scanQRCode = exports.getTrainerById = exports.getAllTrainers = exports.updateTrainer = exports.createTrainer = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const model_1 = __importDefault(require("./model"));
const model_2 = __importDefault(require("../major/model"));
const model_3 = require("../location/model");
const QRCodeService_1 = __importDefault(require("../utils/QRCodeService"));
const handleImages_1 = require("../utils/handleImages");
const CalcAge_1 = __importDefault(require("../utils/CalcAge"));
const qrCodeService = new QRCodeService_1.default();
const createTrainer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, phone, birthDate, majorIds, gender, countryId, cityId, stateId, nationality } = req.body;
        if (email) {
            const existingTrainer = yield model_1.default.findOne({ where: { email } });
            if (existingTrainer)
                return res.status(400).json({ message: 'Trainer with this email already exists' });
        }
        if (countryId) {
            const country = yield model_3.CountryModel.findByPk(countryId);
            if (!country)
                return res.status(400).json({ message: 'Country not found' });
        }
        if (stateId) {
            const state = yield model_3.StateModel.findByPk(stateId);
            if (!state)
                return res.status(400).json({ message: 'State not found' });
        }
        if (cityId) {
            const city = yield model_3.CityModel.findByPk(cityId);
            if (!city)
                return res.status(400).json({ message: 'City not found' });
        }
        const passwordHash = yield bcrypt_1.default.hash(password, 10);
        const barCode = qrCodeService.generateUniqueQRCodeData('BC');
        const qrCodeData = qrCodeService.generateUniqueQRCodeData('TRAINER');
        const qrCodeImage = yield qrCodeService.generateQRCodeUrl(qrCodeData);
        let imageUrl;
        if (req.body.image) {
            imageUrl = yield (0, handleImages_1.saveBase64Image)(req.body.image, req, 'trainers');
        }
        const birthDateObj = birthDate ? new Date(birthDate) : undefined;
        const age = birthDateObj ? (0, CalcAge_1.default)(birthDateObj) : undefined;
        const trainer = yield model_1.default.create({
            name,
            email,
            password: passwordHash,
            phone,
            birthDate: birthDateObj,
            age,
            gender,
            countryId,
            cityId,
            stateId,
            nationality,
            image: imageUrl,
            barCode,
            qrCode: qrCodeData,
        });
        if (majorIds && Array.isArray(majorIds) && majorIds.length > 0) {
            const majors = yield model_2.default.findAll({
                where: { id: majorIds }
            });
            if (majors.length !== majorIds.length) {
                return res.status(400).json({ message: 'majors not found' });
            }
            yield trainer.setMajors(majorIds);
        }
        const createdTrainer = yield model_1.default.findByPk(trainer.id, {
            include: [{
                    model: model_2.default,
                    as: 'majors',
                    through: { attributes: [] }
                }]
        });
        res.status(201).json({
            message: 'Trainer created successfully',
            data: createdTrainer,
            qrCodeImage,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating trainer', error: error.message });
    }
});
exports.createTrainer = createTrainer;
const updateTrainer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = Number(req.params.id);
        const trainer = yield model_1.default.findByPk(id);
        if (!trainer) {
            return res.status(404).json({ message: 'Trainer not found' });
        }
        const { name, email, password, phone, birthDate, majorIds, gender, countryId, cityId, stateId, nationality } = req.body;
        if (email !== undefined && email !== trainer.email) {
            const existing = yield model_1.default.findOne({ where: { email } });
            if (existing)
                return res.status(400).json({ message: 'Trainer with this email already exists' });
        }
        if (countryId !== undefined && countryId !== null) {
            const country = yield model_3.CountryModel.findByPk(Number(countryId));
            if (!country)
                return res.status(400).json({ message: 'Country not found' });
        }
        if (stateId !== undefined && stateId !== null) {
            const state = yield model_3.StateModel.findByPk(Number(stateId));
            if (!state)
                return res.status(400).json({ message: 'State not found' });
        }
        if (cityId !== undefined && cityId !== null) {
            const city = yield model_3.CityModel.findByPk(Number(cityId));
            if (!city)
                return res.status(400).json({ message: 'City not found' });
        }
        const updateData = {};
        if (name !== undefined)
            updateData.name = name;
        if (email !== undefined)
            updateData.email = email;
        if (phone !== undefined)
            updateData.phone = phone;
        if (gender !== undefined)
            updateData.gender = gender;
        if (countryId !== undefined)
            updateData.countryId = countryId;
        if (cityId !== undefined)
            updateData.cityId = cityId;
        if (stateId !== undefined)
            updateData.stateId = stateId;
        if (nationality !== undefined)
            updateData.nationality = nationality;
        if (birthDate !== undefined) {
            const bd = new Date(birthDate);
            updateData.birthDate = bd;
            updateData.age = (0, CalcAge_1.default)(bd);
        }
        if (req.body.image && req.body.image.startsWith('data:')) {
            updateData.image = yield (0, handleImages_1.saveBase64Image)(req.body.image, req, 'trainers');
        }
        if (password) {
            updateData.password = yield bcrypt_1.default.hash(password, 10);
        }
        yield model_1.default.update(updateData, { where: { id } });
        if (majorIds !== undefined) {
            if (Array.isArray(majorIds) && majorIds.length > 0) {
                const majors = yield model_2.default.findAll({
                    where: { id: majorIds }
                });
                if (majors.length !== majorIds.length) {
                    return res.status(400).json({ message: 'One or more majors not found' });
                }
                yield trainer.setMajors(majorIds);
            }
            else {
                yield trainer.setMajors([]);
            }
        }
        const updatedTrainer = yield model_1.default.findByPk(id, {
            include: [{
                    model: model_2.default,
                    as: 'majors',
                    through: { attributes: [] }
                }]
        });
        const qrCodeImage = yield qrCodeService.generateQRCodeUrl((_a = updatedTrainer === null || updatedTrainer === void 0 ? void 0 : updatedTrainer.qrCode) !== null && _a !== void 0 ? _a : '');
        res.json({
            message: 'Trainer updated successfully'
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating trainer', error: error.message });
    }
});
exports.updateTrainer = updateTrainer;
const getAllTrainers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainers = yield model_1.default.findAll({
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: model_2.default,
                    as: 'majors',
                    through: { attributes: [] }
                },
                {
                    model: model_3.CountryModel,
                    as: 'country',
                    attributes: ['id', 'name']
                },
                {
                    model: model_3.StateModel,
                    as: 'state',
                    attributes: ['id', 'name']
                },
                {
                    model: model_3.CityModel,
                    as: 'city',
                    attributes: ['id', 'name']
                }
            ]
        });
        return res.status(200).json(trainers);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching trainers', error });
    }
});
exports.getAllTrainers = getAllTrainers;
const getTrainerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const trainer = yield model_1.default.findByPk(id, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: model_2.default,
                    as: 'majors',
                    through: { attributes: [] }
                },
                {
                    model: model_3.CountryModel,
                    as: 'country',
                    attributes: ['id', 'name']
                },
                {
                    model: model_3.StateModel,
                    as: 'state',
                    attributes: ['id', 'name']
                },
                {
                    model: model_3.CityModel,
                    as: 'city',
                    attributes: ['id', 'name']
                }
            ]
        });
        if (!trainer) {
            return res.status(404).json({ message: 'Trainer not found' });
        }
        return res.status(200).json(trainer);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching trainer', error });
    }
});
exports.getTrainerById = getTrainerById;
const scanQRCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { qrCode } = req.body;
        if (!qrCodeService.validateQRCodeData(qrCode, 'TRAINER')) {
            return res.status(400).json({ message: 'Invalid QR code format' });
        }
        const trainer = yield model_1.default.findOne({ where: { qrCode } });
        if (!trainer) {
            return res.status(404).json({ message: 'Trainer not found with this QR code' });
        }
        trainer.lastAttendance = new Date();
        yield trainer.save();
        res.json({
            message: 'Attendance recorded successfully',
            trainer: {
                id: trainer.id,
                name: trainer.name,
                email: trainer.email,
                phone: trainer.phone,
                lastAttendance: trainer.lastAttendance,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error scanning QR code', error: error.message });
    }
});
exports.scanQRCode = scanQRCode;
const deleteTrainer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const deleted = yield model_1.default.destroy({ where: { id } });
        if (deleted === 0) {
            return res.status(404).json({ message: 'Trainer not found' });
        }
        return res.status(200).json({ message: 'Trainer deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error deleting trainer', error });
    }
});
exports.deleteTrainer = deleteTrainer;
