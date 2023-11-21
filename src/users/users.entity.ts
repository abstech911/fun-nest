import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude() //This would exclude this property
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with ', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed User with ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated User with ${this.id}`);
  }
}
