import { User } from './user.model';

export interface Expense {
  expenseId: number;
  name: string; // Expense name (e.g., "Hotel Stay", "Dinner")
  amount: number;
  paidBy: User; // User who paid the expense
  splitAmong: User[]; // Users among whom the expense is split
  tripId: number; // The trip this expense belongs to
  date: string; // Format: YYYY-MM-DD
}
