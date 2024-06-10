import cron from 'node-cron';
import moment from 'moment';
import loanService from './loan.service.js';
import sendReminderEmail from './email.service.js';

cron.schedule('0 9 * * *', async () => {
  console.log('Running daily job to check for due dates...');
  const loans = await loanService.findAllLoansService();
  const today = moment().startOf('day');

  loans.forEach(loan => {
    const dueDate = moment(loan.dueDate).startOf('day');
    const reminderDueDate = moment(dueDate).subtract(1, 'days');
    if (today.isSame(reminderDueDate)) {
      sendReminderEmail(loan.email, loan.title, loan.dueDate);
    }
  });
});