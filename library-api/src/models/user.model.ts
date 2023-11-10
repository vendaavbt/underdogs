import { UserId } from '../entities/user';

// models/user.model.ts
export interface UserModel {
  id: UserId;
  firstName: string;
  lastName: string;
}
