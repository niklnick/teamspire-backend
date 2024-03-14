import { EventUser } from "src/event-users/entities/event-user.entity";
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

    @OneToMany(() => EventUser, (eventUser: EventUser) => eventUser.user)
    events: EventUser[];
}
