import { z } from "zod";

export const createIssueSchema = z.object({
  title: z
    .string({
      invalid_type_error: "Title is not a string",
      required_error: "Title is required",
    })
    .min(4, { message: "Must be atleast 4 characters long" })
    .max(100, { message: "Must be atmost 100 characters long" }),
  description: z
    .string({
      invalid_type_error: "Description must be of type string",
    })
    .optional(),
});
