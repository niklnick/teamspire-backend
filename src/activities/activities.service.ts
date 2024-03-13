import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from './entities/activity.entity';

@Injectable()
export class ActivitiesService {
  constructor(@InjectRepository(Activity) private readonly activitiesRepository: Repository<Activity>) { }

  async create(createActivityDto: CreateActivityDto): Promise<Activity> {
    const activity: Activity = this.activitiesRepository.create(createActivityDto);

    return await this.activitiesRepository.save(activity);
  }

  async findAll(): Promise<Activity[]> {
    return await this.activitiesRepository.find();
  }

  async findOne(id: string): Promise<Activity> {
    const activity: Activity | null = await this.activitiesRepository.findOne({
      where: { id: id },
      relations: { creator: true }
    });

    if (!activity) throw new NotFoundException();

    return activity;
  }

  async update(id: string, updateActivityDto: UpdateActivityDto): Promise<Activity> {
    const activity: Activity | null = await this.activitiesRepository.findOne({
      where: { id: id }
    });

    if (!activity) throw new NotFoundException();

    return await this.activitiesRepository.save({ ...activity, ...updateActivityDto });
  }

  async remove(id: string): Promise<Activity> {
    const activity: Activity | null = await this.activitiesRepository.findOne({
      where: { id: id }
    });

    if (!activity) throw new NotFoundException();

    return await this.activitiesRepository.remove(activity);
  }
}
