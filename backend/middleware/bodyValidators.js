import * as z from "zod";

/*
    This schema is not for the database.
    It's not the same as a User fetched from the database.
    It is for validating request bodies when someone tries to use the POST /api/user route.
*/
const createUserInputSchema = z.object({
  username: z.string().trim().min(3).max(50).lowercase(),
  password: z.string().min(6),
  // favoriteColor: z.string().optional(),
  // email: z.email(),
});

/*
    to create the typescript type...
    type CreateUserInput = z.Infer<typeof createUserInputSchema>
*/

/*
    In express, middleware is a function that happens between request and response
    you call next() to go to the next function
    or return a bad response
*/

export const validateCreateUserInputInBody = (req, res, next) => {
  try {
    createUserInputSchema.parse(req.body); // throws an error if the body doesn't match the schema
    next();
  } catch {
    res.status(400);
    res.json({
      message: "Invalid input",
    });
  }
};
