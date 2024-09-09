import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntityDb } from "../../infra/db/entities/user/user";
import { CreateTableUser1725482215943 } from "../../infra/db/migrations/1725482215943-create-table-user";
import { CreateCardBank1725840266068 } from "../../infra/db/migrations/1725840266068-create-card-bank";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.USER,
  password: String(process.env.PASSWORD),
  database: process.env.NAME,
  entities: [UserEntityDb],
  migrations: [CreateTableUser1725482215943, CreateCardBank1725840266068],
  migrationsRun: true,
});
