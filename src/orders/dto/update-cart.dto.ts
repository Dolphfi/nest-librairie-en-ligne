import { PartialType } from '@nestjs/swagger';
import { OrderedLivresDto } from './ordered-livres.dto';

export class UpdateCartDto  extends PartialType(OrderedLivresDto) {}