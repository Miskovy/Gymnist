const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Import any related models if needed
// const RelatedModel = require('../related-module/model');

const ModelName = sequelize.define('ModelName', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // Add your model fields here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Add more fields as needed
  
  // Example of a field with custom database column name
  customField: {
    type: DataTypes.STRING,
    field: 'custom_field_name'
  },
  
  // Example of an enum field
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  }
}, {
  tableName: 'table_name', // Database table name
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Define associations
// ModelName.belongsTo(RelatedModel, { foreignKey: 'related_model_id' });

module.exports = ModelName;