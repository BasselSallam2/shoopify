import userRouter from "@/modules/Customer/customer.route.js";
import { Router } from "express";

const router = Router();

router.use("/user", userRouter);

export default router;
