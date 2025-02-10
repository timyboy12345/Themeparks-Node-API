import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Push {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  parkId: String;

  @Column()
  poiId: String;

  @Column()
  minutes: Number;

  @Column({
    default: false
  })
  downUp: Boolean;
}
