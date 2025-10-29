import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// Interface for Model attributes
interface ModelAttributes {
  id: number;
  name: string;
  // Add other attributes here
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface for creation attributes (optional fields during creation)
interface ModelCreationAttributes extends Optional<ModelAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// Model class definition
class ModelName extends Model<ModelAttributes, ModelCreationAttributes> implements ModelAttributes {
  public id!: number;
  public name!: string;
  // Add other attributes here
  public isActive!: boolean;
  
  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ModelName.init(
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
    // Add other fields here
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'model_names', // Change to actual table name
    timestamps: true,
  }
);

export default ModelName;