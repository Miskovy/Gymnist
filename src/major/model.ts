import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { Major } from '../types/major';

interface MajorCreationAttributes extends Optional<Major, 'id'| 'createdAt' | 'updatedAt'> {}

export class MajorModel extends Model<Major, MajorCreationAttributes> implements Major {
  public id!: number;
  public name!: string;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MajorModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
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
    tableName: 'majors',
    timestamps: true,
  }
);

export default MajorModel;