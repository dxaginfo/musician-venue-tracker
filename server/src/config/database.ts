import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const dbName = process.env.DB_NAME || 'venuetracker';
const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || 'postgres';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = parseInt(process.env.DB_PORT || '5432');
const dbDialect = process.env.DB_DIALECT || 'postgres';

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: dbDialect as 'postgres' | 'mysql' | 'mariadb' | 'sqlite' | 'mssql',
  logging: process.env.NODE_ENV === 'development',
  define: {
    underscored: true,
  },
});
