import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Group {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    title: string;

    @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'admin_id' })
    admin: User;
}
