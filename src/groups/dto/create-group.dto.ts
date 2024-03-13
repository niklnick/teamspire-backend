import { User } from "src/users/entities/user.entity";
import { GroupUser } from "../entities/group-user.entity";

export class CreateGroupDto {
    readonly title: string;
    readonly users: GroupUser[];
    readonly admin: User;
}
