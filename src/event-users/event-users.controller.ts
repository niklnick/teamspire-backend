import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateEventUserDto } from './dto/create-event-user.dto';
import { UpdateEventUserDto } from './dto/update-event-user.dto';
import { EventUser } from './entities/event-user.entity';
import { EventUsersService } from './event-users.service';

@Controller()
export class EventUsersController {
  constructor(private readonly eventUsersService: EventUsersService) { }

  @Post()
  async create(@Param('eventId') eventId: string, @Body() createEventUserDto: CreateEventUserDto): Promise<EventUser> {
    return await this.eventUsersService.create(eventId, createEventUserDto);
  }

  @Get()
  async findAll(@Param('eventId') eventId: string): Promise<EventUser[]> {
    return await this.eventUsersService.findAll(eventId);
  }

  @Get(':id')
  async findOne(@Param('eventId') eventId: string, @Param('id') id: string): Promise<EventUser> {
    return await this.eventUsersService.findOne(eventId, id);
  }

  @Patch(':id')
  async update(@Param('eventId') eventId: string, @Param('id') id: string, @Body() updateEventUserDto: UpdateEventUserDto): Promise<EventUser> {
    return await this.eventUsersService.update(eventId, id, updateEventUserDto);
  }

  @Delete(':id')
  async remove(@Param('eventId') eventId: string, @Param('id') id: string): Promise<EventUser> {
    return await this.eventUsersService.remove(eventId, id);
  }
}
