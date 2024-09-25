import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Csv {
  @PrimaryColumn('uuid')
  id!: string

  @CreateDateColumn({ type: 'date', name: 'created_at' })
  createdAt?: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date

  @Column({ type: 'varchar', name: 'path' })
  path!: string
}
