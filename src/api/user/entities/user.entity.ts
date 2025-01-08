import { AutoMap } from '@automapper/classes';
import { BaseEntity } from 'src/common/bases/base.entity';
import { LevelType } from 'src/common/enums';
import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { License } from '../../license/entities/license.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  username: string;

  @AutoMap()
  @Column()
  password: string;

  @AutoMap()
  @Column({ type: 'timestamp', nullable: true })
  lastLogin?: Date;

  @AutoMap()
  @Column({ type: 'varchar', nullable: true })
  ip: string;

  @AutoMap()
  @Column({
    type: 'enum',
    enum: LevelType,
    name: 'level_type',
    default: LevelType.Basic,
  })
  levelType: string;

  @AutoMap()
  @OneToMany(() => License, (license) => license.user)
  licenses: License[];
}

// license -> text (unique)
// hwid -> text (unique)
// username ->text
// last login -> datetime
// game_name -> text
// ip -> text
// device_name -> text
// level - > int
// day -> int (ex 90) / 90 days
// expired_date - > datetime
// created_at -> datetime
// update_at -> datetime
