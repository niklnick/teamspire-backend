import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { ActivitiesModule } from './activities/activities.module';
import { EventUsersModule } from './event-users/event-users.module';
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
                        module: EventsModule,
                        children: [
                            {
                                path: ':eventId/users',
                                module: EventUsersModule
                            }
                        ]
                    }
                ]
            },
            {
                path: 'users',
                module: UsersModule
            }
        ]),
        ActivitiesModule,
        EventUsersModule,
        EventsModule,
        GroupsModule,
        UsersModule
    ]
})
export class AppRoutingModlue { }
