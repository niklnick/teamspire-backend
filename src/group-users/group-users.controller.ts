import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateGroupUserDto } from './dto/create-group-user.dto';
import { UpdateGroupUserDto } from './dto/update-group-user.dto';
import { GroupUser } from './entities/group-user.entity';
import { GroupUsersService } from './group-users.service';

@Controller()
export class GroupUsersController {
  constructor(private readonly groupUsersService: GroupUsersService) { }

  @Post()
  async create(@Param('groupId') groupId: string, @Body() createGroupUserDto: CreateGroupUserDto): Promise<GroupUser> {
    return await this.groupUsersService.create(groupId, createGroupUserDto);
  }

  @Get()
  async findAll(@Param('groupId') groupId: string): Promise<GroupUser[]> {
    return await this.groupUsersService.findAll(groupId);
  }

  @Get(':userId')
  async findOne(@Param('groupId') groupId: string, @Param('userId') userId: string): Promise<GroupUser> {
    return await this.groupUsersService.findOne(groupId, userId);
  }

  @Patch(':userId')
  async update(@Param('groupId') groupId: string, @Param('userId') userId: string, @Body() updateGroupUserDto: UpdateGroupUserDto): Promise<GroupUser> {
    return await this.groupUsersService.update(groupId, userId, updateGroupUserDto);
  }

  @Delete(':userId')
  async remove(@Param('groupId') groupId: string, @Param('userId') userId: string): Promise<GroupUser> {
    return await this.groupUsersService.remove(groupId, userId);
  }
}
