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

export const updateIssueSchema = z.object({
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
  assignedToUserId: z
    .string({
      required_error: "AssignedToUserId is required.",
    })
    .min(1, { message: "Must be atleast 1 character long" })
    .max(255, { message: "Must be atmost 255 characters long" })
    .optional(),
});
