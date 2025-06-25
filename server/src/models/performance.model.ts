import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/config';
import User from './user.model';
import Venue from './venue.model';

export interface PerformanceAttributes {
  id: string;
  date: Date;
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  eventName: string;
  description: string;
  performanceType: string; // headliner, opener, festival, private, etc.
  performanceFee: number;
  feeType: string; // flat, percentage, etc.
  guaranteeAmount: number;
  settlementNotes: string;
  setLength: number; // in minutes
  ticketPrice: number;
  ticketsSold: number;
  attendance: number;
  soundcheckTime: string; // HH:MM format
  loadInTime: string; // HH:MM format
  loadOutTime: string; // HH:MM format
  otherActs: string[];
  promoterName: string;
  promoterEmail: string;
  promoterPhone: string;
  isCancelled: boolean;
  cancellationReason: string;
  performanceNotes: string;
  equipmentNotes: string;
  hospitalityNotes: string;
  attachments: string[]; // URLs to stored files
  venueRating: number;
  soundRating: number;
  crowdRating: number;
  overallRating: number;
  tags: string[];
  venueId: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PerformanceCreationAttributes extends Omit<PerformanceAttributes, 'id'> {}

class Performance extends Model<PerformanceAttributes, PerformanceCreationAttributes> implements PerformanceAttributes {
  public id!: string;
  public date!: Date;
  public startTime!: string;
  public endTime!: string;
  public eventName!: string;
  public description!: string;
  public performanceType!: string;
  public performanceFee!: number;
  public feeType!: string;
  public guaranteeAmount!: number;
  public settlementNotes!: string;
  public setLength!: number;
  public ticketPrice!: number;
  public ticketsSold!: number;
  public attendance!: number;
  public soundcheckTime!: string;
  public loadInTime!: string;
  public loadOutTime!: string;
  public otherActs!: string[];
  public promoterName!: string;
  public promoterEmail!: string;
  public promoterPhone!: string;
  public isCancelled!: boolean;
  public cancellationReason!: string;
  public performanceNotes!: string;
  public equipmentNotes!: string;
  public hospitalityNotes!: string;
  public attachments!: string[];
  public venueRating!: number;
  public soundRating!: number;
  public crowdRating!: number;
  public overallRating!: number;
  public tags!: string[];
  public venueId!: string;
  public userId!: string;
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
    },
    performanceType: {
      type: DataTypes.STRING,
    },
    performanceFee: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    feeType: {
      type: DataTypes.STRING,
      defaultValue: 'flat',
    },
    guaranteeAmount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    settlementNotes: {
      type: DataTypes.TEXT,
    },
    setLength: {
      type: DataTypes.INTEGER,
      defaultValue: 60,
    },
    ticketPrice: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    ticketsSold: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    attendance: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    soundcheckTime: {
      type: DataTypes.STRING,
    },
    loadInTime: {
      type: DataTypes.STRING,
    },
    loadOutTime: {
      type: DataTypes.STRING,
    },
    otherActs: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    promoterName: {
      type: DataTypes.STRING,
    },
    promoterEmail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    promoterPhone: {
      type: DataTypes.STRING,
    },
    isCancelled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    cancellationReason: {
      type: DataTypes.TEXT,
    },
    performanceNotes: {
      type: DataTypes.TEXT,
    },
    equipmentNotes: {
      type: DataTypes.TEXT,
    },
    hospitalityNotes: {
      type: DataTypes.TEXT,
    },
    attachments: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    venueRating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5,
      },
    },
    soundRating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5,
      },
    },
    crowdRating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5,
      },
    },
    overallRating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5,
      },
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    venueId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'venues',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Performance',
    tableName: 'performances',
  }
);

// Associations
Performance.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Performance.belongsTo(Venue, { foreignKey: 'venueId', as: 'venue' });

export default Performance;