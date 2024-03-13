import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(Event) private readonly eventsRepository: Repository<Event>
  ) { }

  async create(groupId: string, createEventDto: CreateEventDto): Promise<Event> {
    const organizer: User = await this.dataSource
      .createQueryBuilder(User, 'user')
      .leftJoin('user.groups', 'group', 'group.group_id = :groupId', { groupId })
      .orderBy('RANDOM()')
      .getOne();

    const event: Event = this.eventsRepository.create({
      group: { id: groupId },
      organizer: organizer,
      ...createEventDto
    });

    return await this.eventsRepository.save(event);
  }

  async findAll(groupId: string): Promise<Event[]> {
    return await this.eventsRepository.find({
      where: { group: { id: groupId } }
    });
  }

  async findOne(groupId: string, id: string): Promise<Event> {
    const event: Event | null = await this.eventsRepository.findOne({
      where: { id: id, group: { id: groupId } },
      relations: { organizer: true, activities: { activity: { userVotes: true } } }
    });

    if (!event) throw new NotFoundException();

    return event;
  }

  async update(groupId: string, id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const event: Event | null = await this.eventsRepository.findOne({
      where: { id: id, group: { id: groupId } }
    });

    if (!event) throw new NotFoundException();

    return await this.eventsRepository.save({ ...event, ...updateEventDto });
  }

  async remove(groupId: string, id: string): Promise<Event> {
    const event: Event | null = await this.eventsRepository.findOne({
      where: { id: id, group: { id: groupId } }
    });

    if (!event) throw new NotFoundException();

    return await this.eventsRepository.remove(event);
  }
}
