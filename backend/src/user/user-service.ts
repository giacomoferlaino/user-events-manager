import { Service } from '../shared/service-locator/service';
import { User } from './user';

export class UserService implements Service {
  public static ID: string = 'USER_SERVICE';

  public getID(): string {
    return UserService.ID;
  }

  public async findByID(id: string): Promise<User> {
    return new User(id, 'password');
  }
}
