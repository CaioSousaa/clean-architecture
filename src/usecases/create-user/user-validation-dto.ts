import { z } from "zod";
import { createUserSchema } from "../../external/zod/user-schema/create-user-schema";

export type UserValidationDTO = z.infer<typeof createUserSchema>;
