import { User } from "src/users/entities/user.entity";

export class CreateEventDto {
    readonly title: string;
    readonly organizer: User;
}
