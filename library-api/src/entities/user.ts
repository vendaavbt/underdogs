// entities/user.entity.ts

import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type UserId = string & { __brand: 'User' };

@Entity('User')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UserId;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
