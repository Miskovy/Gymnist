"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainerMajorModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class TrainerMajorModel extends sequelize_1.Model {
}
exports.TrainerMajorModel = TrainerMajorModel;
TrainerMajorModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    trainerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'trainer_id',
        references: {
            model: 'trainers',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    majorId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'major_id',
        references: {
            model: 'majors',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    tableName: 'trainer_majors',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['trainer_id', 'major_id']
        }
    ]
});
exports.default = TrainerMajorModel;
