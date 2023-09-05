import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { LivresService } from 'src/livres/livres.service';

@Injectable()
export class ReviewsService {
  constructor(@InjectRepository(Review)
  private readonly reviewRepository:Repository<Review>,
  private readonly livreService:LivresService
  ){}

  async create(createReviewDto: CreateReviewDto,currentUser:User) {
    const livvre=await this.livreService.findOne(createReviewDto.livreId);

    return createReviewDto;
  }

  findAll() {
    return `This action returns all reviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }

  async findOneByUserAndLivres(userId:number,livreId:number){
    return await this.reviewRepository.findOne({
      where:{
      user:{
        id:userId
      },
    }
  })
    

  }
}
