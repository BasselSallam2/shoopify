import userRouter from "@/modules/Customer/customer.route.js";
import ownerRouter from "@/modules/Owner/owner.route.js";
import storeRouter from "@/modules/Store/store.route.js";
import productRouter from "@/modules/Product/product.route.js";
import categoryRouter from "@/modules/Category/category.route.js";
import { Router } from "express";

const router = Router();

router.use("/user", userRouter);
router.use("/owner", ownerRouter);
router.use("/store", storeRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter);

export default router;
