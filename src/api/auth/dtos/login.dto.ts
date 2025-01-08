import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
