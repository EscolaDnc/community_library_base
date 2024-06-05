import loanController from "../controllers/loan.controller.js";
import {
  validate,
  validateBookId,
} from "../middlewares/validation.middleware.js";

import { Router } from "express";
import { bookSchema } from "../schemas/book.schema.js";

const router = Router();

router.post("/", validate(bookSchema), loanController.createLoanController);
router.get("/", loanController.findAllLoansController);
router.get("/:id", validateBookId, loanController.findLoanByIdController);
router.delete("/:id", validateBookId, loanController.deleteLoanController);

export default router;
