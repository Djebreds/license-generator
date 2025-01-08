import { BadRequestException, Injectable } from '@nestjs/common';
import { TokenService } from './token.service';
import { LoginDTO } from '../dtos/login.dto';
import { UserService } from 'src/api/user/services/user.service';
import { I18nService } from 'nestjs-i18n';
import { PasswordService } from './password.service';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { LoginResponseDTO } from '../dtos';
import { User } from '@api/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly i18nService: I18nService,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async login(loginDTO: LoginDTO) {
    const { username, password } = loginDTO;

    const user = await this.userService.getUserByUsername(username);

    if (!user) {
      throw new BadRequestException(
        this.i18nService.t('general.auth.errors.errorLogin'),
      );
    }

    const validatePassword = await this.passwordService.comparePassword({
      password: password,
      hash: user.password,
    });

    if (!validatePassword) {
      throw new BadRequestException(
        this.i18nService.t('general.auth.errors.errorLogin'),
      );
    }

    const tokenPayload = {
      id: user.id,
      name: user.name,
      username: user.username,
      ip: user.ip,
    };

    const token = await this.tokenService.generateToken(tokenPayload);

    const mapped = await this.mapper.mapAsync(user, User, LoginResponseDTO);

    mapped.token = token;

    return mapped;
  }
}
