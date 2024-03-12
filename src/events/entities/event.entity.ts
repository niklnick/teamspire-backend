import { Group } from "src/groups/entities/group.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EventStatus } from "../enums/event-status.enum";

@Entity()
export class Event {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    title: string;

    @Column('enum', { enum: EventStatus, default: EventStatus.Draft })
    status: EventStatus;

    @ManyToOne(() => Group, (group: Group) => group.events, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'group_id' })
    group: Group;

    @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'organizer_id' })
    organizer: User;
}
