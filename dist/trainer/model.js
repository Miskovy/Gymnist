"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const model_1 = __importDefault(require("../major/model"));
const trainer_major_model_1 = __importDefault(require("../trainer/trainer-major.model"));
const model_2 = require("../location/model");
class TrainerModel extends sequelize_1.Model {
}
TrainerModel.init({
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
        allowNull: false,
    },
    gender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    birthDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        field: 'birth_date',
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    qrCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        field: 'qr_code',
    },
    barCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        field: 'bar_code',
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    countryId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: model_2.CountryModel,
            key: 'id',
        },
        field: 'country_id',
    },
    cityId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: model_2.CityModel,
            key: 'id',
        },
        field: 'city_id',
    },
    stateId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: model_2.StateModel,
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
        field: 'last_attendance',
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
        field: 'created_at',
    },
}, {
    sequelize: database_1.default,
    tableName: 'trainers',
    timestamps: true,
});
TrainerModel.belongsTo(model_2.CountryModel, {
    foreignKey: 'countryId',
    as: 'country'
});
TrainerModel.belongsTo(model_2.StateModel, {
    foreignKey: 'stateId',
    as: 'state'
});
TrainerModel.belongsTo(model_2.CityModel, {
    foreignKey: 'cityId',
    as: 'city'
});
TrainerModel.belongsToMany(model_1.default, {
    through: trainer_major_model_1.default,
    foreignKey: 'trainerId',
    otherKey: 'majorId',
    as: 'majors',
});
model_1.default.belongsToMany(TrainerModel, {
    through: trainer_major_model_1.default,
    foreignKey: 'majorId',
    otherKey: 'trainerId',
    as: 'trainers',
});
exports.default = TrainerModel;
