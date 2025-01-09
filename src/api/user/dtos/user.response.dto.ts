import { AutoMap } from '@automapper/classes';
import { LevelType } from '@common/enums';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDTO {
  @ApiProperty()
  @AutoMap()
  id: string;

  @ApiProperty()
  @AutoMap()
  name: string;

  @ApiProperty()
  @AutoMap()
  username: string;

  @ApiProperty()
  @AutoMap()
  lastLoginAt: Date;

  @ApiProperty()
  @AutoMap()
  ip: Date;

  @ApiProperty()
  @AutoMap()
  LevelType: LevelType;
}
