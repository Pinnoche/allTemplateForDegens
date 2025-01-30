import { PartialType } from '@nestjs/mapped-types';
import { CreateDDatumDto } from './create-d-datum.dto';

export class UpdateDDatumDto extends PartialType(CreateDDatumDto) {}
