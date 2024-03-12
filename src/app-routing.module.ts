import { Module } from "@nestjs/common";
import { RouterModule, Routes } from "@nestjs/core";
import { ActivitiesModule } from './activities/activities.module';
import { EventsModule } from './events/events.module';
import { GroupUsersModule } from './group-users/group-users.module';
import { GroupsModule } from './groups/groups.module';
import { UsersModule } from "./users/users.module";

const routes: Routes = [
    {
        path: 'activities',
        module: ActivitiesModule
    },
    {
        path: 'groups',
        module: GroupsModule,
        children: [
            {
                path: ':groupId/events',
                module: EventsModule
            },
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
        ActivitiesModule,
        EventsModule,
        GroupUsersModule,
        GroupsModule,
        UsersModule
    ]
})
export class AppRoutingModule { }
