import { z } from "zod";

export const createUserSchema = z.object({
  first_name: z.string().length(50),
  surname: z.string().length(100),
  email: z.string().email(),
  password: z.string().length(100),
  age: z.number(),
  unique_identifier: z.string().length(11),
  address: z.string().length(500),
  status_plan: z.boolean().default(false),
});
