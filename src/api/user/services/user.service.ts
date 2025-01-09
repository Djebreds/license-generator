import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UserCreateDTO } from '../dtos/user.create.dto';
import { RegisterDTO } from '@api/auth/dtos';
import { I18nService } from 'nestjs-i18n';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { User } from '../entities/user.entity';
import { PasswordService } from '@api/auth/services/password.service';
import { UserResponseDTO } from '../dtos';
import { PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class UserService {
  constructor(
    private readonly i18nService: I18nService,
    private readonly userRepository: UserRepository,
    @InjectMapper() private readonly mapper: Mapper,
    private readonly passwordService: PasswordService,
  ) {}

  async getAllPaginated(query: PaginateQuery) {
    const users = await this.userRepository.getAllPaginated(query);

    const mapped = await this.mapper.mapArrayAsync(
      users.data,
      User,
      UserResponseDTO,
    );

    return {
      items: mapped,
      meta: users.meta,
      links: users.links,
    };
  }

  async getByUsername(username: string) {
    const user = await this.userRepository.getByUsername(username);

    return user;
  }

  async updateLastLogin(id: string) {
    const user = await this.userRepository.getById(id);
    await this.userRepository.update(id, {
      lastLogin: new Date(),
    });

    return user;
  }

  async createUser(
    userCreateDTO: UserCreateDTO | RegisterDTO,
    clientIp: string,
  ) {
    const { username } = userCreateDTO;

    const user = await this.getByUsername(username);

    if (user) {
      throw new ConflictException(
        this.i18nService.t('general.auth.errors.usernameExists'),
      );
    }

    const mapped = await this.mapper.map(userCreateDTO, UserCreateDTO, User);

    mapped.password = await this.passwordService.hashPassword(mapped.password);
    mapped.ip = clientIp;

    const createdUser = await this.userRepository.save(mapped);

    return this.userRepository.getById(createdUser.id);
  }
}
