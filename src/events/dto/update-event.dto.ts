import { PartialType } from '@nestjs/mapped-types';
import { EventStatus } from '../enums/event-status.enum';
import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto extends PartialType(CreateEventDto) {
    readonly status?: EventStatus;
}
