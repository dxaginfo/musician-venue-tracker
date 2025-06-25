import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/config';
import User from './user.model';

export interface VenueAttributes {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
  website: string;
  capacity: number;
  venueType: string;
  bookingContactName: string;
  bookingContactEmail: string;
  bookingContactPhone: string;
  technicalContactName: string;
  technicalContactEmail: string;
  technicalContactPhone: string;
  hasBackline: boolean;
  hasSoundSystem: boolean;
  hasLighting: boolean;
  hasStage: boolean;
  stageDimensions: string;
  greenRoomInfo: string;
  loadInInfo: string;
  parkingInfo: string;
  accommodationInfo: string;
  nearbyFoodOptions: string;
  paymentTerms: string;
  additionalNotes: string;
  rating: number;
  isActive: boolean;
  tags: string[];
  longitude: number;
  latitude: number;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface VenueCreationAttributes extends Omit<VenueAttributes, 'id'> {}

class Venue extends Model<VenueAttributes, VenueCreationAttributes> implements VenueAttributes {
  public id!: string;
  public name!: string;
  public address!: string;
  public city!: string;
  public state!: string;
  public country!: string;
  public postalCode!: string;
  public phoneNumber!: string;
  public email!: string;
  public website!: string;
  public capacity!: number;
  public venueType!: string;
  public bookingContactName!: string;
  public bookingContactEmail!: string;
  public bookingContactPhone!: string;
  public technicalContactName!: string;
  public technicalContactEmail!: string;
  public technicalContactPhone!: string;
  public hasBackline!: boolean;
  public hasSoundSystem!: boolean;
  public hasLighting!: boolean;
  public hasStage!: boolean;
  public stageDimensions!: string;
  public greenRoomInfo!: string;
  public loadInInfo!: string;
  public parkingInfo!: string;
  public accommodationInfo!: string;
  public nearbyFoodOptions!: string;
  public paymentTerms!: string;
  public additionalNotes!: string;
  public rating!: number;
  public isActive!: boolean;
  public tags!: string[];
  public longitude!: number;
  public latitude!: number;
  public userId!: string;
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    website: {
      type: DataTypes.STRING,
    },
    capacity: {
      type: DataTypes.INTEGER,
    },
    venueType: {
      type: DataTypes.STRING, // e.g., club, theater, arena, festival, bar
    },
    bookingContactName: {
      type: DataTypes.STRING,
    },
    bookingContactEmail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    bookingContactPhone: {
      type: DataTypes.STRING,
    },
    technicalContactName: {
      type: DataTypes.STRING,
    },
    technicalContactEmail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    technicalContactPhone: {
      type: DataTypes.STRING,
    },
    hasBackline: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    hasSoundSystem: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    hasLighting: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    hasStage: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    stageDimensions: {
      type: DataTypes.STRING,
    },
    greenRoomInfo: {
      type: DataTypes.TEXT,
    },
    loadInInfo: {
      type: DataTypes.TEXT,
    },
    parkingInfo: {
      type: DataTypes.TEXT,
    },
    accommodationInfo: {
      type: DataTypes.TEXT,
    },
    nearbyFoodOptions: {
      type: DataTypes.TEXT,
    },
    paymentTerms: {
      type: DataTypes.TEXT,
    },
    additionalNotes: {
      type: DataTypes.TEXT,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5,
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
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
    modelName: 'Venue',
    tableName: 'venues',
  }
);

// Associations
Venue.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default Venue;