import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WaitTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  ride_id: string;

  @Column({ nullable: false })
  park_id: string;

  @Column({ nullable: true, default: null })
  wait: number;

  @Column({ nullable: false, default: 'open' })
  status: string;
}
