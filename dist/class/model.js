"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModel = exports.TrainerClassModel = exports.ClassScheduleModel = exports.ClassModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const model_1 = __importDefault(require("../trainer/model"));
const model_2 = __importDefault(require("../trainee/model"));
class ClassModel extends sequelize_1.Model {
}
exports.ClassModel = ClassModel;
ClassModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    gender: {
        type: sequelize_1.DataTypes.ENUM('mix', 'male', 'female'),
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
    tableName: 'classes',
    timestamps: true,
});
class ClassScheduleModel extends sequelize_1.Model {
}
exports.ClassScheduleModel = ClassScheduleModel;
ClassScheduleModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    classId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'classes',
            key: 'id',
        },
    },
    date: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    timeSlot: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    roomId: {
        type: sequelize_1.DataTypes.INTEGER,
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
    tableName: 'class_schedules',
    timestamps: true,
});
class TrainerClassModel extends sequelize_1.Model {
}
exports.TrainerClassModel = TrainerClassModel;
TrainerClassModel.init({
    trainerId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'trainers',
            key: 'id',
        },
    },
    classId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'classes',
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
    tableName: 'trainer_classes',
    timestamps: true,
});
class BookingModel extends sequelize_1.Model {
}
exports.BookingModel = BookingModel;
BookingModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    traineeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'trainees',
            key: 'id',
        },
    },
    classScheduleId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'class_schedules',
            key: 'id',
        },
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    paymentMethod: {
        type: sequelize_1.DataTypes.STRING,
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
    tableName: 'bookings',
    timestamps: true,
});
ClassModel.hasMany(ClassScheduleModel, {
    foreignKey: 'classId',
    as: 'schedules'
});
ClassScheduleModel.belongsTo(ClassModel, {
    foreignKey: 'classId',
    as: 'class'
});
// Class - Trainer (Many-to-Many through TrainerClass)
ClassModel.belongsToMany(model_1.default, {
    through: TrainerClassModel,
    foreignKey: 'classId',
    otherKey: 'trainerId',
    as: 'trainers'
});
model_1.default.belongsToMany(ClassModel, {
    through: TrainerClassModel,
    foreignKey: 'trainerId',
    otherKey: 'classId',
    as: 'classes'
});
// TrainerClass associations
TrainerClassModel.belongsTo(ClassModel, {
    foreignKey: 'classId',
    as: 'class'
});
TrainerClassModel.belongsTo(model_1.default, {
    foreignKey: 'trainerId',
    as: 'trainer'
});
// ClassSchedule - Booking (One-to-Many)
ClassScheduleModel.hasMany(BookingModel, {
    foreignKey: 'classScheduleId',
    as: 'bookings'
});
BookingModel.belongsTo(ClassScheduleModel, {
    foreignKey: 'classScheduleId',
    as: 'schedule'
});
// Booking - Trainee (Many-to-One)
BookingModel.belongsTo(model_2.default, {
    foreignKey: 'traineeId',
    as: 'trainee'
});
model_2.default.hasMany(BookingModel, {
    foreignKey: 'traineeId',
    as: 'bookings'
});
