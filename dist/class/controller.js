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
exports.getClassCalendar = exports.createBooking = exports.addScheduleToClass = exports.addTrainerToClass = exports.deleteClass = exports.updateClass = exports.createClass = exports.getClassById = exports.getAllClasses = void 0;
const model_1 = require("./model");
const sequelize_1 = require("sequelize");
const inspector_1 = require("inspector");
const model_2 = __importDefault(require("../trainer/model"));
// Class Controllers
const getAllClasses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classes = yield model_1.ClassModel.findAll();
        return res.status(200).json(classes);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching classes', error });
    }
});
exports.getAllClasses = getAllClasses;
const getClassById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const classItem = yield model_1.ClassModel.findByPk(id);
        if (!classItem) {
            return res.status(404).json({ message: 'Class not found' });
        }
        return res.status(200).json(classItem);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching class', error });
    }
});
exports.getClassById = getClassById;
const createClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, image, price, gender, trainers, schedules } = req.body;
        // Create class - explicitly type the creation object
        const classData = {
            name,
            description,
            image,
            price,
            gender
        };
        const newClass = yield model_1.ClassModel.create(classData);
        // Add trainers if provided
        if (trainers && trainers.length > 0) {
            const trainerClasses = trainers.map((trainerId) => ({
                trainerId,
                classId: newClass.id
            }));
            yield model_1.TrainerClassModel.bulkCreate(trainerClasses);
        }
        // Add schedules if provided
        if (schedules && schedules.length > 0) {
            const classSchedules = schedules.map((schedule) => ({
                classId: newClass.id,
                date: schedule.date,
                timeSlot: schedule.timeSlot,
                roomId: schedule.roomId
            }));
            yield model_1.ClassScheduleModel.bulkCreate(classSchedules);
        }
        return res.status(201).json(newClass);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error creating class', error });
    }
});
exports.createClass = createClass;
const updateClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description, image, price, gender } = req.body;
        const classItem = yield model_1.ClassModel.findByPk(id);
        if (!classItem) {
            return res.status(404).json({ message: 'Class not found' });
        }
        yield classItem.update({
            name,
            description,
            image,
            price,
            gender
        });
        return res.status(200).json(classItem);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error updating class', error });
    }
});
exports.updateClass = updateClass;
const deleteClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const classItem = yield model_1.ClassModel.findByPk(id);
        if (!classItem) {
            return res.status(404).json({ message: 'Class not found' });
        }
        yield classItem.destroy();
        return res.status(200).json({ message: 'Class deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error deleting class', error });
    }
});
exports.deleteClass = deleteClass;
// Trainer-Class Controllers
const addTrainerToClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { classId } = req.params;
        const { trainerId } = req.body;
        const classItem = yield model_1.ClassModel.findByPk(classId);
        if (!classItem) {
            return res.status(404).json({ message: 'Class not found' });
        }
        const trainerClassData = {
            trainerId,
            classId: parseInt(classId)
        };
        const trainerClass = yield model_1.TrainerClassModel.create(trainerClassData);
        return res.status(201).json(trainerClass);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error adding trainer to class', error });
    }
});
exports.addTrainerToClass = addTrainerToClass;
// Class Schedule Controllers
const addScheduleToClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { classId } = req.params;
        const { date, timeSlot, roomId } = req.body;
        const classItem = yield model_1.ClassModel.findByPk(classId);
        if (!classItem) {
            return res.status(404).json({ message: 'Class not found' });
        }
        const scheduleData = {
            classId: parseInt(classId),
            date,
            timeSlot,
            roomId
        };
        const schedule = yield model_1.ClassScheduleModel.create(scheduleData);
        return res.status(201).json(schedule);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error adding schedule to class', error });
    }
});
exports.addScheduleToClass = addScheduleToClass;
// Booking Controllers
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { traineeId, classScheduleId, price, paymentMethod } = req.body;
        const schedule = yield model_1.ClassScheduleModel.findByPk(classScheduleId);
        if (!schedule) {
            return res.status(404).json({ message: 'Class schedule not found' });
        }
        const bookingData = {
            traineeId,
            classScheduleId,
            price,
            paymentMethod
        };
        const booking = yield model_1.BookingModel.create(bookingData);
        return res.status(201).json(booking);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error creating booking', error });
    }
});
exports.createBooking = createBooking;
// Calendar Controller
const getClassCalendar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { classId, trainerId } = req.params;
        let whereClause = {};
        // Handle classId from params
        if (classId && classId !== 'undefined') {
            const classIdNum = parseInt(classId);
            if (isNaN(classIdNum)) {
                return res.status(400).json({ message: 'Invalid class ID' });
            }
            whereClause.classId = classIdNum;
        }
        // Handle trainerId filtering from params
        let classWhereClause = {};
        if (trainerId && trainerId !== 'undefined') {
            const trainerIdNum = parseInt(trainerId);
            if (isNaN(trainerIdNum)) {
                return res.status(400).json({ message: 'Invalid trainer ID' });
            }
            // Use the association method instead of raw query
            const trainer = yield model_2.default.findByPk(trainerIdNum, {
                include: [{
                        model: model_1.ClassModel,
                        as: 'classes',
                        through: { attributes: [] }
                    }]
            });
            if (!trainer) {
                return res.status(404).json({ message: 'Trainer not found' });
            }
            const classIds = trainer.classes.map((cls) => cls.id);
            if (classIds.length > 0) {
                classWhereClause.id = { [sequelize_1.Op.in]: classIds };
            }
            else {
                return res.status(200).json({
                    message: 'Class calendar fetched successfully',
                    data: []
                });
            }
        }
        const schedules = yield model_1.ClassScheduleModel.findAll({
            where: whereClause,
            include: [
                {
                    model: model_1.ClassModel,
                    where: Object.keys(classWhereClause).length > 0 ? classWhereClause : undefined,
                    attributes: ['id', 'name', 'description'],
                    include: [{
                            model: model_2.default,
                            as: 'trainers',
                            through: { attributes: [] },
                            attributes: ['id', 'name']
                        }]
                }
            ],
            order: [['date', 'ASC'], ['timeSlot', 'ASC']]
        });
        return res.status(200).json({
            message: 'Class calendar fetched successfully',
            data: schedules
        });
    }
    catch (error) {
        inspector_1.console.error('Error fetching class calendar:', error);
        return res.status(500).json({ message: 'Error fetching class calendar', error });
    }
});
exports.getClassCalendar = getClassCalendar;
