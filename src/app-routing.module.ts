import { Module } from "@nestjs/common";
import { RouterModule, Routes } from "@nestjs/core";
import { GroupsModule } from './groups/groups.module';
import { UsersModule } from "./users/users.module";

const routes: Routes = [
    {
        path: 'groups',
        module: GroupsModule
    },
    {
        path: 'users',
        module: UsersModule
    }
];

@Module({
    imports: [
        RouterModule.register(routes),
        UsersModule,
        GroupsModule
    ]
})
export class AppRoutingModule { }
