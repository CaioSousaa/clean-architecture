import "reflect-metadata";
import "./config/dotenv";
import { AppDataSource } from "../external/postgres/data-source";
import { app } from "./config/app";

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");

    await AppDataSource.runMigrations();
    app.listen(process.env.PORT || 3000, () => console.log("server is run"));
  })
  .catch((err) => {
    console.log("Error during Data Source initialization:", err);
  });
