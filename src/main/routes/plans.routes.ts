import { Router } from "express";
import { fixedPlans } from "../factories/create-fixed-plans";
import { createRegisterPlanFactory } from "../factories/create-register-plan-factory";
import { ensureAuthenticated } from "../middleware/ensure-authenticate";
import { getPlansFactory } from "../factories/get-plans-factory";

const plansRoutes = Router();

plansRoutes.post("/plans", async (req, res) => {
  return fixedPlans().handle(req, res);
});

plansRoutes.post(
  "/plans/register-plan/:id",
  ensureAuthenticated,
  async (req, res) => {
    return createRegisterPlanFactory().handle(req, res);
  }
);

plansRoutes.get("/plans/all", ensureAuthenticated, async (req, res) => {
  return getPlansFactory().handle(req, res);
});
export { plansRoutes };
