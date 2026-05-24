import { Router } from "express";
import { requestValidator } from "../../utils";
import { boardCreateSchema, boardUpdateSchema } from "@sprintly/shared/schemas";
import { prisma } from "../../lib/prisma";
import { commonApiResponseBuilder } from "../../commons/genericApiResponse";
import authorise from "../../middlewares/authorise";

const boardsRouter = Router();

// read
boardsRouter.get("/", authorise, async (req, res) => {
  const { id } = req.body;

  if (!id) return commonApiResponseBuilder(400, res, "User Id is required !!");

  const userCreatedBoards = await prisma.board.findMany({
    where: {
      OR: [{ authorId: id }, { members: { some: { id } } }],
    },
  });

  if (userCreatedBoards.length)
    return commonApiResponseBuilder(200, res, undefined, userCreatedBoards);

  return commonApiResponseBuilder(404, res, "No Boards Found !!");
});

// read by ID.
boardsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return commonApiResponseBuilder(400, res, "Board Id is required !!");

  const boardDetails = await prisma.board.findUnique({
    where: { id },
  });

  if (!boardDetails)
    return commonApiResponseBuilder(404, res, "Board Not Found !!");

  return commonApiResponseBuilder(200, res, undefined, boardDetails);
});

// create a board
boardsRouter.post("/", async (req, res) => {
  const validatorRes = requestValidator(boardCreateSchema, req.body, res);
  if (!validatorRes.status) return;

  const boardData = await prisma.board.create({
    data: validatorRes.value,
  });

  return commonApiResponseBuilder(
    200,
    res,
    "Board created successfully !!",
    boardData,
  );
});

// update a board
boardsRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return commonApiResponseBuilder(400, res, "Board Id is required !!");

  const validatorRes = requestValidator(boardUpdateSchema, req.body, res);
  if (!validatorRes.status) return;

  const boardData = await prisma.board.update({
    where: { id },
    data: validatorRes.value,
  });

  return commonApiResponseBuilder(
    200,
    res,
    "Board updated successfully !!",
    boardData,
  );
});

// delete a board
boardsRouter.delete("/:id", async (req, res) => {
  const { id } = req.query;
  if (!id)
    return commonApiResponseBuilder(400, res, "BoardID is required Bruvhhh !!");

  await prisma.board.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  return commonApiResponseBuilder(
    200,
    res,
    "deleted board ${id} succefullly !",
  );
});
export default boardsRouter;
