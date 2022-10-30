import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// rs-todo:
//import { UsersService } from './users.service';
//import { UsersController } from './users.controller';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  // rs-todo:
  //providers: [UsersService],
  //controllers: [UsersController],
})
export class UsersModule {}
