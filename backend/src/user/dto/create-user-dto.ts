import { DataTransferObject } from '../../shared/validation/data-transfer-object';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto implements DataTransferObject {
  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  populateFromObject(source: any) {
    this.username = source['username'];
    this.email = source['email'];
    this.password = source['password'];
  }
}
