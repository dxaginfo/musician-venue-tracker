import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import User from './user.model';
import Venue from './venue.model';

class Performance extends Model {
  public id!: string;
  public userId!: string;
  public venueId!: string;
  public date!: Date;
  public startTime!: string;
  public endTime!: string;
  public eventName!: string;
  public description!: string;
  public audienceSize!: number;
  public payment!: number;
  public isHeadliner!: boolean;
  public otherActs!: string;
  public setlistId!: string;
  public isCancelled!: boolean;
  public cancellationReason!: string;
  public notes!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Performance.init(
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
    venueId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'venues',
        key: 'id',
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    audienceSize: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    payment: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    isHeadliner: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    otherActs: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    setlistId: {
      type: DataTypes.STRING, // Reference to external setlist service
      allowNull: true,
    },
    isCancelled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    cancellationReason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'performance',
    timestamps: true,
  }
);

// Set up associations
Performance.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Performance.belongsTo(Venue, { foreignKey: 'venueId', as: 'venue' });

export default Performance;