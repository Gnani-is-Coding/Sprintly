import { Router } from "express";
import {
  columnsCreateSchema,
  columnsUpdateSchema,
} from "@sprintly/shared/schemas";
import { prisma } from "../../lib/prisma";
import { commonApiResponseBuilder } from "../../commons/genericApiResponse";
import { handleCatchBlockError, requestValidator } from "../../utils";
import authorise from "../../middlewares/authorise";

const columnRouter = Router();

// list columns in a board
columnRouter.get("/", authorise, async (req, res) => {
  try {
    const boardId =
      typeof req.query.boardId === "string" ? req.query.boardId : undefined;
    if (!boardId)
      return commonApiResponseBuilder(400, res, "boardId is required !!");

    const columns = await prisma.columns.findMany({
      where: { boardId, deletedAt: null },
      orderBy: { order: "asc" },
    });

    return commonApiResponseBuilder(200, res, undefined, columns);
  } catch (err) {
    handleCatchBlockError(err, res, "GET /columns");
  }
});

// read by ID
columnRouter.get("/:id", authorise, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return commonApiResponseBuilder(400, res, "Column Id is required !!");

    const column = await prisma.columns.findUnique({ where: { id } });
    if (!column || column.deletedAt)
      return commonApiResponseBuilder(404, res, "Column Not Found !!");

    return commonApiResponseBuilder(200, res, undefined, column);
  } catch (err) {
    handleCatchBlockError(err, res, "GET /columns/:id");
  }
});

// create a column — server computes `order` as max+1 in the target board.
// SELECT FOR UPDATE on the parent Board row serializes concurrent inserts
// into the same board, so two POSTs can't compute the same `order`.
columnRouter.post("/", authorise, async (req, res) => {
  try {
    const validatorRes = requestValidator(columnsCreateSchema, req.body, res);
    if (!validatorRes.status) return;

    const { boardId } = validatorRes.value;

    const column = await prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT 1 FROM "Board" WHERE id = ${boardId} FOR UPDATE`;

      const { _max } = await tx.columns.aggregate({
        where: { boardId, deletedAt: null },
        _max: { order: true },
      });
      const order = (_max.order ?? -1) + 1;

      return tx.columns.create({
        data: { ...validatorRes.value, order },
      });
    });

    return commonApiResponseBuilder(
      200,
      res,
      "Column created successfully !!",
      column,
    );
  } catch (err) {
    handleCatchBlockError(err, res, "POST /columns");
  }
});

// update a column
columnRouter.patch("/:id", authorise, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return commonApiResponseBuilder(400, res, "Column Id is required !!");

    const validatorRes = requestValidator(columnsUpdateSchema, req.body, res);
    if (!validatorRes.status) return;

    const column = await prisma.columns.update({
      where: { id },
      data: validatorRes.value,
    });

    return commonApiResponseBuilder(
      200,
      res,
      "Column updated successfully !!",
      column,
    );
  } catch (err) {
    handleCatchBlockError(err, res, "PATCH /columns/:id");
  }
});

// soft-delete a column
columnRouter.delete("/:id", authorise, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return commonApiResponseBuilder(400, res, "Column Id is required !!");

    await prisma.columns.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return commonApiResponseBuilder(200, res, "Column deleted successfully !!");
  } catch (err) {
    handleCatchBlockError(err, res, "DELETE /columns/:id");
  }
});

export default columnRouter;
