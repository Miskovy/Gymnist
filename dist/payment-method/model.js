"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class PaymentMethodModel extends sequelize_1.Model {
}
exports.PaymentMethodModel = PaymentMethodModel;
PaymentMethodModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'is_active',
    },
    type: {
        type: sequelize_1.DataTypes.ENUM('Auto', 'Manual'),
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    tableName: 'payment_methods',
    timestamps: true,
});
exports.default = PaymentMethodModel;
