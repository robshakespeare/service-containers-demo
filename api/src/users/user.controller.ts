import { Body, Controller, Get, NotFoundException, Param, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (user) {
      return user;
    }

    throw new NotFoundException(`No user found with id of: ${id}`);
  }

  @Put()
  async upsertUser(@Body() user: User): Promise<User> {
    await this.usersRepository.upsert(user, []);
    return user;
  }
}
