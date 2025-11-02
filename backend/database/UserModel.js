import sequelize from "./database.js";
import { DataTypes } from "sequelize";

const UserModel = sequelize.define("User", {
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
