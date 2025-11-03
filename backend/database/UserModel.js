import databaseInstance from "./database.js";
import { DataTypes } from "sequelize";

const UserModel = databaseInstance.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default UserModel;
