import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: process.env.DB_HOST as string,
    dialect: process.env.DB_DIALECT as "postgres",
    dialectOptions: {
      useUTC: false,
      timezone: "Etc/GMT+0",
    },
    define: {
      timestamps: false,
    },
  }
);
