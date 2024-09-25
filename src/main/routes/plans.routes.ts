import { Router } from "express";
import { fixedPlans } from "../factories/create-fixed-plans";

const plansRoutes = Router();

plansRoutes.post("/plans", async (req, res) => {
  return fixedPlans().handle(req, res);
});

export { plansRoutes };
