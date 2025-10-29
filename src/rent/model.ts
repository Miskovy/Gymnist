import { DataTypes, Model, Optional, Association, Sequelize } from 'sequelize';
import sequelize from '../config/database';
import { Rent } from '../types/rent';
import TrainerModel from '../trainer/model';
import { RoomModel } from '../room/model';

interface RentCreationAttributes extends Optional<Rent, 'id' | 'createdAt' | 'updatedAt'> {}

class RentModel extends Model<Rent, RentCreationAttributes> implements Rent {
  public id!: number;
  public roomId!: number;
  public trainerId!: number;
  public price!: number;
  public startDate!: Date;
  public endDate!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly room?: RoomModel;
  public readonly trainer?: TrainerModel;

  public static associations: {
    room: Association<RentModel, RoomModel>;
    trainer: Association<RentModel, TrainerModel>;
  };
}

RentModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: RoomModel,
        key: 'id',
      },
      field: 'room_id',
    },
    trainerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TrainerModel,
        key: 'id',
      },
      field: 'trainer_id',
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'start_date',
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'end_date',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'updated_at',
    },
  },
  {
    sequelize,
    tableName: 'rents',
    timestamps: true,
  }
);

RentModel.belongsTo(RoomModel, {
  foreignKey: 'roomId',
  as: 'room'
});

RentModel.belongsTo(TrainerModel, {
  foreignKey: 'trainerId',
  as: 'trainer'
});

export default RentModel;