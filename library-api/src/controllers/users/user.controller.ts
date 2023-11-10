// controllers/users.controller.ts
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserId } from 'library-api/src/entities/user';
import { createUserUseCaseInput } from 'library-api/src/useCases/user/user.usecase.type';
import { UserUseCases } from 'library-api/src/useCases/user/user.usecase';
import { UserPresenter } from './user.presenter';

@Controller('user')
export class UserController {
  constructor(private readonly userUseCases: UserUseCases) {}

  @Get('/')
  public async getAll(): Promise<UserPresenter[]> {
    const users = await this.userUseCases.getAll();

    return users.map(UserPresenter.from);
  }

  @Get('/:id')
  public async getById(@Param('id') id: UserId): Promise<UserPresenter> {
    const user = await this.userUseCases.getById(id);

    return UserPresenter.from(user);
  }

  @Post()
  public async createUser(
    @Body() input: createUserUseCaseInput,
  ): Promise<UserPresenter> {
    const createdUser = await this.userUseCases.createUser(input);
    return UserPresenter.from(createdUser);
  }

  @Delete('/:id')
  public async deleteById(@Param('id') id: UserId): Promise<void> {
    await this.userUseCases.deleteById(id);
  }
}
