import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class LoginDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class SignUpDto extends PartialType(LoginDto) {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
