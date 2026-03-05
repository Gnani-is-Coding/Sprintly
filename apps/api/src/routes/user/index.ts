import { Router } from "express";
import DB from "../../services/db";

const userRouter = Router();

userRouter.get("/", (_, res) => {
  const allUsersInDb = DB.getAllItems();

  res.send({ data: allUsersInDb });
});

userRouter.post("/me", (req, res) => {
  const userDetails = DB.get(req.body.userName);
  if (userDetails) {
    res.send({ data: userDetails });
  } else {
    res.status(400).send({ data: "User doesnt Exits" });
  }
});

export default userRouter;
