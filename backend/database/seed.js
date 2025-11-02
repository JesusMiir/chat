import UserModel from "./UserModel.js";

const users = [{ username: "jesus" }, { username: "doug" }];

async function seed() {
  await Promise.all(
    users.map(async (u) => {
      await UserModel.create(u);
    })
  );
}

export default seed;
