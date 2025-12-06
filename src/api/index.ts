import { Router } from "express";
import healthcheckRouter from "./healthcheck/index.js";

const router = Router();

router.use("/healthcheck", healthcheckRouter);

export default router;