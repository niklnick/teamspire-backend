import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventUser } from './entities/event-user.entity';
import { EventUsersController } from './event-users.controller';
import { EventUsersService } from './event-users.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventUser])],
  controllers: [EventUsersController],
  providers: [EventUsersService]
})
export class EventUsersModule { }
