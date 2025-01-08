import { AutoMap } from '@automapper/classes';
import { User } from 'src/api/user/entities/user.entity';
import { BaseEntity } from 'src/common/bases/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'licenses' })
export class License extends BaseEntity {
  @AutoMap()
  @Column()
  appName: string;

  @AutoMap()
  @Column()
  deviceName: string;

  @AutoMap()
  @Column({ unique: true })
  key: string;

  @AutoMap()
  @Column({ unique: true })
  hwid: string;

  @AutoMap()
  @Column({ type: 'timestamp', nullable: true })
  expiredAt: Date;

  @AutoMap()
  @Column({ type: 'integer', nullable: true })
  day: number;

  @AutoMap()
  @ManyToOne(() => User, (user) => user.licenses)
  user: User;
}
