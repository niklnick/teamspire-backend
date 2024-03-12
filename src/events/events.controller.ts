import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { EventsService } from './events.service';

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  @Post()
  async create(@Param('groupId') groupId: string, @Body() createEventDto: CreateEventDto): Promise<Event> {
    return await this.eventsService.create(groupId, createEventDto);
  }

  @Get()
  async findAll(@Param('groupId') groupId: string): Promise<Event[]> {
    return await this.eventsService.findAll(groupId);
  }

  @Get(':id')
  async findOne(@Param('groupId') groupId: string, @Param('id') id: string): Promise<Event> {
    return await this.eventsService.findOne(groupId, id);
  }

  @Patch(':id')
  async update(@Param('groupId') groupId: string, @Param('id') id: string, @Body() updateEventDto: UpdateEventDto): Promise<Event> {
    return await this.eventsService.update(groupId, id, updateEventDto);
  }

  @Delete(':id')
  async remove(@Param('groupId') groupId: string, @Param('id') id: string): Promise<Event> {
    return await this.eventsService.remove(groupId, id);
  }
}
