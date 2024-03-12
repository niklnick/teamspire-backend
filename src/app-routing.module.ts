import { Module } from "@nestjs/common";
import { RouterModule, Routes } from "@nestjs/core";
import { GroupUsersModule } from './group-users/group-users.module';
import { GroupsModule } from './groups/groups.module';
import { UsersModule } from "./users/users.module";

const routes: Routes = [
    {
        path: 'groups',
        module: GroupsModule,
        children: [
            {
                path: ':groupId/users',
                module: GroupUsersModule
            }
        ]
    },
    {
        path: 'users',
        module: UsersModule
    }
];

@Module({
    imports: [
        RouterModule.register(routes),
        GroupUsersModule,
        GroupsModule,
        UsersModule
    ]
})
export class AppRoutingModule { }
