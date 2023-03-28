import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Checkin {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @Column({type: 'timestamp'})
  dateTime: Date;

  @Column()
  parkId: string;

  @Column()
  rideId: string;

  @Column({
    nullable: true
  })
  waitTime: number;
}
