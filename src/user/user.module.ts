import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { GqlClientModule } from 'src/graphql-client/client.module';

@Module({
  imports: [GqlClientModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
