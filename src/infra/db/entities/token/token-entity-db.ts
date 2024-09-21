import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("token")
export class TokenEntityDb extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  user_id: string;

  @Column()
  token: string;

  @Column()
  expires_in: number;

  @Column()
  used: boolean;

  @Column()
  created_at: Date;
}
