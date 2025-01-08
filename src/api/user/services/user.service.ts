import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { useContainer } from 'class-validator';
import { BadRequestError } from 'passport-headerapikey';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });

    return user;
  }
}
