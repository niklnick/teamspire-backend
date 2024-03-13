import { EventUser } from "src/events/entities/event-user.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Activity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'creator_id' })
    creator: User;

    @OneToMany(() => EventUser, (eventUser: EventUser) => eventUser.votedActivity)
    userVotes: EventUser[];
}
