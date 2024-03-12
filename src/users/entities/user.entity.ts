import { GroupUser } from "src/group-users/entities/group-user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @OneToMany(() => GroupUser, (groupUser: GroupUser) => groupUser.user)
    groups: GroupUser[];
}
