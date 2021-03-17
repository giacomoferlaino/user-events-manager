import { EntityConverter } from '../shared/orm/entity-converter';
import { UserEntity } from './user-entity';

export class User implements EntityConverter<UserEntity> {
  public readonly id: number;
  public readonly username: string;
  public readonly email: string;
  public readonly password: string;

  public static fromEntity(entity: UserEntity): User {
    return new User({ ...entity });
  }

  public static fromObject(object: any): User {
    const userEntity = UserEntity.fromObject(object);
    return User.fromEntity(userEntity);
  }

  constructor({ id, username, email, password }: UserEntity) {
    this.id = id || 0;
    this.username = username || '';
    this.email = email || '';
    this.password = password || '';
  }

  public mergeIn(user: User): User {
    return new User({
      id: user.id === 0 ? this.id : user.id,
      username: user.username === '' ? this.username : user.username,
      email: user.email === '' ? this.email : user.email,
      password: user.password === '' ? this.password : user.password,
    });
  }

  public comparePassword(password: string): boolean {
    return this.password === password;
  }

  public toEntity(): UserEntity {
    return UserEntity.fromObject(this.toObject());
  }

  public toObject(): any {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      password: this.password,
    };
  }

  public toJSON(): any {
    return { ...this.toObject(), password: undefined };
  }
}
