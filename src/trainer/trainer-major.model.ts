import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface TrainerMajorAttributes {
  id: number;
  trainerId: number;
  majorId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TrainerMajorCreationAttributes extends Optional<TrainerMajorAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class TrainerMajorModel extends Model<TrainerMajorAttributes, TrainerMajorCreationAttributes> implements TrainerMajorAttributes {
  public id!: number;
  public trainerId!: number;
  public majorId!: number;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TrainerMajorModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    trainerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'trainer_id',
      references: {
        model: 'trainers',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    majorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'major_id',
      references: {
        model: 'majors',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
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
    tableName: 'trainer_majors',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['trainer_id', 'major_id']
      }
    ]
  }
);

export default TrainerMajorModel;