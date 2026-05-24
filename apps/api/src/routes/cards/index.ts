import { Router } from "express";
import { cardCreateSchema, cardUpdateSchema } from "@sprintly/shared/schemas";
import { prisma } from "../../lib/prisma";
import { commonApiResponseBuilder } from "../../commons/genericApiResponse";
import { handleCatchBlockError, requestValidator } from "../../utils";
import authorise from "../../middlewares/authorise";

const cardRouter = Router();

// list cards in a column
cardRouter.get("/", authorise, async (req, res) => {
  try {
    const columnId =
      typeof req.query.columnId === "string" ? req.query.columnId : undefined;
    if (!columnId)
      return commonApiResponseBuilder(400, res, "columnId is required !!");

    const cards = await prisma.card.findMany({
      where: { columnId, deletedAt: null },
      orderBy: { order: "asc" },
    });

    return commonApiResponseBuilder(200, res, undefined, cards);
  } catch (err) {
    handleCatchBlockError(err, res, "GET /cards");
  }
});

// read by ID
cardRouter.get("/:id", authorise, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id)
      return commonApiResponseBuilder(400, res, "Card Id is required !!");

    const card = await prisma.card.findUnique({ where: { id } });
    if (!card || card.deletedAt)
      return commonApiResponseBuilder(404, res, "Card Not Found !!");

    return commonApiResponseBuilder(200, res, undefined, card);
  } catch (err) {
    handleCatchBlockError(err, res, "GET /cards/:id");
  }
});

// create a card — server computes `order` as max+1 in the target column
cardRouter.post("/", authorise, async (req, res) => {
  try {
    const validatorRes = requestValidator(cardCreateSchema, req.body, res);
    if (!validatorRes.status) return;

    const { _max } = await prisma.card.aggregate({
      where: { columnId: validatorRes.value.columnId, deletedAt: null },
      _max: { order: true },
    });
    const order = (_max.order ?? -1) + 1;

    const card = await prisma.card.create({
      data: { ...validatorRes.value, order },
    });

    return commonApiResponseBuilder(
      200,
      res,
      "Card created successfully !!",
      card,
    );
  } catch (err) {
    handleCatchBlockError(err, res, "POST /cards");
  }
});

// update a card
cardRouter.patch("/:id", authorise, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return commonApiResponseBuilder(400, res, "Card Id is required !!");

    const validatorRes = requestValidator(cardUpdateSchema, req.body, res);
    if (!validatorRes.status) return;

    const card = await prisma.card.update({
      where: { id },
      data: validatorRes.value,
    });

    return commonApiResponseBuilder(
      200,
      res,
      "Card updated successfully !!",
      card,
    );
  } catch (err) {
    handleCatchBlockError(err, res, "PATCH /cards/:id");
  }
});

// soft-delete a card
cardRouter.delete("/:id", authorise, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return commonApiResponseBuilder(400, res, "Card Id is required !!");

    await prisma.card.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return commonApiResponseBuilder(200, res, "Card deleted successfully !!");
  } catch (err) {
    handleCatchBlockError(err, res, "DELETE /cards/:id");
  }
});

export default cardRouter;
