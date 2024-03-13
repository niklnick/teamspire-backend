import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { ActivitiesModule } from './activities/activities.module';
import { EventsModule } from './events/events.module';
import { GroupsModule } from './groups/groups.module';
import { UsersModule } from "./users/users.module";

@Module({
    imports: [
        RouterModule.register([
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
                    }
                ]
            },
            {
                path: 'users',
                module: UsersModule
            }
        ]),
        ActivitiesModule,
        EventsModule,
        GroupsModule,
        UsersModule
    ]
})
export class AppRoutingModlue { }
