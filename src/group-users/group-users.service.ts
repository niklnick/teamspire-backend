import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupUserDto } from './dto/create-group-user.dto';
import { UpdateGroupUserDto } from './dto/update-group-user.dto';
import { GroupUser } from './entities/group-user.entity';

@Injectable()
export class GroupUsersService {
  constructor(@InjectRepository(GroupUser) private readonly groupUserRepository: Repository<GroupUser>) { }

  async create(groupId: string, createGroupUserDto: CreateGroupUserDto): Promise<GroupUser> {
    if (await this.groupUserRepository.exists({
      where: { user: { id: createGroupUserDto.user.id } }
    })) throw new ConflictException('User already assigned!');

    const groupUser: GroupUser = this.groupUserRepository.create({
      groupId: groupId,
      ...createGroupUserDto
    });

    return await this.groupUserRepository.save(groupUser);
  }

  async findAll(groupId: string): Promise<GroupUser[]> {
    return await this.groupUserRepository.find({
      where: { groupId: groupId },
      relations: { user: true }
    });
  }

  async findOne(groupId: string, userId: string): Promise<GroupUser> {
    const groupUser: GroupUser | null = await this.groupUserRepository.findOne({
      where: { groupId: groupId, userId: userId },
      relations: { user: true }
    });

    if (!groupUser) throw new NotFoundException();

    return groupUser;
  }

  async update(groupId: string, userId: string, updateGroupUserDto: UpdateGroupUserDto): Promise<GroupUser> {
    const groupUser: GroupUser | null = await this.groupUserRepository.findOne({
      where: { groupId: groupId, userId: userId }
    });

    if (!groupUser) throw new NotFoundException();

    return await this.groupUserRepository.save({ ...groupUser, ...updateGroupUserDto });
  }

  async remove(groupId: string, userId: string): Promise<GroupUser> {
    const groupUser: GroupUser | null = await this.groupUserRepository.findOne({
      where: { groupId: groupId, userId: userId }
    });

    if (!groupUser) throw new NotFoundException();

    return await this.groupUserRepository.remove(groupUser);
  }
}
