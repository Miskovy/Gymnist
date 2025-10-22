import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { Room, RoomGallery } from '../types/room';

// Room Model
interface RoomCreationAttributes extends Optional<Room, 'id' | 'createdAt' | 'updatedAt'> {}

export class RoomModel extends Model<Room, RoomCreationAttributes> implements Room {
  public id!: number;
  public name!: string;
  public capacity!: number;
  public description?: string;
  public thumbnail?: string;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

RoomModel.init(
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
    capacity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'rooms',
    timestamps: true,
  }
);

// Room Gallery Model
interface RoomGalleryCreationAttributes extends Optional<RoomGallery, 'id' | 'createdAt' | 'updatedAt'> {}

export class RoomGalleryModel extends Model<RoomGallery, RoomGalleryCreationAttributes> implements RoomGallery {
  public id!: number;
  public roomId!: number;
  public image!: string;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

RoomGalleryModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'room_id',
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'room_galleries',
    timestamps: true,
  }
);

// Define associations
RoomModel.hasMany(RoomGalleryModel, { foreignKey: 'roomId' });
RoomGalleryModel.belongsTo(RoomModel, { foreignKey: 'roomId' });

export { RoomModel as Room, RoomGalleryModel as RoomGallery };