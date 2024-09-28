import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

enum Role {
  ADMIN,
  USER,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column({ type: 'varchar' })
  name?: string

  @Column({ type: 'varchar' })
  email?: string

  @Column({ type: 'varchar', name: 'password_hash' })
  password?: string

  @Column({ type: 'varchar', default: 'USER' })
  role?: Role
}
