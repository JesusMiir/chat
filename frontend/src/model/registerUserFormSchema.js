import * as z from "zod";

const registerUserFormSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "Username is too short" })
    .max(50, { message: "Username is too long" })
    .lowercase(),
  password: z.string().min(6),
});

export default registerUserFormSchema;
