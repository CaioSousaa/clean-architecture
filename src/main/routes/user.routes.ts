import { Router } from "express";
import { createUserFactory } from "../factories/create-user-factory";

const userRoutes = Router();

userRoutes.post("/user", async (req, res) => {
  return createUserFactory().handle(req, res);
});

export { userRoutes };
