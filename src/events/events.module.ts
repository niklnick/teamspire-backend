import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventActivity } from './entities/event-activity.entity';
import { Event } from './entities/event.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventActivity])],
  controllers: [EventsController],
  providers: [EventsService]
})
export class EventsModule { }
