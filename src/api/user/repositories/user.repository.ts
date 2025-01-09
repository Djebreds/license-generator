import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { userInfo } from 'os';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async getAllPaginated(query: PaginateQuery): Promise<Paginated<User>> {
    const paginated = await paginate(query, this, {
      sortableColumns: ['name', 'username'],
      searchableColumns: ['name', 'username'],
      maxLimit: +process.env.PAGINATION_MAX_LIMIT,
    });

    return paginated;
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
