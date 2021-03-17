import { Service } from '../shared/service-locator/service';
import { User } from './user';
import { Connection, Repository } from 'typeorm';
import { UserEntity } from './user-entity';
import { UserRepository } from './user-repository';
import { UserNotFoundException } from './exceptions/user-not-found-exception';

export class UserService implements Service {
  public static ID: string = 'USER_SERVICE';
  private readonly _userRepository: Repository<UserEntity>;

  constructor(dbConnection: Connection) {
    this._userRepository = UserRepository.fromConnection(dbConnection);
  }

  public getID(): string {
    return UserService.ID;
  }

  public async create(user: User) {
    const userEntity = await this._userRepository.save(user.toEntity());
    return User.fromEntity(userEntity);
  }

  public async findByID(id: number): Promise<User> {
    const userEntity = await this._userRepository.findOne({ id });
    if (!userEntity) throw new UserNotFoundException();
    return User.fromEntity(userEntity);
  }

  public async findByEmail(email: string): Promise<User> {
    const userEntity = await this._userRepository.findOne({ email });
    if (!userEntity) throw new UserNotFoundException();
    return User.fromEntity(userEntity);
  }

  public async findAll(): Promise<User[]> {
    const userEntities = await this._userRepository.find();
    return userEntities.map<User>((userEntity) => User.fromEntity(userEntity));
  }

  public async updateByID(id: number, user: User): Promise<User> {
    const existingUser = await this.findByID(id); // checks if user exists
    const updatedUser = existingUser.mergeIn(user);
    const updatedUserEntity = await this._userRepository.save(
      updatedUser.toEntity(),
    );
    return User.fromEntity(updatedUserEntity);
  }

  public async removeByID(id: number): Promise<void> {
    await this._userRepository.remove({ id });
  }
}
