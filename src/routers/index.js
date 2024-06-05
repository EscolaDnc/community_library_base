import { Router } from "express";
import userRouter from "./user.routers.js";
import bookRouter from "./book.routers.js";
import loanRouter from "./loan.routers.js";

const router = Router();

router.use("/users", userRouter);
router.use("/books", bookRouter);
router.use("/loans", loanRouter);

export default router;