import { User } from "src/users/entities/user.entity";

export class CreateGroupDto {
    readonly name: string;
    readonly admin: User;
}
