import { DataTypes, Model, Optional, Association } from 'sequelize';
import sequelize from '../config/database';
import { Trainer } from '../types/trainer';
import MajorModel from '../major/model';
import TrainerMajorModel from '../trainer/trainer-major.model';

interface TrainerCreationAttributes extends Optional<Trainer, 'id' | 'createdAt' | 'updatedAt'> {}

class TrainerModel extends Model<Trainer, TrainerCreationAttributes> implements Trainer {
  public id!: number;
  public name!: string;
  public phone!: string;
  public email?: string;
  public password!: string;
  public gender?: string;
  public birthDate?: Date;
  public age?: number;
  public qrCode?: string;
  public barCode?: string;
  public image?: string;
  public countryId?: number;
  public cityId?: number;
  public stateId?: number;
  public nationality?: string;
  public lastAttendance?: Date;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly majors?: MajorModel[];

  public static associations: {
    majors: Association<TrainerModel, MajorModel>;
  };
}

TrainerModel.init(
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
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'birth_date',
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    qrCode: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'qr_code',
    },
    barCode: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'bar_code',
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'country_id',
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'city_id',
    },
    stateId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'state_id',
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastAttendance: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'last_attendance',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'updated_at',
    },
  },
  {
    sequelize,
    tableName: 'trainers',
    timestamps: true,
  }
);

TrainerModel.belongsToMany(MajorModel, {
  through: TrainerMajorModel,
  foreignKey: 'trainerId',
  otherKey: 'majorId',
  as: 'majors',
});

MajorModel.belongsToMany(TrainerModel, {
  through: TrainerMajorModel,
  foreignKey: 'majorId',
  otherKey: 'trainerId',
  as: 'trainers',
});

export default TrainerModel;