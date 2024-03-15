import { Activity } from "src/activities/entities/activity.entity";
import { User } from "src/users/entities/user.entity";

export class CreateEventUserDto {
    readonly user: User;
    readonly activity?: Activity;
}
