import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database/database.sqlite",
});

export async function connectToDb() {
  try {
    await sequelize.sync({
      force: true, // Deletes the database
    });
    console.log("Conneted to db!");
  } catch (error) {
    console.log("Error connecting to db");
    console.log(error);
  }
}

export default sequelize;
