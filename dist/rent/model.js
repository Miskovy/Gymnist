"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const model_1 = __importDefault(require("../trainer/model"));
const model_2 = require("../room/model");
class RentModel extends sequelize_1.Model {
}
RentModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    roomId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: model_2.RoomModel,
            key: 'id',
        },
        field: 'room_id',
    },
    trainerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: model_1.default,
            key: 'id',
        },
        field: 'trainer_id',
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
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
        defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'created_at',
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'updated_at',
    },
}, {
    sequelize: database_1.default,
    tableName: 'rents',
    timestamps: true,
});
RentModel.belongsTo(model_2.RoomModel, {
    foreignKey: 'roomId',
    as: 'room'
});
RentModel.belongsTo(model_1.default, {
    foreignKey: 'trainerId',
    as: 'trainer'
});
exports.default = RentModel;
