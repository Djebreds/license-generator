import { AutoMap } from '@automapper/classes';

export class LoginResponseDTO {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  username: string;

  @AutoMap()
  ip: string;

  @AutoMap()
  token: string;
}
