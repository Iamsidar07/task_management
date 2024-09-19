import { z } from "zod";

export const userSignUpSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(8, "Password should be atleast 8 character"),
});
export const userSignInSchema = z.object({
  remember: z.boolean(),
  email: z.string().email(),
  password: z.string().min(8, "Password should be atleast 8 character"),
});
