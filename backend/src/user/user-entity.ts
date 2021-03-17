import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  username?: string;

  @Column()
  email?: string;

  @Column()
  password?: string;

  public static fromObject(object: any): UserEntity {
    const userEntity = new UserEntity();
    userEntity.id = object['id'];
    userEntity.username = object['username'];
    userEntity.email = object['email'];
    userEntity.password = object['password'];
    return userEntity;
  }
}
