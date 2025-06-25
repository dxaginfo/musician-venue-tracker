import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import User from './user.model';
import Venue from './venue.model';

class Interaction extends Model {
  public id!: string;
  public userId!: string;
  public venueId!: string;
  public interactionType!: string; // email, call, meeting, etc.
  public date!: Date;
  public contactName!: string;
  public contactEmail!: string;
  public contactPhone!: string;
  public notes!: string;
  public followUpDate!: Date;
  public outcome!: string;
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
    interactionType: {
      type: DataTypes.STRING, // email, call, meeting, etc.
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
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
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    followUpDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    outcome: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'interaction',
    timestamps: true,
  }
);

// Set up associations
Interaction.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Interaction.belongsTo(Venue, { foreignKey: 'venueId', as: 'venue' });

export default Interaction;