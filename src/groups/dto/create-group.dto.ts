import { GroupUser } from "src/group-users/entities/group-user.entity";
import { User } from "src/users/entities/user.entity";

export class CreateGroupDto {
    readonly name: string;
    readonly admin: User;
    readonly users: GroupUser[];
}
