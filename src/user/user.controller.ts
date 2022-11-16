import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto, LoginDto } from './user.dto';
import { API_VERSION } from '../version';

@Controller(`${API_VERSION}/user`)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("signUp")
  signUp(@Body() signUpData: SignUpDto) {
    return this.userService.signUp(signUpData);
  }

  @Post("login")
  login(@Body() loginData: LoginDto) {
    return this.userService.login(loginData);
  }

  @Get()
  viewUser(id: string) {
    return this.userService.viewUser(id);
  }
}
