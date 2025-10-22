import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { Trainer } from '../types';

// Interface for creation attributes (optional fields during creation)
interface TrainerCreationAttributes extends Optional<Trainer, 'id' | 'createdAt' | 'updatedAt'> {}

// Model class definition
class TrainerModel extends Model<Trainer, TrainerCreationAttributes> implements Trainer {
  public id!: number;
  public name!: string;
  public phone!: string;
  public email?: string;
  public gender?: string;
  public birthDate?: Date;
  public age?: number;
  public qrCode?: string;
  public image?: string;
  public countryId?: number;
  public cityId?: number;
  public stateId?: number;
  public nationality?: string;
  public isActive!: boolean;
  public majorId?: number;
  
  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
    gender: {
      type: DataTypes.STRING,
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
    qrCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
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
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    majorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'trainers',
    timestamps: true,
  }
);

export default TrainerModel;