import { Event } from "src/events/entities/event.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GroupUser } from "./group-user.entity";

@Entity()
export class Group {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @OneToMany(() => GroupUser, (groupUser: GroupUser) => groupUser.group, { cascade: true })
    users: GroupUser[];

    // TODO: Should be able to have multiple admins.
    @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'admin_id' })
    admin: User;

    @OneToMany(() => Event, (event: Event) => event.group)
    events: Event[];
}
