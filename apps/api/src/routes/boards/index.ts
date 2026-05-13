import { Router } from "express";
import { requestValidator } from "../../utils";
import { boardSchema } from "@sprintly/shared/schemas";
import { prisma } from "../../lib/prisma";

const boardsRouter = Router();

boardsRouter.get("/", () => {});

boardsRouter.post("/", async (req, res) => {
  const validatorRes = requestValidator(boardSchema, req.body, res);
  if (!validatorRes.status) return;

  const boardData = await prisma.board.create({
    data: validatorRes.value,
  });

  res.send({
    data: boardData,
    status: "success",
  });
});

export default boardsRouter;
