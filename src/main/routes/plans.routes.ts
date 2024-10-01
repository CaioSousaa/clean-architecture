import { Router } from "express";
import { fixedPlans } from "../factories/create-fixed-plans";
import { createRegisterPlanFactory } from "../factories/create-register-plan-factory";
import { ensureAuthenticated } from "../middleware/ensure-authenticate";
import { getPlansFactory } from "../factories/get-plans-factory";
import { findPlanByIdFactory } from "../factories/find-plan-by-id-factory";
import { removePlanFactory } from "../factories/remove-plan-factory";

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

plansRoutes.get("/plans/:id", ensureAuthenticated, async (req, res) => {
  return findPlanByIdFactory().handle(req, res);
});

plansRoutes.delete(
  "/plans/delete/:user_id",
  ensureAuthenticated,
  async (req, res) => {
    return removePlanFactory().handle(req, res);
  }
);

export { plansRoutes };
