import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RegisterDTO {
  @ApiProperty()
  @AutoMap()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @AutoMap()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @AutoMap()
  @IsNotEmpty()
  password: string;

  @AutoMap()
  ip: string;
}
