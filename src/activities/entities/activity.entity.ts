import { EventUser } from "src/event-users/entities/event-user.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Activity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;

    @UpdateDateColumn({ name: 'update_date' })
    updateDate: Date;

    @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'creator_id' })
    creator: User;

    @OneToMany(() => EventUser, (eventUser: EventUser) => eventUser.votedActivity)
    userVotes: EventUser[];
}
