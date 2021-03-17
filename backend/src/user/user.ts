import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public readonly username: string;

  @Column()
  public readonly email: string;

  @Column()
  public readonly password: string;

  public static fromObject(object: any): User {
    return new User(
      object['id'] || 0,
      object['username'] || '',
      object['email'] || '',
      object['password'] || '',
    );
  }

  constructor(id: number, username: string, email: string, password: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  public mergeIn(user: User): User {
    return new User(this.id, user.username, user.email, user.password);
  }

  public comparePassword(password: string): boolean {
    return this.password === password;
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
