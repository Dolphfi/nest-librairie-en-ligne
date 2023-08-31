import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LivresService } from './livres.service';
import { CreateLivreDto } from './dto/create-livre.dto';
import { UpdateLivreDto } from './dto/update-livre.dto';

@Controller('livres')
export class LivresController {
  constructor(private readonly livresService: LivresService) {}

  @Post()
  create(@Body() createLivreDto: CreateLivreDto) {
    return this.livresService.create(createLivreDto);
  }

  @Get()
  findAll() {
    return this.livresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.livresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLivreDto: UpdateLivreDto) {
    return this.livresService.update(+id, updateLivreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.livresService.remove(+id);
  }
}
