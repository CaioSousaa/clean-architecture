import { Router } from "express";
import { AuthenticateUserController } from "../../adapters/presentation/controllers/authentication/authentication-controller";

const authRoutes = Router();

const authUserController = new AuthenticateUserController();

authRoutes.post("/sessions", authUserController.handle);

export { authRoutes };
