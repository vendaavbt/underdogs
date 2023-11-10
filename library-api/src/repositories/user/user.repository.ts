// repositories/user.repository.ts
import { Injectable } from '@nestjs/common';
import { User, UserId } from 'library-api/src/entities/user';
import { v4 } from 'uuid';
import { DataSource, Repository } from 'typeorm';
import { NotFoundError } from 'library-api/src/common/errors';
import {
  UserRepositoryOutput,
  createUserRepositoryInput,
} from './user.repository.type';
import { adaptUserEntityToUserModel } from './user.utils';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(public readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  /**
   * Get all plain authors
   * @returns Array of plain authors
   */
  public async getAll(): Promise<UserRepositoryOutput[]> {
    const users = await this.find();

    return users.map(adaptUserEntityToUserModel);
  }

  public async createUser(
    input: createUserRepositoryInput,
  ): Promise<UserRepositoryOutput> {
    const newUser = new User();
    newUser.id = v4();
    newUser.firstName = input.firstName;
    newUser.lastName = input.lastName;
    await this.save(newUser);
    return adaptUserEntityToUserModel(newUser);
  }

  /**
   * Delete a User from database
   * @param id User's ID
   */
  public async deleteById(id: UserId): Promise<void> {
    await this.delete({ id });
  }

  /**
   * Get a user by its ID
   * @param id user's ID
   * @returns user if found
   * @throws 404: author with this ID was not found
   */
  public async getById(id: UserId): Promise<UserRepositoryOutput> {
    const user = await this.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundError(`User - '${id}'`);
    }

    return adaptUserEntityToUserModel(user);
  }
}
