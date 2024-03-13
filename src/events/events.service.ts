import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
    if (await this.eventsRepository.exists({
      where: { title: createEventDto.title }
    })) throw new ConflictException('Title already assigned!');

    const organizer: User = await this.dataSource
      .createQueryBuilder(User, 'user')
      .leftJoinAndSelect('user.groups', 'group')
      .where('group.id = :groupId', { groupId })
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
    return this.eventsRepository.find({
      where: { group: { id: groupId } },
      relations: { organizer: true }
    });
  }

  async findOne(groupId: string, id: string): Promise<Event> {
    const event: Event | null = await this.eventsRepository.findOne({
      where: { id: id, group: { id: groupId } },
      relations: { organizer: true, activities: true }
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
