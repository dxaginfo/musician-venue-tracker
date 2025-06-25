import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/config';
import User from './user.model';
import Venue from './venue.model';

export interface InteractionAttributes {
  id: string;
  type: string; // email, call, meeting, message, other
  date: Date;
  subject: string;
  description: string;
  outcome: string;
  followUpDate: Date | null;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactTitle: string;
  isCompleted: boolean;
  attachments: string[]; // URLs to stored files
  notes: string;
  tags: string[];
  venueId: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface InteractionCreationAttributes extends Omit<InteractionAttributes, 'id'> {}

class Interaction extends Model<InteractionAttributes, InteractionCreationAttributes> implements InteractionAttributes {
  public id!: string;
  public type!: string;
  public date!: Date;
  public subject!: string;
  public description!: string;
  public outcome!: string;
  public followUpDate!: Date | null;
  public contactName!: string;
  public contactEmail!: string;
  public contactPhone!: string;
  public contactTitle!: string;
  public isCompleted!: boolean;
  public attachments!: string[];
  public notes!: string;
  public tags!: string[];
  public venueId!: string;
  public userId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Interaction.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['email', 'call', 'meeting', 'message', 'other']],
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    outcome: {
      type: DataTypes.TEXT,
    },
    followUpDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    contactName: {
      type: DataTypes.STRING,
    },
    contactEmail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    contactPhone: {
      type: DataTypes.STRING,
    },
    contactTitle: {
      type: DataTypes.STRING,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    attachments: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    notes: {
      type: DataTypes.TEXT,
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
    modelName: 'Interaction',
    tableName: 'interactions',
  }
);

// Associations
Interaction.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Interaction.belongsTo(Venue, { foreignKey: 'venueId', as: 'venue' });

export default Interaction;