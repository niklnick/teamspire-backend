import { Event } from "src/events/entities/event.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Group {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;

    @ManyToMany(() => User, (user: User) => user.groups)
    @JoinTable({
        name: 'group_user',
        joinColumn: { name: 'group_id' },
        inverseJoinColumn: { name: 'user_id' }
    })
    users: User[];

    // TODO: Should be able to have multiple admins.
    @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'admin_id' })
    admin: User;

    @OneToMany(() => Event, (event: Event) => event.group)
    events: Event[];
}
