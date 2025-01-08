import { AutoMap } from '@automapper/classes';
import { BaseEntity } from 'src/common/bases/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'api_keys' })
export class ApiKey extends BaseEntity {
  @AutoMap()
  @Column({ unique: true })
  key: string;
}
