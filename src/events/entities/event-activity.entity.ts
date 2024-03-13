import { Activity } from "src/activities/entities/activity.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Event } from "./event.entity";

@Entity()
export class EventActivity {
    @PrimaryColumn({ name: 'event_id' })
    eventId: string;

    @PrimaryColumn({ name: 'activity_id' })
    activityId: string;

    @ManyToOne(() => Event, (event: Event) => event.activities, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'event_id' })
    event: Event;

    @ManyToOne(() => Activity, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'activity_id' })
    activity: Activity;
}
