import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthentDto } from './create-authent.dto';

export class UpdateAuthentDto extends PartialType(CreateAuthentDto) {}
