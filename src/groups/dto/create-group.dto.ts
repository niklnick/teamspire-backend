import { User } from "src/users/entities/user.entity";

export class CreateGroupDto {
    readonly title: string;
    readonly users: User[];
    readonly admin: User;
}
