import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { AuthentificationGuard } from 'src/utility/guards/authentification.guard';
import { CurrentUser } from 'src/utility/decorators/current-users.decorator';
import { cursorTo } from 'readline';
import { User } from 'src/users/entities/user.entity';
import { Review } from './entities/review.entity';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';
import { UserRole } from 'src/utility/common/user-roles.enum';
import { AuthorizeRoles } from 'src/utility/decorators/authorize-roles.decorator';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(AuthentificationGuard)
  @Post()
  async create(@Body() createReviewDto: CreateReviewDto,@CurrentUser() currentUser:User) {
    return await this.reviewsService.create(createReviewDto,currentUser);
  }

  @Get('/all')
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get()
  async findAllByLivre(@Body('livreId') livreId:number){
    return await this.reviewsService.findAllByLivre(+livreId);
  }
  
  
  @Get(':id')
  async findOne(@Param('id') id: string):Promise<Review> {
    return await this.reviewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @AuthorizeRoles(UserRole.Admin)
  @UseGuards(AuthentificationGuard,AuthorizeGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
