export interface User {
  id: number;
  userId: string; // Unique username
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
}
