import { UserModel } from 'library-api/src/models/user.model';

export type UserRepositoryOutput = UserModel;
export type createUserRepositoryInput = Omit<UserModel, 'id'>;
