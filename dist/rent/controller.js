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
exports.deleteRent = exports.getRentById = exports.getAllRents = exports.updateRent = exports.createRent = void 0;
const sequelize_1 = require("sequelize");
const model_1 = __importDefault(require("./model"));
const model_2 = require("../room/model");
const model_3 = __importDefault(require("../trainer/model"));
const createRent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roomId, trainerId, price, startDate, endDate } = req.body;
        // Check if room exists
        const room = yield model_2.RoomModel.findByPk(roomId);
        if (!room) {
            return res.status(400).json({ message: 'Room not found' });
        }
        // Check if trainer exists
        const trainer = yield model_3.default.findByPk(trainerId);
        if (!trainer) {
            return res.status(400).json({ message: 'Trainer not found' });
        }
        // Check for overlapping rentals
        const overlappingRent = yield model_1.default.findOne({
            where: {
                roomId,
                [sequelize_1.Op.or]: [
                    {
                        startDate: {
                            [sequelize_1.Op.between]: [startDate, endDate]
                        }
                    },
                    {
                        endDate: {
                            [sequelize_1.Op.between]: [startDate, endDate]
                        }
                    }
                ]
            }
        });
        if (overlappingRent) {
            return res.status(400).json({ message: 'Room is already rented for this period' });
        }
        const rent = yield model_1.default.create({
            roomId,
            trainerId,
            price,
            startDate,
            endDate
        });
        const createdRent = yield model_1.default.findByPk(rent.id, {
            include: [
                {
                    model: model_2.RoomModel,
                    as: 'room'
                },
                {
                    model: model_3.default,
                    as: 'trainer',
                    attributes: ['id', 'name', 'email', 'phone']
                }
            ]
        });
        res.status(201).json({
            message: 'Rent created successfully',
            data: createdRent
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating rent', error: error.message });
    }
});
exports.createRent = createRent;
const updateRent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const rent = yield model_1.default.findByPk(id);
        if (!rent) {
            return res.status(404).json({ message: 'Rent not found' });
        }
        const { roomId, trainerId, price, startDate, endDate } = req.body;
        if (roomId !== undefined) {
            const room = yield model_2.RoomModel.findByPk(roomId);
            if (!room) {
                return res.status(400).json({ message: 'Room not found' });
            }
        }
        if (trainerId !== undefined) {
            const trainer = yield model_3.default.findByPk(trainerId);
            if (!trainer) {
                return res.status(400).json({ message: 'Trainer not found' });
            }
        }
        // Check for overlapping rentals if dates are being updated
        if (startDate !== undefined || endDate !== undefined) {
            const newStartDate = startDate || rent.startDate;
            const newEndDate = endDate || rent.endDate;
            const overlappingRent = yield model_1.default.findOne({
                where: {
                    id: { [sequelize_1.Op.ne]: id },
                    roomId: roomId || rent.roomId,
                    [sequelize_1.Op.or]: [
                        {
                            startDate: {
                                [sequelize_1.Op.between]: [newStartDate, newEndDate]
                            }
                        },
                        {
                            endDate: {
                                [sequelize_1.Op.between]: [newStartDate, newEndDate]
                            }
                        }
                    ]
                }
            });
            if (overlappingRent) {
                return res.status(400).json({ message: 'Room is already rented for this period' });
            }
        }
        const updateData = {};
        if (roomId !== undefined)
            updateData.roomId = roomId;
        if (trainerId !== undefined)
            updateData.trainerId = trainerId;
        if (price !== undefined)
            updateData.price = price;
        if (startDate !== undefined)
            updateData.startDate = startDate;
        if (endDate !== undefined)
            updateData.endDate = endDate;
        yield model_1.default.update(updateData, { where: { id } });
        const updatedRent = yield model_1.default.findByPk(id, {
            include: [
                {
                    model: model_2.RoomModel,
                    as: 'room'
                },
                {
                    model: model_3.default,
                    as: 'trainer',
                    attributes: ['id', 'name', 'email', 'phone']
                }
            ]
        });
        res.json({
            message: 'Rent updated successfully',
            data: updatedRent
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating rent', error: error.message });
    }
});
exports.updateRent = updateRent;
const getAllRents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rents = yield model_1.default.findAll({
            include: [
                {
                    model: model_2.RoomModel,
                    as: 'room'
                },
                {
                    model: model_3.default,
                    as: 'trainer',
                    attributes: ['id', 'name', 'email', 'phone']
                }
            ]
        });
        return res.status(200).json(rents);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching rents', error });
    }
});
exports.getAllRents = getAllRents;
const getRentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const rent = yield model_1.default.findByPk(id, {
            include: [
                {
                    model: model_2.RoomModel,
                    as: 'room'
                },
                {
                    model: model_3.default,
                    as: 'trainer',
                    attributes: ['id', 'name', 'email', 'phone']
                }
            ]
        });
        if (!rent) {
            return res.status(404).json({ message: 'Rent not found' });
        }
        return res.status(200).json(rent);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching rent', error });
    }
});
exports.getRentById = getRentById;
const deleteRent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const deleted = yield model_1.default.destroy({ where: { id } });
        if (deleted === 0) {
            return res.status(404).json({ message: 'Rent not found' });
        }
        return res.status(200).json({ message: 'Rent deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error deleting rent', error });
    }
});
exports.deleteRent = deleteRent;
