"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const model_1 = __importDefault(require("../payment-method/model"));
class PackageModel extends sequelize_1.Model {
}
exports.PackageModel = PackageModel;
PackageModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    maxEntranceCount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'max_entrance_count',
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
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
    priceMonthly: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        field: 'price_monthly',
    },
    priceQuarterly: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        field: 'price_quarterly',
    },
    priceSemiAnnually: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        field: 'price_semi_annually',
    },
    priceAnnually: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        field: 'price_annually',
    },
}, {
    sequelize: database_1.default,
    tableName: 'packages',
    timestamps: true,
});
PackageModel.belongsTo(model_1.default, {
    foreignKey: 'paymentMethodId',
    as: 'paymentMethod',
});
exports.default = PackageModel;
