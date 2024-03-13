import { EventUser } from "src/events/entities/event-user.entity";
import { Group } from "src/groups/entities/group.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;

    @ManyToMany(() => Group, (group: Group) => group.users)
    groups: Group[];

    // TODO: Cascade on patch doesnt work. User should be able to delete to unparticipate, or add an activity vote
    @OneToMany(() => EventUser, (eventUser: EventUser) => eventUser.user, { cascade: true })
    events: EventUser[];
}
