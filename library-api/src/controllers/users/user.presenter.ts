import { UserId } from 'library-api/src/entities/user';
import { UserModel } from 'library-api/src/models/user.model';

export class UserPresenter {
  id: UserId;

  firstName: string;

  lastName: string;

  private constructor(data: UserPresenter) {
    Object.assign(this, data);
  }

  public static from(data: UserModel): UserPresenter {
    return new UserPresenter({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
    });
  }
}
