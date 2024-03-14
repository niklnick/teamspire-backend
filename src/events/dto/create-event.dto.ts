import { Activity } from "src/activities/entities/activity.entity";

export class CreateEventDto {
    readonly title: string;
    readonly activities: Activity[];
}
