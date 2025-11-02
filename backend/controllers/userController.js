import UserModel from "../database/UserModel.js";

export async function getAllUsers() {
  const users = await UserModel.findAll();
  return users;
}

export async function createUser(userInput) {
  const newUser = await UserModel.create(userInput);
  return newUser;
}
