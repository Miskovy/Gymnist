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
exports.scanQRCode = exports.deleteTrainee = exports.updateTrainee = exports.createTrainee = exports.getTraineeById = exports.getAllTrainees = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const model_1 = __importDefault(require("./model"));
const QRCodeService_1 = __importDefault(require("../utils/QRCodeService"));
const handleImages_1 = require("../utils/handleImages");
const CalcAge_1 = __importDefault(require("../utils/CalcAge"));
const model_2 = __importDefault(require("./model"));
const model_3 = require("../location/model");
const qrCodeService = new QRCodeService_1.default();
const getAllTrainees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainees = yield model_1.default.findAll({
            attributes: { exclude: ['password'] },
            include: [
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
        return res.status(200).json(trainees);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching trainees', error });
    }
});
exports.getAllTrainees = getAllTrainees;
const getTraineeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainee = yield model_1.default.findByPk(req.params.id, {
            attributes: { exclude: ['password'] },
            include: [
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
        if (!trainee) {
            return res.status(404).json({ message: 'Trainee not found' });
        }
        return res.status(200).json(trainee);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching trainee', error });
    }
});
exports.getTraineeById = getTraineeById;
const createTrainee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, phone, birthDate, gender, countryId, cityId, stateId, nationality } = req.body;
        if (email) {
            const existingTrainer = yield model_2.default.findOne({ where: { email } });
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
        const trainee = yield model_2.default.create({
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
        res.status(201).json({
            message: 'Trainee created successfully',
            qrCodeImage,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating trainee', error: error.message });
    }
});
exports.createTrainee = createTrainee;
const updateTrainee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const trainee = yield model_1.default.findByPk(req.params.id);
        if (!trainee) {
            return res.status(404).json({ message: 'Trainee not found' });
        }
        const updateData = Object.assign({}, req.body);
        if (updateData.birthDate) {
            updateData.age = (0, CalcAge_1.default)(new Date(updateData.birthDate));
        }
        if (updateData.image && updateData.image.startsWith('data:')) {
            updateData.image = yield (0, handleImages_1.saveBase64Image)(updateData.image, req, 'trainees');
        }
        if (updateData.password) {
            updateData.password = yield bcrypt_1.default.hash(updateData.password, 10);
        }
        yield model_1.default.update(updateData, {
            where: { id: req.params.id }
        });
        const updatedTrainee = yield model_1.default.findByPk(req.params.id);
        if (!updatedTrainee) {
            return res.status(404).json({ message: 'Trainee not found' });
        }
        const qrCodeImage = yield qrCodeService.generateQRCodeUrl((_a = updatedTrainee.qrCode) !== null && _a !== void 0 ? _a : '');
        res.json({
            message: 'Trainee updated successfully',
            qrCodeImage,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating trainee', error: error.message });
    }
});
exports.updateTrainee = updateTrainee;
const deleteTrainee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield model_1.default.destroy({
            where: { id: req.params.id }
        });
        if (deleted === 0) {
            return res.status(404).json({ message: 'Trainee not found' });
        }
        return res.status(200).json({ message: 'Trainee deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error deleting trainee', error });
    }
});
exports.deleteTrainee = deleteTrainee;
const scanQRCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { qrCode } = req.body;
        console.log(qrCode);
        if (!qrCodeService.validateQRCodeData(qrCode, 'TRAINEE')) {
            return res.status(400).json({ message: 'Invalid QR code format' });
        }
        const trainee = yield model_1.default.findOne({ where: { qrCode } });
        if (!trainee) {
            return res.status(404).json({ message: 'Trainee not found with this QR code' });
        }
        trainee.lastAttendance = new Date();
        yield trainee.save();
        res.json({
            message: 'Attendance recorded successfully',
            trainee: {
                id: trainee.id,
                name: trainee.name,
                email: trainee.email,
                phone: trainee.phone,
                lastAttendance: trainee.lastAttendance,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error scanning QR code', error: error.message });
    }
});
exports.scanQRCode = scanQRCode;
