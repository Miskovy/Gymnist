import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { Country, City, State } from '../types/location';

// Country Model
interface CountryCreationAttributes extends Optional<Country, 'id' | 'createdAt' | 'updatedAt'> {}

export class CountryModel extends Model<Country, CountryCreationAttributes> implements Country {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CountryModel.init(
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
  },
  {
    sequelize,
    tableName: 'countries',
    timestamps: true,
  }
);

// City Model
interface CityCreationAttributes extends Optional<City, 'id' | 'createdAt' | 'updatedAt'> {}

export class CityModel extends Model<City, CityCreationAttributes> implements City {
  public id!: number;
  public name!: string;
  public countryId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CityModel.init(
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
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'country_id',
    },
  },
  {
    sequelize,
    tableName: 'cities',
    timestamps: true,
  }
);

// State Model
interface StateCreationAttributes extends Optional<State, 'id' | 'createdAt' | 'updatedAt'> {}

export class StateModel extends Model<State, StateCreationAttributes> implements State {
  public id!: number;
  public name!: string;
  public cityId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

StateModel.init(
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
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'city_id',
    },
  },
  {
    sequelize,
    tableName: 'states',
    timestamps: true,
  }
);

// Define associations
CountryModel.hasMany(CityModel, { foreignKey: 'countryId' });
CityModel.belongsTo(CountryModel, { foreignKey: 'countryId' });

CityModel.hasMany(StateModel, { foreignKey: 'cityId' });
StateModel.belongsTo(CityModel, { foreignKey: 'cityId' });

export { CountryModel as Country, CityModel as City, StateModel as State };