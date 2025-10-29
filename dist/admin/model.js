"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPrivilegeModel = exports.PrivilegeModel = exports.AdminModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class AdminModel extends sequelize_1.Model {
}
exports.AdminModel = AdminModel;
AdminModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
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
    tableName: 'admins',
    timestamps: true,
});
class PrivilegeModel extends sequelize_1.Model {
}
exports.PrivilegeModel = PrivilegeModel;
PrivilegeModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    action: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
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
    tableName: 'privileges',
    timestamps: true,
});
class AdminPrivilegeModel extends sequelize_1.Model {
}
exports.AdminPrivilegeModel = AdminPrivilegeModel;
AdminPrivilegeModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    adminId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: AdminModel,
            key: 'id',
        },
    },
    privilegeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PrivilegeModel,
            key: 'id',
        },
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
    tableName: 'admin_privileges',
    timestamps: true,
});
AdminModel.belongsToMany(PrivilegeModel, {
    through: AdminPrivilegeModel,
    foreignKey: 'adminId',
    otherKey: 'privilegeId'
});
PrivilegeModel.belongsToMany(AdminModel, {
    through: AdminPrivilegeModel,
    foreignKey: 'privilegeId',
    otherKey: 'adminId'
});
AdminPrivilegeModel.belongsTo(AdminModel, { foreignKey: 'adminId' });
AdminPrivilegeModel.belongsTo(PrivilegeModel, { foreignKey: 'privilegeId' });
