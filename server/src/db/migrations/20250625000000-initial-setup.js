'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create Users table
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      role: {
        type: Sequelize.ENUM,
        values: ['user', 'admin'],
        defaultValue: 'user',
      },
      bandName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      genre: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      website: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      lastLogin: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      resetPasswordToken: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      resetPasswordExpire: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Create Venues table
    await queryInterface.createTable('venues', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      postalCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      website: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      venueType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bookingContactName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bookingContactEmail: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bookingContactPhone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      technicalContactName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      technicalContactEmail: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      technicalContactPhone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      hasBackline: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      hasSoundSystem: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      hasLighting: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      hasStage: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      stageDimensions: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      greenRoomInfo: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      loadInInfo: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      parkingInfo: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      accommodationInfo: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      nearbyFoodOptions: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      paymentTerms: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      additionalNotes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      rating: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
      },
      longitude: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      latitude: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Create Interactions table
    await queryInterface.createTable('interactions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      subject: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      outcome: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      followUpDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      contactName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contactEmail: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contactPhone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contactTitle: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isCompleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      attachments: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
      },
      venueId: {
        type: Sequelize.UUID,
        references: {
          model: 'venues',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Create Performances table
    await queryInterface.createTable('performances', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      startTime: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      endTime: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      eventName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      performanceType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      performanceFee: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
      },
      feeType: {
        type: Sequelize.STRING,
        defaultValue: 'flat',
      },
      guaranteeAmount: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
      },
      settlementNotes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      setLength: {
        type: Sequelize.INTEGER,
        defaultValue: 60,
      },
      ticketPrice: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
      },
      ticketsSold: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      attendance: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      soundcheckTime: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      loadInTime: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      loadOutTime: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      otherActs: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
      },
      promoterName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      promoterEmail: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      promoterPhone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isCancelled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      cancellationReason: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      performanceNotes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      equipmentNotes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      hospitalityNotes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      attachments: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
      },
      venueRating: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      soundRating: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      crowdRating: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      overallRating: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
      },
      venueId: {
        type: Sequelize.UUID,
        references: {
          model: 'venues',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Add indexes for improved query performance
    await queryInterface.addIndex('users', ['email']);
    await queryInterface.addIndex('venues', ['userId']);
    await queryInterface.addIndex('venues', ['city', 'country']);
    await queryInterface.addIndex('interactions', ['venueId']);
    await queryInterface.addIndex('interactions', ['userId']);
    await queryInterface.addIndex('interactions', ['date']);
    await queryInterface.addIndex('performances', ['venueId']);
    await queryInterface.addIndex('performances', ['userId']);
    await queryInterface.addIndex('performances', ['date']);
  },

  down: async (queryInterface, Sequelize) => {
    // Drop tables in reverse order to respect foreign key constraints
    await queryInterface.dropTable('performances');
    await queryInterface.dropTable('interactions');
    await queryInterface.dropTable('venues');
    await queryInterface.dropTable('users');
  }
};