import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createReviewDto: CreateReviewDto,currentUser:User)
  :Promise<Review> {
    const livre=await this.livreService.findOne(createReviewDto.livreId);
    let review=await this.findOneByUserAndLivres(currentUser.id,createReviewDto.livreId);
    if(!review){
      review=this.reviewRepository.create(createReviewDto);
      review.User=currentUser;
      review.livre=livre;
    }else{
      review.comment=createReviewDto.comment,
      review.rating=createReviewDto.rating
    }
    return await this.reviewRepository.save(review);
  }

  findAll() {
    return `This action returns all reviews`;
  }

  async findAllByLivre(id:number):Promise<Review[]>{
    const livre=await this.livreService.findOne(id);
    return await this.reviewRepository.find({
      where:{livre:{id}},
      relations:{
        User:true,
        livre:{
          category:true,
        },
      },
    })
  }
  async findOne(id: number):Promise<Review> {
    const review=await this.reviewRepository.findOne({
      where:{id},
      relations:{
        User:true,
        livre:{
          category:true,
        },
      },
    })
    if(!review) throw new NotFoundException('Review not found.')
    return review;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  async remove(id: number) {
    const review=await this.findOne(id);
    return this.reviewRepository.remove(review);
  }

  async findOneByUserAndLivres(userId:number,livreId:number){
    return await this.reviewRepository.findOne({
      where:{
        User:{
          id:userId,
        },
        livre:{
          id:livreId,
        }
      },
      relations:{
        User:true,
        livre:{
          category:true
        }

      }
    })
  }
}
