import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { userInfo } from 'os';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async getById(id: string) {
    const user = await this.findOne({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        username: true,
        password: true,
        ip: true,
      },
    });

    return user;
  }

  async getByUsername(username: string) {
    const user = await this.findOne({
      where: {
        username,
      },
      select: {
        id: true,
        name: true,
        username: true,
        password: true,
        ip: true,
      },
    });

    return user;
  }
}
