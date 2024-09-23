import { Router } from "express";
import { createUserFactory } from "../factories/create-user-factory";
import { getAllUsersFactory } from "../factories/get-all-users-factory";
import { findUserByIdFactory } from "../factories/find-by-id-factory";
import { deleteUserFactory } from "../factories/delete-user-factory";
import { sendTokenAcessByEmail } from "../factories/send-token-acess-by-email";
import { ensureAuthenticated } from "../middleware/ensure-authenticate";
import { updateUserFactory } from "../factories/update-user-factory";

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

userRoutes.post(
  "/user/send-email/:id",
  ensureAuthenticated,
  async (req, res) => {
    return sendTokenAcessByEmail().handle(req, res);
  }
);

userRoutes.put("/user/update/:id", ensureAuthenticated, async (req, res) => {
  return updateUserFactory().handle(req, res);
});

export { userRoutes };
