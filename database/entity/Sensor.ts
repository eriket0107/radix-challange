import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Sensor {
  @PrimaryColumn('uuid')
  id!: number

  @CreateDateColumn({ type: 'date', name: 'created_at' })
  createdAt!: Date

  @Column({ type: 'varchar', name: 'equipment_id' })
  equipmentId!: string

  @Column({ type: 'float' })
  value!: number

  @CreateDateColumn({ type: 'date', name: 'timestamp' })
  timestamp!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date
}
