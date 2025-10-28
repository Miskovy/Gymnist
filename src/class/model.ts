import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { Class, ClassSchedule, TrainerClass, Booking } from '../types/class';
import TrainerModel from '../trainer/model';
import TraineeModel from '../trainee/model';


interface ClassCreationAttributes extends Optional<Class, 'id' | 'createdAt' | 'updatedAt'> {}

class ClassModel extends Model<Class, ClassCreationAttributes> implements Class {
  public id!: number;
  public name!: string;
  public description?: string;
  public image?: string;
  public price!: number;
  public gender!: 'mix' | 'male' | 'female';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ClassModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM('mix', 'male', 'female'),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'classes',
    timestamps: true,
  }
);


interface ClassScheduleCreationAttributes extends Optional<ClassSchedule, 'id' | 'createdAt' | 'updatedAt'> {}

class ClassScheduleModel extends Model<ClassSchedule, ClassScheduleCreationAttributes> implements ClassSchedule {
  public id!: number;
  public classId!: number;
  public date!: Date;
  public timeSlot!: string;
  public roomId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ClassScheduleModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'classes',
        key: 'id',
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    timeSlot: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'class_schedules',
    timestamps: true,
  }
);


interface TrainerClassCreationAttributes extends Optional<TrainerClass, 'createdAt' | 'updatedAt'> {}

class TrainerClassModel extends Model<TrainerClass, TrainerClassCreationAttributes> implements TrainerClass {
  public trainerId!: number;
  public classId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TrainerClassModel.init(
  {
    trainerId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'trainers',
        key: 'id',
      },
    },
    classId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'classes',
        key: 'id',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'trainer_classes',
    timestamps: true,
  }
);


interface BookingCreationAttributes extends Optional<Booking, 'id' | 'createdAt' | 'updatedAt'> {}

class BookingModel extends Model<Booking, BookingCreationAttributes> implements Booking {
  public id!: number;
  public traineeId!: number;
  public classScheduleId!: number;
  public price!: number;
  public paymentMethod!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

BookingModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    traineeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'trainees', 
        key: 'id',
      },
    },
    classScheduleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'class_schedules',
        key: 'id',
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'bookings',
    timestamps: true,
  }
);

 ClassModel.hasMany(ClassScheduleModel, { 
    foreignKey: 'classId',
    as: 'schedules' 
  });
  ClassScheduleModel.belongsTo(ClassModel, { 
    foreignKey: 'classId',
    as: 'class' 
  });

  // Class - Trainer (Many-to-Many through TrainerClass)
  ClassModel.belongsToMany(TrainerModel, {
    through: TrainerClassModel,
    foreignKey: 'classId',
    otherKey: 'trainerId',
    as: 'trainers'
  });
  
  TrainerModel.belongsToMany(ClassModel, {
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

  TrainerClassModel.belongsTo(TrainerModel, { 
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
  BookingModel.belongsTo(TraineeModel, {
    foreignKey: 'traineeId',
    as: 'trainee'
  });
  
  TraineeModel.hasMany(BookingModel, {
    foreignKey: 'traineeId',
    as: 'bookings'
  });


export { ClassModel, ClassScheduleModel, TrainerClassModel, BookingModel };