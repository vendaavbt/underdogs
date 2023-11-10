import { User } from 'library-api/src/entities/user';
import { UserRepositoryOutput } from './user.repository.type';

export const adaptUserEntityToUserModel = (
  user: User,
): UserRepositoryOutput => ({ ...user });
