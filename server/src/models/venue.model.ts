import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import User from './user.model';

class Venue extends Model {
  public id!: string;
  public userId!: string;
  public name!: string;
  public address!: string;
  public city!: string;
  public state!: string;
  public country!: string;
  public venueType!: string;
  public capacity!: number;
  public contactName!: string;
  public contactEmail!: string;
  public contactPhone!: string;
  public website!: string;
  public notes!: string;
  public lastPerformedAt!: Date;
  public rating!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Venue.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    venueType: {
      type: DataTypes.STRING, // club, theater, festival, etc.
      allowNull: true,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    contactName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contactEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contactPhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    lastPerformedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER, // 1-5 rating
      allowNull: true,
      validate: {
        min: 1,
        max: 5,
      },
    },
  },
  {
    sequelize,
    modelName: 'venue',
    timestamps: true,
  }
);

// Set up associations
Venue.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default Venue;