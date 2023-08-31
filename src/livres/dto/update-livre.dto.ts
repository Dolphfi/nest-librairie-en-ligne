import { PartialType } from '@nestjs/swagger';
import { CreateLivreDto } from './create-livre.dto';

export class UpdateLivreDto extends PartialType(CreateLivreDto) {}
