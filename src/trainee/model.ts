import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { Trainee } from '../types/trainee';

interface TraineeCreationAttributes extends Optional<Trainee, 'id'> {}

class TraineeModel extends Model<Trainee, TraineeCreationAttributes> implements Trainee {
  public id!: number;
  public name!: string;
  public phone!: string;
  public email?: string;
  public gender?: string;
  public birthDate?: Date;
  public age?: number;
  public countryId?: number;
  public cityId?: number;
  public stateId?: number;
  public nationality?: string;
  public createdAt!: Date;
  public updatedAt!: Date;
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
      createdAt: '',
      updatedAt: ''
  },
  {
    sequelize,
    tableName: 'trainees',
    timestamps: true,
  }
);

export default TraineeModel;