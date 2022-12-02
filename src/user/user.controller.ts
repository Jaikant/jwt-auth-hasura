import {
  Controller,
  Get,
  Param,
  UseGuards,
  Req
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserIdDto } from './user.dto';
import { API_VERSION } from '../version';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller(`${API_VERSION}/user`)
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":id")
  viewUser(@Req() req, @Param() userIdDto: UserIdDto) {
    return this.userService.viewUser(userIdDto.id, req.headers.authorization);
  }
}
