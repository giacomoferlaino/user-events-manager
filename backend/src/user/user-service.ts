import { Service } from '../shared/service-locator/service';
import { User } from './user';
import { Connection, Repository } from 'typeorm';
import { UserRepository } from './user-repository';
import { UserNotFoundException } from './exceptions/user-not-found-exception';

export class UserService implements Service {
  public static ID: string = 'USER_SERVICE';
  private readonly _userRepository: Repository<User>;

  constructor(dbConnection: Connection) {
    this._userRepository = UserRepository.fromConnection(dbConnection);
  }

  public getID(): string {
    return UserService.ID;
  }

  public async create(userData: Object) {
    const newUser = User.fromObject(userData);
    return this._userRepository.save(newUser);
  }

  public async findByID(
    id: number,
    relations = ['events', 'subscribedEvents'],
  ): Promise<User> {
    const user = await this._userRepository.findOne({ id }, { relations });
    if (!user) throw new UserNotFoundException();
    return user;
  }

  public async findByEmail(
    email: string,
    relations = ['events', 'subscribedEvents'],
  ): Promise<User> {
    const user = await this._userRepository.findOne({ email }, { relations });
    if (!user) throw new UserNotFoundException();
    return user;
  }

  public async findAll(
    relations = ['events', 'subscribedEvents'],
  ): Promise<User[]> {
    return this._userRepository.find({ relations });
  }

  public async updateByID(id: number, userData: Object): Promise<User> {
    const existingUser = await this.findByID(id);
    const updatedUser = existingUser.mergeObject(userData);
    return this._userRepository.save(updatedUser);
  }

  public async removeByID(id: number): Promise<void> {
    const user = await this.findByID(id);
    await this._userRepository.remove(user);
  }
}
