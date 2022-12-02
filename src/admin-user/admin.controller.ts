import {
  Controller,
  Post,
  Body,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AdminService } from './admin.service';
import { SignUpDto, LoginDto } from './admin.dto';
import { API_VERSION } from '../version';

@Controller(`${API_VERSION}`)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post("signUp")
  signUp(@Body() signUpData: SignUpDto) {
    return this.adminService.signUp(signUpData);
  }

  @Post("login")
  login(
    @Req() req,
    @Body() loginData: LoginDto
    ) {
    return this.adminService.login(loginData);
  }
}
