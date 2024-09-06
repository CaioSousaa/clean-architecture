import { Router } from "express";
import { createUserFactory } from "../factories/create-user-factory";
import { getAllUsersFactory } from "../factories/get-all-users-factory";

const userRoutes = Router();

userRoutes.post("/user", async (req, res) => {
  return createUserFactory().handle(req, res);
});

userRoutes.get("/", async (req, res) => {
  return getAllUsersFactory().handle(req, res);
});

export { userRoutes };
