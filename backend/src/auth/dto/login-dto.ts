import { DataTransferObject } from '../../shared/validation/data-transfer-object';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto implements DataTransferObject {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  populateFromObject(source: any): void {
    this.email = source['email'];
    this.password = source['password'];
  }
}
