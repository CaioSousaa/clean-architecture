import { Router } from "express";
import { createUserFactory } from "../factories/create-user-factory";
import { getAllUsersFactory } from "../factories/get-all-users-factory";
import { findUserByIdFactory } from "../factories/find-by-id-factory";
import { deleteUserFactory } from "../factories/delete-user-factory";

const userRoutes = Router();

userRoutes.post("/user", async (req, res) => {
  return createUserFactory().handle(req, res);
});

userRoutes.get("/", async (req, res) => {
  return getAllUsersFactory().handle(req, res);
});

userRoutes.get("/user/:id", async (req, res) => {
  return findUserByIdFactory().handle(req, res);
});

userRoutes.delete("/user/delete/:id", async (req, res) => {
  return deleteUserFactory().handle(req, res);
});

export { userRoutes };
