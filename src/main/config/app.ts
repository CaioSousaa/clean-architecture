import * as express from "express";
import { initializationError } from "../middleware/initialization-error-";

const app = express();

app.use(express.json());
app.use(initializationError);

export { app };
