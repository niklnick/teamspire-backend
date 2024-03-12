import { GroupUser } from "src/group-users/entities/group-user.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Group {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'admin_id' })
    admin: User;

    @OneToMany(() => GroupUser, (groupUser: GroupUser) => groupUser.group, { cascade: true })
    users: GroupUser[];
}
