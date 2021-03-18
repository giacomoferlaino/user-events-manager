import { LoginDto } from './login-dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto extends LoginDto {
  @IsNotEmpty()
  @IsString()
  username!: string;

  populateFromObject(source: any) {
    super.populateFromObject(source);
    this.username = source['username'];
  }
}
