import { Router } from "express";
import { prisma } from "../../lib/prisma";
import authorise from "../../middlewares/authorise";

const userRouter = Router();

const sensitiveFields = {
  refreshToken: true,
  password: true,
};

userRouter.get("/", authorise, async (_, res) => {
  const allUsersInDb = await prisma.user.findMany({
    omit: sensitiveFields,
  });

  res.send({ data: allUsersInDb });
});

userRouter.get("/me", authorise, async (req, res) => {
  const userDetails = await prisma.user.findUnique({
    where: { email: req.body?.email },
    omit: sensitiveFields,
  });

  if (userDetails) {
    res.send({ data: userDetails });
  } else {
    res.status(400).send({ data: "User doesnt Exits" });
  }
});

export default userRouter;
