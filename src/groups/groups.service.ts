import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupsService {
  constructor(@InjectRepository(Group) private readonly groupsRepository: Repository<Group>) { }

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    if (await this.groupsRepository.exists({
      where: { name: createGroupDto.name }
    })) throw new ConflictException('Name already assigned!');

    const group: Group = this.groupsRepository.create(createGroupDto);

    return await this.groupsRepository.save(group);
  }

  async findAll(): Promise<Group[]> {
    return await this.groupsRepository.find({ relations: { admin: true } });
  }

  async findOne(id: string): Promise<Group> {
    const group: Group | null = await this.groupsRepository.findOne({
      where: { id: id },
      relations: { admin: true, users: { user: true }, events: true }
    });

    if (!group) throw new NotFoundException();

    return group;
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    const group: Group | null = await this.groupsRepository.findOne({ where: { id: id } });

    if (!group) throw new NotFoundException();

    return await this.groupsRepository.save({ ...group, ...updateGroupDto });
  }

  async remove(id: string): Promise<Group> {
    const group: Group | null = await this.groupsRepository.findOne({ where: { id: id } });

    if (!group) throw new NotFoundException();

    return await this.groupsRepository.remove(group);
  }
}
