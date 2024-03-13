import { EventActivity } from "../entities/event-activity.entity";

export class CreateEventDto {
    readonly title: string;
    readonly activities: EventActivity[];
}
