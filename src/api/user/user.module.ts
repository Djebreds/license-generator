import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [],
  providers: [UserRepository],
})
export class UserModule {}
