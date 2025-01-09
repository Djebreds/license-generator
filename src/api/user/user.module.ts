import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { UserMapper } from './mappers/user.mapper';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserMapper],
  exports: [UserService],
})
export class UserModule {}
