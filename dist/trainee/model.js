"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const model_1 = require("../location/model");
class TraineeModel extends sequelize_1.Model {
}
TraineeModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    qrCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    barCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    gender: {
        type: sequelize_1.DataTypes.ENUM('male', 'female'),
        allowNull: true,
    },
    birthDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    countryId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: model_1.CountryModel,
            key: 'id',
        },
        field: 'country_id',
    },
    cityId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: model_1.CityModel,
            key: 'id',
        },
        field: 'city_id',
    },
    stateId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: model_1.StateModel,
            key: 'id',
        },
        field: 'state_id',
    },
    nationality: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    lastAttendance: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: database_1.default,
    tableName: 'trainees',
    timestamps: true,
});
TraineeModel.belongsTo(model_1.CountryModel, {
    foreignKey: 'countryId',
    as: 'country'
});
TraineeModel.belongsTo(model_1.StateModel, {
    foreignKey: 'stateId',
    as: 'state'
});
TraineeModel.belongsTo(model_1.CityModel, {
    foreignKey: 'cityId',
    as: 'city'
});
exports.default = TraineeModel;
