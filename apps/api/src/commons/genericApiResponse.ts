import type { Response } from "express";

export function commonApiResponseBuilder(
  statusCode: number,
  res: Response,
  statusMsg?: string,
  data?: unknown,
) {
  switch (statusCode) {
    case 200:
      return res
        .status(200)
        .send({ status: statusMsg ?? "Suucesfullty Done !!", data });
      break;
    case 400:
      return res
        .status(400)
        .json({ status: statusMsg ?? "Bad Request !!", data });
      break;
    case 401:
      return res.status(401).json({
        status: statusMsg ?? "Unauthorized, Please Login to continue",
        data,
      });
      break;
    case 404:
      return res
        .status(404)
        .json({ status: statusMsg ?? "Not Found !!", data });
    case 500:
      return res
        .status(500)
        .json({ status: statusMsg ?? "Internal Server Error !!", data });
      break;
    default:
      return res
        .status(200)
        .json({ status: statusMsg ?? "Suucesfullty Done !!", data });
  }
}
