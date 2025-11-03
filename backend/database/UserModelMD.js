import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
});

const UserModel = model("user", userSchema, "users");

export default UserModel;
