import { Router } from "express";
import { createUser, getAllUsers } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
});

/*
        {
            username: "sdfsdasdf",
            isAdmin: true
        }
*/
userRouter.post("/", async (req, res) => {
  const user = await createUser({
    username: req.body.username,
  });
  res.status(201); // created
  res.json(user);
});

export default userRouter;
