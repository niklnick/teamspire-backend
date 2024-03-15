import { Activity } from "src/activities/entities/activity.entity";
import { EventUser } from "src/event-users/entities/event-user.entity";
import { Group } from "src/groups/entities/group.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EventStatus } from "../enums/event-status.enum";

@Entity()
export class Event {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column('enum', { enum: EventStatus, default: EventStatus.Draft })
    status: EventStatus;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;

    @UpdateDateColumn({ name: 'update_date' })
    updateDate: Date;

    @ManyToOne(() => Group, (group: Group) => group.events, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'group_id' })
    group: Group;

    @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'organizer_id' })
    organizer: User;

    @OneToMany(() => EventUser, (eventUser: EventUser) => eventUser.event, { cascade: true })
    users: EventUser[];

    @ManyToMany(() => Activity)
    @JoinTable({
        name: 'event_activity',
        joinColumn: { name: 'event_id' },
        inverseJoinColumn: { name: 'activity_id' }
    })
    activities: Activity[];
}
