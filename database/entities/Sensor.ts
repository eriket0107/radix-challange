import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Sensor {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date

  @Column({ type: 'varchar', name: 'equipment_id' })
  equipmentId!: string

  @CreateDateColumn({ type: 'date', name: 'timestamp', nullable: true })
  timestamp?: string

  @Column({ type: 'float', nullable: true })
  value?: number
}
