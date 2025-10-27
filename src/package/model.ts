import { DataTypes, Model, Optional, ForeignKey, Association } from 'sequelize';
import sequelize from '../config/database';
import { Package } from '../types/package';
import PaymentMethodModel from '../payment-method/model'; 

interface PackageCreationAttributes extends Optional<Package, 'id' | 'createdAt' | 'updatedAt'> {}

export class PackageModel extends Model<Package, PackageCreationAttributes> implements Package {
  public id!: number;
  public name!: string;
  public maxEntranceCount!: number;
  public description!: string;
  public image?: string;
  public startDate!: Date;
  public endDate!: Date;
  public paymentMethodId!: ForeignKey<number>;
  public priceMonthly!: number;
  public priceQuarterly!: number;
  public priceSemiAnnually!: number;
  public priceAnnually!: number;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly paymentMethod?: PaymentMethodModel;

  public static associations: {
    paymentMethod: Association<PackageModel, PaymentMethodModel>;
  };
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
      references: {
        model: 'payment_methods',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
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

PackageModel.belongsTo(PaymentMethodModel, {
  foreignKey: 'paymentMethodId',
  as: 'paymentMethod',
});

export default PackageModel;