import { PartialType } from '@nestjs/mapped-types';
import { EventUser } from 'src/event-users/entities/event-user.entity';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    readonly events?: EventUser[];
}
