"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomGallery = exports.Room = exports.RoomGalleryModel = exports.RoomModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class RoomModel extends sequelize_1.Model {
}
exports.RoomModel = RoomModel;
exports.Room = RoomModel;
RoomModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    capacity: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    thumbnail: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: database_1.default,
    tableName: 'rooms',
    timestamps: true,
});
class RoomGalleryModel extends sequelize_1.Model {
}
exports.RoomGalleryModel = RoomGalleryModel;
exports.RoomGallery = RoomGalleryModel;
RoomGalleryModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    roomId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'room_id',
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    tableName: 'room_galleries',
    timestamps: true,
});
RoomModel.hasMany(RoomGalleryModel, {
    foreignKey: 'roomId',
    as: 'gallery'
});
RoomGalleryModel.belongsTo(RoomModel, {
    foreignKey: 'roomId',
    as: 'room'
});
