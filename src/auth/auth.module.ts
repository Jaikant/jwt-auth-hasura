import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JWTService } from './jwt.service';

@Module({
  providers: [ JWTService ],
  exports: [ JWTService ]
})
export class AuthModule {}
