import { Plans } from "../../domain/entities/plans";

export interface IPlansRepository {
  create(plan: Plans): Promise<Plans>;
}
