import { Module } from "@nestjs/common";
import { RouterModule, Routes } from "@nestjs/core";
import { ActivitiesModule } from './activities/activities.module';
import { UsersModule } from "./users/users.module";

const routes: Routes = [
    {
        path: 'activities',
        module: ActivitiesModule
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
        ActivitiesModule
    ]
})
export class AppRoutingModlue { }
