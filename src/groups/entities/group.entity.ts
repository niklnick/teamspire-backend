import { Event } from "src/events/entities/event.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Group {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    title: string;

    @ManyToMany(() => User, (user: User) => user.groups, { cascade: true })
    @JoinTable({
        name: 'group_user',
        joinColumn: { name: 'group_id' },
        inverseJoinColumn: { name: 'user_id' }
    })
    users: User[];

    @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'admin_id' })
    admin: User;

    @OneToMany(() => Event, (event: Event) => event.group)
    events: Event[];
}
