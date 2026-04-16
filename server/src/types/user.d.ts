export interface IUser {
  id: number;
  username?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone: string;
  passwordHash: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
  lastseen?: Date;
  preferences: Record<string, any>;
  bio?: string;
  location?: string;
}
