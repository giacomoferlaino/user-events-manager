import { EntityConverter } from '../shared/orm/entity-converter';
import { UserEntity } from './user-entity';

export class User implements EntityConverter<UserEntity> {
  private _id: number;
  private _username: string;
  private _email: string;
  private _password: string;

  public static fromEntity(entity: UserEntity): User {
    return new User({ ...entity });
  }

  constructor({ id, username, email, password }: UserEntity) {
    this._id = id || 0;
    this._username = username || '';
    this._email = email || '';
    this._password = password || '';
  }

  public getID(): number {
    return this._id;
  }

  public comparePassword(password: string): boolean {
    return this._password === password;
  }

  public toEntity(): UserEntity {
    return UserEntity.fromObject(this.toObject());
  }

  public toObject(): any {
    return {
      id: this._id,
      username: this._username,
      email: this._email,
      password: this._password,
    };
  }

  public toJSON(): any {
    return { ...this.toObject(), password: undefined };
  }
}
