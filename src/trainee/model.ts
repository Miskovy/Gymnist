import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { Trainee } from '../types/trainee';

interface TraineeCreationAttributes extends Optional<Trainee, 'id' | 'createdAt' | 'updatedAt'> {}

class TraineeModel extends Model<Trainee, TraineeCreationAttributes> implements Trainee {
  public id!: number;
  public name!: string;
  public phone!: string;
  public email?: string;
  public password?: string;
  public qrCode?: string;
  public image?: string;
  public barCode?: string;
  public gender?: string;
  public birthDate?: Date;
  public age?: number;
  public countryId?: number;
  public cityId?: number;
  public stateId?: number;
  public nationality?: string;
  public lastAttendance?: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TraineeModel.init(
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
          allowNull: true,
      },
      qrCode: {
          type: DataTypes.STRING,
          allowNull: true,
      },
      image: {
          type: DataTypes.STRING,
          allowNull: true,
      },
      barCode: {
          type: DataTypes.STRING,
          allowNull: true,
      },
      gender: {
          type: DataTypes.ENUM('male', 'female', 'other'),
          allowNull: true,
      },
      birthDate: {
          type: DataTypes.DATE,
          allowNull: true,
      },
      age: {
          type: DataTypes.INTEGER,
          allowNull: true,
      },
      countryId: {
          type: DataTypes.INTEGER,
          allowNull: true,
      },
      cityId: {
          type: DataTypes.INTEGER,
          allowNull: true,
      },
      stateId: {
          type: DataTypes.INTEGER,
          allowNull: true,
      },
      nationality: {
          type: DataTypes.STRING,
          allowNull: true,
      },
      lastAttendance: {
          type: DataTypes.DATE,
          allowNull: true,
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
    tableName: 'trainees',
    timestamps: true,
  }
);

export default TraineeModel;