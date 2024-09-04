import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../../infra/db/entities/user/user";
import { CreateTableUser1725482215943 } from "../../infra/db/migrations/1725482215943-create-table-user";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.USER,
  password: String(process.env.PASSWORD),
  database: process.env.NAME,
  entities: [User],
  migrations: [CreateTableUser1725482215943],
  migrationsRun: true,
});
