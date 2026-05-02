import { z } from "zod";
import { userProfileSchema } from "../auth/api";

const apiResponse = <T extends z.ZodTypeAny>(data: T) =>
  z.object({
    success: z.boolean(),
    data: data.nullable(),
    error: z.string().nullable(),
  });

export const UserResponse = apiResponse(userProfileSchema);
export type ApiResponse = z.infer<typeof UserResponse>;
