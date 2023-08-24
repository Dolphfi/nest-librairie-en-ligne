import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthentService } from './authent.service';
import { CreateAuthentDto } from './dto/create-authent.dto';
import { UpdateAuthentDto } from './dto/update-authent.dto';

@Controller('authent')
export class AuthentController {
  constructor(private readonly authentService: AuthentService) {}

  @Post()
  create(@Body() createAuthentDto: CreateAuthentDto) {
    return this.authentService.create(createAuthentDto);
  }

  @Get()
  findAll() {
    return this.authentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthentDto: UpdateAuthentDto) {
    return this.authentService.update(+id, updateAuthentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authentService.remove(+id);
  }
}
