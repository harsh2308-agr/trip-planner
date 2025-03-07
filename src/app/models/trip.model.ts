export interface Trip {
  id: number;
  name: string;
  destination: string;
  startDate: string;  
  endDate: string;
  budget: number;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  members: string[]; // User emails
  expenses?: Expense[];  // Expense array instead of object
  itinerary?: ItineraryItem[]; // Trip Itinerary
}

// Expense model
export interface Expense {
  id: number;
  userId: string; // User email who paid
  amount: number;
  description: string;
  date: string; // YYYY-MM-DD format
}

// Itinerary model
export interface ItineraryItem {
  day: number;
  date: Date;
  activity: string;
  time: string;
  description: string;
  location: string;
}
