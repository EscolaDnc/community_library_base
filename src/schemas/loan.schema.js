import { z } from 'zod';

const loanSchema = z.object({
    bookId: z.number().int().positive('Book ID must be a positive integer'),
});

const loanIdSchema = z.object({
    loanId: z.number().int().positive('Loan ID must be a positive integer'),
});

export { loanSchema, loanIdSchema };
