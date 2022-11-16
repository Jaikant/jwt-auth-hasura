import { Module } from '@nestjs/common';
import { GqlClient } from './client.service';

@Module({
  providers: [GqlClient],
  exports: [GqlClient]
})
export class GqlClientModule {}
