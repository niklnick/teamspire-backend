import { Module } from "@nestjs/common";
import { RouterModule, Routes } from "@nestjs/core";
import { ActivitiesModule } from './activities/activities.module';
import { GroupsModule } from './groups/groups.module';
import { UsersModule } from "./users/users.module";

const routes: Routes = [
    {
        path: 'activities',
        module: ActivitiesModule
    },
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
        ActivitiesModule,
        GroupsModule,
        UsersModule
    ]
})
export class AppRoutingModlue { }
