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

  public async create(user: User) {
    return this._userRepository.save(user);
  }

  public async findByID(id: number, relations = ['events']): Promise<User> {
    const user = await this._userRepository.findOne({ id }, { relations });
    if (!user) throw new UserNotFoundException();
    return user;
  }

  public async findByEmail(
    email: string,
    relations = ['events'],
  ): Promise<User> {
    const user = await this._userRepository.findOne({ email }, { relations });
    if (!user) throw new UserNotFoundException();
    return user;
  }

  public async findAll(relations = ['events']): Promise<User[]> {
    return this._userRepository.find({ relations });
  }

  public async updateByID(id: number, user: User): Promise<User> {
    const existingUser = await this.findByID(id); // checks if user exists
    const updatedUser = existingUser.mergeIn(user);
    return this._userRepository.save(updatedUser);
  }

  public async removeByID(id: number): Promise<void> {
    const user = await this.findByID(id);
    await this._userRepository.remove(user);
  }
}
