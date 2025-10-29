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
exports.getActiveSubscriptions = exports.getSubscriptionsByTrainee = exports.deleteSubscription = exports.updateSubscription = exports.createSubscription = exports.getSubscriptionById = exports.getAllSubscriptions = void 0;
const model_1 = __importDefault(require("./model"));
const model_2 = __importDefault(require("../trainee/model"));
const model_3 = __importDefault(require("../package/model"));
const model_4 = __importDefault(require("../payment-method/model"));
const getAllSubscriptions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscriptions = yield model_1.default.findAll({
            include: [
                {
                    model: model_2.default,
                    as: 'trainee',
                    attributes: ['id', 'name', 'email', 'phone']
                },
                {
                    model: model_3.default,
                    as: 'package',
                    attributes: ['id', 'name', 'maxEntranceCount']
                },
                {
                    model: model_4.default,
                    as: 'paymentMethod',
                    attributes: ['id', 'name', 'type']
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        return res.status(200).json(subscriptions);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching subscriptions', error });
    }
});
exports.getAllSubscriptions = getAllSubscriptions;
const getSubscriptionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscription = yield model_1.default.findByPk(req.params.id, {
            include: [
                {
                    model: model_2.default,
                    as: 'trainee',
                    attributes: ['id', 'name', 'email', 'phone']
                },
                {
                    model: model_3.default,
                    as: 'package',
                    attributes: ['id', 'name', 'maxEntranceCount', 'description']
                },
                {
                    model: model_4.default,
                    as: 'paymentMethod',
                    attributes: ['id', 'name', 'type']
                }
            ]
        });
        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        return res.status(200).json(subscription);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching subscription', error });
    }
});
exports.getSubscriptionById = getSubscriptionById;
const createSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { traineeId, packageId, duration, price, paymentMethodId, startDate, endDate, remainingEntrance } = req.body;
        const trainee = yield model_2.default.findByPk(traineeId);
        if (!trainee) {
            return res.status(404).json({ message: 'Trainee not found' });
        }
        const packageItem = yield model_3.default.findByPk(packageId);
        if (!packageItem) {
            return res.status(404).json({ message: 'Package not found' });
        }
        const paymentMethod = yield model_4.default.findByPk(paymentMethodId);
        if (!paymentMethod) {
            return res.status(404).json({ message: 'Payment method not found' });
        }
        const subscription = yield model_1.default.create({
            traineeId,
            packageId,
            duration,
            price,
            paymentMethodId,
            startDate: new Date(startDate),
            endDate: new Date(endDate)
        });
        const createdSubscription = yield model_1.default.findByPk(subscription.id, {
            include: [
                {
                    model: model_2.default,
                    as: 'trainee',
                    attributes: ['id', 'name', 'email', 'phone']
                },
                {
                    model: model_3.default,
                    as: 'package',
                    attributes: ['id', 'name', 'maxEntranceCount']
                },
                {
                    model: model_4.default,
                    as: 'paymentMethod',
                    attributes: ['id', 'name', 'type']
                }
            ]
        });
        return res.status(201).json(createdSubscription);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error creating subscription', error });
    }
});
exports.createSubscription = createSubscription;
const updateSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const subscription = yield model_1.default.findByPk(id);
        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        const { traineeId, packageId, duration, price, paymentMethodId, startDate, endDate, remainingEntrance, isActive } = req.body;
        const updateData = {};
        if (traineeId !== undefined) {
            const trainee = yield model_2.default.findByPk(traineeId);
            if (!trainee) {
                return res.status(404).json({ message: 'Trainee not found' });
            }
            updateData.traineeId = traineeId;
        }
        if (packageId !== undefined) {
            const packageItem = yield model_3.default.findByPk(packageId);
            if (!packageItem) {
                return res.status(404).json({ message: 'Package not found' });
            }
            updateData.packageId = packageId;
        }
        if (paymentMethodId !== undefined) {
            const paymentMethod = yield model_4.default.findByPk(paymentMethodId);
            if (!paymentMethod) {
                return res.status(404).json({ message: 'Payment method not found' });
            }
            updateData.paymentMethodId = paymentMethodId;
        }
        if (duration !== undefined)
            updateData.duration = duration;
        if (price !== undefined)
            updateData.price = price;
        if (startDate !== undefined)
            updateData.startDate = new Date(startDate);
        if (endDate !== undefined)
            updateData.endDate = new Date(endDate);
        yield model_1.default.update(updateData, { where: { id } });
        const updatedSubscription = yield model_1.default.findByPk(id, {
            include: [
                {
                    model: model_2.default,
                    as: 'trainee',
                    attributes: ['id', 'name', 'email', 'phone']
                },
                {
                    model: model_3.default,
                    as: 'package',
                    attributes: ['id', 'name', 'maxEntranceCount']
                },
                {
                    model: model_4.default,
                    as: 'paymentMethod',
                    attributes: ['id', 'name', 'type']
                }
            ]
        });
        return res.status(200).json({
            message: 'Subscription updated successfully',
            data: updatedSubscription
        });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error updating subscription', error });
    }
});
exports.updateSubscription = updateSubscription;
const deleteSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield model_1.default.destroy({
            where: { id: req.params.id }
        });
        if (deleted === 0) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        return res.status(200).json({ message: 'Subscription deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error deleting subscription', error });
    }
});
exports.deleteSubscription = deleteSubscription;
// Additional utility controllers
const getSubscriptionsByTrainee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscriptions = yield model_1.default.findAll({
            where: { traineeId: req.params.traineeId },
            include: [
                {
                    model: model_3.default,
                    as: 'package',
                    attributes: ['id', 'name', 'maxEntranceCount']
                },
                {
                    model: model_4.default,
                    as: 'paymentMethod',
                    attributes: ['id', 'name', 'type']
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        return res.status(200).json(subscriptions);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching trainee subscriptions', error });
    }
});
exports.getSubscriptionsByTrainee = getSubscriptionsByTrainee;
const getActiveSubscriptions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscriptions = yield model_1.default.findAll({
            include: [
                {
                    model: model_2.default,
                    as: 'trainee',
                    attributes: ['id', 'name', 'email', 'phone']
                },
                {
                    model: model_3.default,
                    as: 'package',
                    attributes: ['id', 'name', 'maxEntranceCount']
                }
            ],
            order: [['endDate', 'ASC']]
        });
        return res.status(200).json(subscriptions);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching active subscriptions', error });
    }
});
exports.getActiveSubscriptions = getActiveSubscriptions;
