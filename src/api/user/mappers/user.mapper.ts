import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { createMap, Mapper } from '@automapper/core';
import { User } from '../entities/user.entity';
import { UserCreateDTO, UserResponseDTO } from '../dtos';

@Injectable()
export class UserMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, User, UserResponseDTO);
      createMap(mapper, UserCreateDTO, User);
    };
  }
}
