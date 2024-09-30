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
import { RegisterPlanEntityDb } from "../../infra/db/entities/register-plan/register-plan-entity-db";
import { RegisterPlan1727296595802 } from "../../infra/db/migrations/1727296595802-RegisterPlan";
import { PlanFixed1727434630569 } from "../../infra/db/migrations/1727434630569-PlanFixed";
import { PlanEntityDb } from "../../infra/db/entities/plans/plan-entity-db";
import { UpdateRegisterPlan1727702877740 } from "../../infra/db/migrations/1727702877740-UpdateRegisterPlan";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.USER,
  password: String(process.env.PASSWORD),
  database: process.env.NAME,
  entities: [
    UserEntityDb,
    CardBankEntityDb,
    TokenEntityDb,
    RegisterPlanEntityDb,
    PlanEntityDb,
  ],
  migrations: [
    CreateTableUser1725482215943,
    CreateCardBank1725840266068,
    UpdateUser1725841168797,
    Token1726955412063,
    UpdateCardBankAddUserId1727214395003,
    RegisterPlan1727296595802,
    PlanFixed1727434630569,
    UpdateRegisterPlan1727702877740,
  ],
  migrationsRun: true,
});
