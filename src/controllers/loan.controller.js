import loanService from "../services/loan.service.js";

async function createLoanController(req, res) {
  const { bookId, dueDate } = req.body;
  const userId = req.userId;

  try {
    const createdLoan = await loanService.createLoanService(userId, bookId, dueDate);
    res.status(201).send(createdLoan);
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

async function findAllLoansController(req, res) {
  try {
    const loans = await loanService.findAllLoansService();
    return res.send(loans);
  } catch (error) {
    return res.status(404).send(error.message);
  }
}

async function findLoanByIdController(req, res) {
  try {
    const loanId = req.params.id;
    const loan = await loanService.findLoanByIdService(loanId);
    return res.send(loan);
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

async function deleteLoanController(req, res) {
  try {
    const loanId = req.params.id;
    const response = await loanService.deleteLoanService(loanId);
    return res.send(response);
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

export default {
  createLoanController,
  findAllLoansController,
  findLoanByIdController,
  deleteLoanController,
};
