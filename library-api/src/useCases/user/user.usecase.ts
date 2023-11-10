// useCases/findUsers.usecase.ts
import { Injectable } from '@nestjs/common';
import { UserRepository } from 'library-api/src/repositories/user/user.repository';
import { UserId } from 'library-api/src/entities/user';
import {
  UserUseCasesOutput,
  createUserUseCaseInput,
} from './user.usecase.type';

@Injectable()
export class UserUseCases {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Get all plain users
   * @returns Array of plain users
   */
  public async getAll(): Promise<UserUseCasesOutput[]> {
    return this.userRepository.getAll();
  }

  /**
   * Get a user by its ID
   * @param id User's ID
   * @returns User if found
   * @throws 404: user with this ID was not found
   */
  public async getById(id: UserId): Promise<UserUseCasesOutput> {
    return this.userRepository.getById(id);
  }

  /**
   * Create a new user
   * @param input Data for the new user
   * @returns The newly created user
   */
  public async createUser(
    input: createUserUseCaseInput,
  ): Promise<UserUseCasesOutput> {
    const createdUser = await this.userRepository.createUser(input);
    return createdUser;
  }

  /**
   * Delete a User from database
   * @param id User's ID
   * @throws
   */
  public async deleteById(id: UserId): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
