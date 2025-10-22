import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { Package } from '../types/package';

interface PackageCreationAttributes extends Optional<Package, 'id' | 'createdAt' | 'updatedAt'> {}

export class PackageModel extends Model<Package, PackageCreationAttributes> implements Package {
  public id!: number;
  public name!: string;
  public numOfMembers!: number;
  public maxEntranceCount!: number;
  public description!: string;
  public image?: string;
  public startDate!: Date;
  public endDate!: Date;
  public paymentMethodId!: number;
  public priceMonthly!: number;
  public priceQuarterly!: number;
  public priceSemiAnnually!: number;
  public priceAnnually!: number;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PackageModel.init(
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
    numOfMembers: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'num_of_members',
    },
    maxEntranceCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'max_entrance_count',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
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
    paymentMethodId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'payment_method_id',
    },
    priceMonthly: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: 'price_monthly',
    },
    priceQuarterly: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: 'price_quarterly',
    },
    priceSemiAnnually: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: 'price_semi_annually',
    },
    priceAnnually: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: 'price_annually',
    },
  },
  {
    sequelize,
    tableName: 'packages',
    timestamps: true,
  }
);

export default PackageModel;