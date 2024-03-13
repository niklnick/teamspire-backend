import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GroupUser } from "./group-user.entity";

@Entity()
export class Group {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    title: string;

    @OneToMany(() => GroupUser, (groupUser: GroupUser) => groupUser.group, { cascade: true })
    users: GroupUser[];

    // TODO: Should be able to have multiple admins.
    @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'admin_id' })
    admin: User;
}
