import { Module } from '@nestjs/common';
import { ModelsModule } from 'src/database/mongoose';
import { UsersService } from './users.service';
import { UserController } from './users.controller';

@Module({
  imports: [ModelsModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UserController],
})
export class UsersModule {}
