import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventUserDto } from './dto/create-event-user.dto';
import { UpdateEventUserDto } from './dto/update-event-user.dto';
import { EventUser } from './entities/event-user.entity';

@Injectable()
export class EventUsersService {
  constructor(@InjectRepository(EventUser) private readonly eventUsersRepository: Repository<EventUser>) { }

  async create(eventId: string, createEventUserDto: CreateEventUserDto): Promise<EventUser> {
    if (await this.eventUsersRepository.exists({
      where: { userId: createEventUserDto.user.id }
    })) throw new ConflictException('User already assigned!');

    const eventUser: EventUser = this.eventUsersRepository.create({
      eventId: eventId,
      ...createEventUserDto
    });

    return await this.eventUsersRepository.save(eventUser);
  }

  async findAll(eventId: string): Promise<EventUser[]> {
    return await this.eventUsersRepository.find({
      where: { eventId: eventId },
      relations: { user: true }
    });
  }

  async findOne(eventId: string, id: string): Promise<EventUser> {
    const eventUser: EventUser | null = await this.eventUsersRepository.findOne({
      where: { eventId: eventId, userId: id },
      relations: { user: true, votedActivity: true }
    });

    if (!eventUser) throw new NotFoundException();

    return eventUser;
  }

  async update(eventId: string, id: string, updateEventUserDto: UpdateEventUserDto): Promise<EventUser> {
    const eventUser: EventUser | null = await this.eventUsersRepository.findOne({
      where: { eventId: eventId, userId: id }
    });

    if (!eventUser) throw new NotFoundException();

    return await this.eventUsersRepository.save({ ...eventUser, ...updateEventUserDto });
  }

  async remove(eventId: string, id: string): Promise<EventUser> {
    const eventUser: EventUser | null = await this.eventUsersRepository.findOne({
      where: { eventId: eventId, userId: id }
    });

    if (!eventUser) throw new NotFoundException();

    return await this.eventUsersRepository.remove(eventUser);
  }
}
