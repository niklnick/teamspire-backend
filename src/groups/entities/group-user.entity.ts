import { User } from "src/users/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Group } from "./group.entity";

@Entity()
export class GroupUser {
    @PrimaryColumn({ name: 'group_id' })
    groupId: string;

    @PrimaryColumn({ name: 'user_id' })
    userId: string;

    @ManyToOne(() => Group, (group: Group) => group.users, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'group_id' })
    group: Group;

    @ManyToOne(() => User, (user: User) => user.groups, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
}
