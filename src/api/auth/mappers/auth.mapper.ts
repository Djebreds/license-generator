import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { LoginResponseDTO, RegisterDTO } from '../dtos';
import { User } from 'src/api/user/entities/user.entity';

@Injectable()
export class AuthMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, User, LoginResponseDTO);
      createMap(mapper, RegisterDTO, User);
    };
  }
}
