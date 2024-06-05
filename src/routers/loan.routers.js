import loanController from "../controllers/loan.controller.js";
import {
  validate,
  validateBookId,
  validateLoanId,
} from "../middlewares/validation.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";

import { Router } from "express";
import { loanSchema } from "../schemas/loan.schema.js";

const router = Router();

router.use(authMiddleware);
router.post("/", validate(loanSchema), loanController.createLoanController);
router.get("/", loanController.findAllLoansController);
router.get("/:id", validateLoanId, loanController.findLoanByIdController);
router.delete("/:id", validateLoanId, loanController.deleteLoanController);

export default router;
