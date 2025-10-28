import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { Admin, Privilege, AdminPrivilege } from '../types/admin';

// Admin Model
interface AdminCreationAttributes extends Optional<Admin, 'id'> {}

class AdminModel extends Model<Admin, AdminCreationAttributes> implements Admin {
  public id!: number;
  public email!: string;
  public password!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

AdminModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'admins',
    timestamps: true,
  }
);

// Privilege Model
interface PrivilegeCreationAttributes extends Optional<Privilege, 'id'> {}

class PrivilegeModel extends Model<Privilege, PrivilegeCreationAttributes> implements Privilege {
  public id!: number;
  public name!: string;
  public action!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

PrivilegeModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'privileges',
    timestamps: true,
  }
);

// AdminPrivilege Model
interface AdminPrivilegeCreationAttributes extends Optional<AdminPrivilege, 'id'> {}

class AdminPrivilegeModel extends Model<AdminPrivilege, AdminPrivilegeCreationAttributes> implements AdminPrivilege {
  public id!: number;
  public adminId!: number;
  public privilegeId!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

AdminPrivilegeModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: AdminModel,
        key: 'id',
      },
    },
    privilegeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: PrivilegeModel,
        key: 'id',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'admin_privileges',
    timestamps: true,
  }
);

// Define associations
AdminModel.belongsToMany(PrivilegeModel, { 
  through: AdminPrivilegeModel,
  foreignKey: 'adminId',
  otherKey: 'privilegeId'
});

PrivilegeModel.belongsToMany(AdminModel, { 
  through: AdminPrivilegeModel,
  foreignKey: 'privilegeId',
  otherKey: 'adminId'
});

export { AdminModel, PrivilegeModel, AdminPrivilegeModel };