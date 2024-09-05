import * as express from "express";
import { initializationError } from "../middleware/initialization-error-";
import { userRoutes } from "../routes/user.routes";

const app = express();

app.use(express.json());
app.use(initializationError);
app.use(userRoutes);

export { app };
