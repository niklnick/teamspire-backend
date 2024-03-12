import { User } from "src/users/entities/user.entity";

export class CreateActivityDto {
    readonly title: string;
    readonly creator: User;
}
