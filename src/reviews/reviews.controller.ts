import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('reviews')
@ApiTags('Commentaires')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(AuthentificationGuard)
  @Post()
  @ApiOperation({ description: 'this is the endpoint for add  a comment' })
  async create(@Body() createReviewDto: CreateReviewDto,@CurrentUser() currentUser:User) {
    return await this.reviewsService.create(createReviewDto,currentUser);
  }

  @Get('/all')
  @ApiOperation({description: 'this is the endpoint for retrieving all  comment',})
  @ApiResponse({type:Review, isArray:true})
  async findAll() {
    return await this.reviewsService.findAll();
  }

  @Get()
  @ApiOperation({description: 'this is the endpoint for retrieving all  comment by livre',})
  @ApiResponse({type:Review, isArray:true})
  async findAllByLivre(@Body('livreId') livreId:number){
    return await this.reviewsService.findAllByLivre(+livreId);
  }
  
  
  @Get(':id')
  @ApiOperation({description: 'this is the endpoint for retrieving  one comment'})
  @ApiResponse({type:Review, isArray:false})
  @ApiParam({name:'id',type:'number',description:'id du commentaire'})
  async findOne(@Param('id',ParseIntPipe) id: string):Promise<Review> {
    return await this.reviewsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({description: 'this is the endpoint for updating  a comment',})
  @ApiParam({name:'id',type:'number',description:'id du commentaire'})
  @ApiResponse({type:Review, isArray:false})
  update(@Param('id',ParseIntPipe) id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @AuthorizeRoles(UserRole.Admin)
  @UseGuards(AuthentificationGuard,AuthorizeGuard)
  @Delete(':id')
  @ApiOperation({description: 'this is the endpoint for deleting  a comment',})
  @ApiParam({name:'id',type:'number',description:'id du commentaire'})
  @ApiResponse({type:Review, isArray:false})
  remove(@Param('id',ParseIntPipe) id: string) {
    return this.reviewsService.remove(+id);
  }
}
