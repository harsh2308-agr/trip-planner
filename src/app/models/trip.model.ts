export interface Trip {
  id: number;
  name: string;
  destination: string;
  startDate: string;  // Format: YYYY-MM-DD
  endDate: string;
  budget: number;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  members: string[];
  expenses?: { [userId: number]: number }; // Expense mapping per user
}