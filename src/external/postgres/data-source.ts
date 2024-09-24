import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntityDb } from "../../infra/db/entities/user/user-entity-db";
import { CreateTableUser1725482215943 } from "../../infra/db/migrations/1725482215943-create-table-user";
import { CreateCardBank1725840266068 } from "../../infra/db/migrations/1725840266068-create-card-bank";
import { UpdateUser1725841168797 } from "../../infra/db/migrations/1725841168797-update-user";
import { CardBankEntityDb } from "../../infra/db/entities/card-bank/card-bank-entity-db";
import { Token1726955412063 } from "../../infra/db/migrations/1726955412063-Token";
import { TokenEntityDb } from "../../infra/db/entities/token/token-entity-db";
import { UpdateCardBankAddUserId1727214395003 } from "../../infra/db/migrations/1727214395003-UpdateCardBankAddUserId";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.USER,
  password: String(process.env.PASSWORD),
  database: process.env.NAME,
  entities: [UserEntityDb, CardBankEntityDb, TokenEntityDb],
  migrations: [
    CreateTableUser1725482215943,
    CreateCardBank1725840266068,
    UpdateUser1725841168797,
    Token1726955412063,
    UpdateCardBankAddUserId1727214395003,
  ],
  migrationsRun: true,
});
