"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const model_1 = __importDefault(require("../trainee/model"));
const model_2 = __importDefault(require("../package/model"));
const model_3 = __importDefault(require("../payment-method/model"));
class SubscriptionModel extends sequelize_1.Model {
}
exports.SubscriptionModel = SubscriptionModel;
SubscriptionModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    traineeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'trainee_id',
        references: {
            model: 'trainees',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
    },
    packageId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'package_id',
        references: {
            model: 'packages',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
    },
    duration: {
        type: sequelize_1.DataTypes.ENUM('Monthly', 'Quarterly', 'Semi-Annually', 'Annually'),
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    paymentMethodId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'payment_method_id',
        references: {
            model: 'payment_methods',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
    },
    startDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        field: 'start_date',
    },
    endDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        field: 'end_date',
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
        field: 'created_at',
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
        field: 'updated_at',
    },
}, {
    sequelize: database_1.default,
    tableName: 'subscriptions',
    timestamps: true,
});
// Define associations
SubscriptionModel.belongsTo(model_1.default, {
    foreignKey: 'traineeId',
    as: 'trainee',
});
SubscriptionModel.belongsTo(model_2.default, {
    foreignKey: 'packageId',
    as: 'package',
});
SubscriptionModel.belongsTo(model_3.default, {
    foreignKey: 'paymentMethodId',
    as: 'paymentMethod',
});
exports.default = SubscriptionModel;
