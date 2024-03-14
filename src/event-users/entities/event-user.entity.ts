import { Activity } from "src/activities/entities/activity.entity";
import { Event } from "src/events/entities/event.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class EventUser {
    @PrimaryColumn({ name: 'event_id' })
    eventId: string;

    @PrimaryColumn({ name: 'user_id' })
    userId: string;

    @ManyToOne(() => Event, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'event_id' })
    event: Event;

    @ManyToOne(() => User, (user: User) => user.events, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Activity, (activity: Activity) => activity.userVotes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'voted_activity_id' })
    votedActivity?: Activity | null;
}
