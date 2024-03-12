import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupUser } from './entities/group-user.entity';
import { GroupUsersController } from './group-users.controller';
import { GroupUsersService } from './group-users.service';

@Module({
  imports: [TypeOrmModule.forFeature([GroupUser])],
  controllers: [GroupUsersController],
  providers: [GroupUsersService]
})
export class GroupUsersModule { }
