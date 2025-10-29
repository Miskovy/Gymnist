"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = exports.City = exports.Country = exports.StateModel = exports.CityModel = exports.CountryModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class CountryModel extends sequelize_1.Model {
}
exports.CountryModel = CountryModel;
exports.Country = CountryModel;
CountryModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    tableName: 'countries',
    timestamps: true,
});
class CityModel extends sequelize_1.Model {
}
exports.CityModel = CityModel;
exports.City = CityModel;
CityModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    countryId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'country_id',
    },
}, {
    sequelize: database_1.default,
    tableName: 'cities',
    timestamps: true,
});
class StateModel extends sequelize_1.Model {
}
exports.StateModel = StateModel;
exports.State = StateModel;
StateModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    cityId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'city_id',
    },
}, {
    sequelize: database_1.default,
    tableName: 'states',
    timestamps: true,
});
// Define associations
CountryModel.hasMany(CityModel, { foreignKey: 'countryId' });
CityModel.belongsTo(CountryModel, { foreignKey: 'countryId' });
CityModel.hasMany(StateModel, { foreignKey: 'cityId' });
StateModel.belongsTo(CityModel, { foreignKey: 'cityId' });
