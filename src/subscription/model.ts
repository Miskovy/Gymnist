import { DataTypes, Model, Optional, ForeignKey, Association } from 'sequelize';
import sequelize from '../config/database';
import { Subscription } from '../types/subscription';
import TraineeModel from '../trainee/model';
import PackageModel from '../package/model';
import PaymentMethodModel from '../payment-method/model';

interface SubscriptionCreationAttributes extends Optional<Subscription, 'id'| 'createdAt' | 'updatedAt'> {}

export class SubscriptionModel extends Model<Subscription, SubscriptionCreationAttributes> implements Subscription {
  public id!: number;
  public traineeId!: ForeignKey<number>;
  public packageId!: ForeignKey<number>;
  public duration!: 'Monthly' | 'Quarterly' | 'Semi-Annually' | 'Annually';
  public price!: number;
  public paymentMethodId!: ForeignKey<number>;
  public startDate!: Date;
  public endDate!: Date;
  public remainingEntrance!: number;
  public isActive!: boolean;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly trainee?: TraineeModel;
  public readonly package?: PackageModel;
  public readonly paymentMethod?: PaymentMethodModel;

  public static associations: {
    trainee: Association<SubscriptionModel, TraineeModel>;
    package: Association<SubscriptionModel, PackageModel>;
    paymentMethod: Association<SubscriptionModel, PaymentMethodModel>;
  };
}

SubscriptionModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    traineeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'trainee_id',
      references: {
        model: 'trainees',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
    packageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'package_id',
      references: {
        model: 'packages',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
    duration: {
      type: DataTypes.ENUM('Monthly', 'Quarterly', 'Semi-Annually', 'Annually'),
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
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
    tableName: 'subscriptions',
    timestamps: true,
  }
);

// Define associations
SubscriptionModel.belongsTo(TraineeModel, {
  foreignKey: 'traineeId',
  as: 'trainee',
});

SubscriptionModel.belongsTo(PackageModel, {
  foreignKey: 'packageId',
  as: 'package',
});

SubscriptionModel.belongsTo(PaymentMethodModel, {
  foreignKey: 'paymentMethodId',
  as: 'paymentMethod',
});

export default SubscriptionModel;