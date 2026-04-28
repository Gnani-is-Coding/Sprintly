import * as z from "zod";

{
  /*
  Why do we need this Zod when we alreadty have Typescript ?

  TypeScript (Compile-time): It checks your "blueprints" while you are writing code. 
  It makes sure that if you say a function takes a number, you don't accidentally try to pass it a string. 
  However, once you build your app, all those checks are deleted. The resulting JavaScript has no idea what a "type" is.

Zod (Runtime): It stays inside your app while it is running. 
When a user submits a form or an API sends back data, Zod physically stops that data at the "gate" and checks if it's valid.

*/
}

export const loginSchema = z.object({
  email: z.email("Invalid Email Address"),
  password: z.string().min(8, "Password must be of min 8 characters"),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(1, "Name is required"),
});

export const tokenPayload = z.object({
  email: z.email("Invalid Email Address"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type TokenPayload = z.infer<typeof tokenPayload>;
