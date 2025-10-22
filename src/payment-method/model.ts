import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { PaymentMethod } from '../types/payment-method';

interface PaymentMethodCreationAttributes extends Optional<PaymentMethod, 'id' | 'createdAt' | 'updatedAt'> {}

export class PaymentMethodModel extends Model<PaymentMethod, PaymentMethodCreationAttributes> implements PaymentMethod {
  public id!: number;
  public name!: string;
  public image?: string;
  public description?: string;
  public isActive!: boolean;
  public type!: 'Auto' | 'Manual';
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PaymentMethodModel.init(
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
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_active',
    },
    type: {
      type: DataTypes.ENUM('Auto', 'Manual'),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'payment_methods',
    timestamps: true,
  }
);

export default PaymentMethodModel;