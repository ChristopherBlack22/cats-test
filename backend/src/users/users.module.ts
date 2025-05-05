import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  imports: [],
  exports: [UsersService],
  controllers: [],
  providers: [UsersService],
})
export class UsersModule {}
