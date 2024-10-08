import "reflect-metadata";
import * as express from "express";
import { initializationError } from "../middleware/initialization-error-";
import { userRoutes } from "../routes/user.routes";
import { authRoutes } from "../routes/authenticate.routes";
import { registerRepository } from "./register-repository";
import { plansRoutes } from "../routes/plans.routes";

const app = express();

registerRepository();

app.use(express.json());
app.use(initializationError);
app.use(userRoutes);
app.use(authRoutes);
app.use(plansRoutes);

export { app };
