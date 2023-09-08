import { BadRequestException, Inject, Injectable,NotFoundException, forwardRef } from '@nestjs/common';
import { CreateLivreDto } from './dto/create-livre.dto';
import { UpdateLivreDto } from './dto/update-livre.dto';
import { Livre } from './entities/livre.entity';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryService } from 'src/category/category.service';
import { OrderStatus } from 'src/orders/enums/order-status.enum';
import databaseSource from 'database/database-source';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class LivresService {
  constructor(@InjectRepository(Livre)
  private readonly livreRepository:Repository<Livre>,
  private readonly categoryService: CategoryService,
  @Inject(forwardRef(()=>OrdersService)) private readonly orderService:OrdersService){}
  
  async create(createLivreDto: CreateLivreDto,currentUser:User,
    ): Promise<Livre> {
  const category = await this.categoryService.findOne(
  +createLivreDto.categoryId);
  const livre = this.livreRepository.create(createLivreDto);
  const livreExist = await this.livreRepository.findOne({where: {titre: livre.titre}});
  if(livreExist) throw new NotFoundException('Livre already exist');
  livre.category  = category;
  livre.addedBy = currentUser;

  return await this.livreRepository.save(livre)
  }

  async findAll(query:any): Promise<{livres:any[], totalLivres, limit}> {
    let filteredTotalLivres:number;
    let limit:number;
    if(!query.limit){
      limit=4;
    }else{
      limit=query.limit;
    }

    const queryBuilder = databaseSource.getRepository(Livre)
    .createQueryBuilder('livre')
    .leftJoinAndSelect('livre.category', 'category')
    .leftJoin('livre.reviews','review')
    .addSelect([
      'COUNt(review.id) AS reviews_count',
      'AVG(review.rating) AS reviewsratingAvg',
    ])
    .groupBy('livre.id,category.id');
    const totalLivres = await queryBuilder.getCount();

    if(query.titre){
      const titre = query.titre; 
      queryBuilder.andWhere('livre.titre like :titre',{ 
        titre: `%${titre}%`,});
    }

    if(query.category){
      const category = query.category;
      queryBuilder.andWhere('category.id = :category',{ category: category});
    }

    if(query.auteur){
      const auteur = query.auteur;
      queryBuilder.andWhere('livre.auteur like :auteur',{ auteur: `%${auteur}%`,});
    }

    if(query.minPrice){
      const minPrice = query.minPrice;
      queryBuilder.andWhere('livre.prix >= :minPrice',{ minPrice: minPrice});
    }

    if(query.maxPrice){
      const maxPrice = query.maxPrice;
      queryBuilder.andWhere('livre.prix <= :maxPrice',{ maxPrice: maxPrice});
    }

    if(query.minRating){
      const minRating = query.minRating;
      queryBuilder.andHaving('AVG(review.rating) >= :minRating',{ minRating: minRating});
    }

    if(query.maxRating){
      const maxRating = query.maxRating;
      queryBuilder.andHaving('AVG(review.rating) <= :maxRating',{ maxRating: maxRating});
    }
    queryBuilder.limit(limit);
    if (query.offset) {
      queryBuilder.offset(query.offset);
    }
     
    const livres = await queryBuilder.getRawMany();


    return {livres, totalLivres, limit};
  }

  async findOne(id: number) {
    const livre= await this.livreRepository.findOne({
      where:{ id : id },
      relations:{
        addedBy:true,
        category:true,
      },
      select:{
        addedBy:{
          id:true,
          nom:true,
          prenom:true,
          email:true,
          roles:true,
        },
        category:{
          id:true,
          genre:true,
        },
      }
    });
    if (!livre) throw new NotFoundException('Livre not found.');
    return livre;
  }

  async update(id: number, updateLivreDto:Partial<UpdateLivreDto>,currentUser:User,):Promise<Livre> {
    const livre=await this.findOne(id);
    Object.assign(livre,updateLivreDto)
    livre.addedBy=currentUser;
    if(updateLivreDto.categoryId){
      const category = await this.categoryService.findOne(
      +updateLivreDto.categoryId);
      livre.category  = category;
    }

    return await this.livreRepository.save(livre);
  }

  async remove(id: number) {
    const livreExist = await this.findOne(id)
    const order = await this.orderService.findOneByLivreId(livreExist.id);
    if (order) throw new BadRequestException('Livre already ordered');
    if (!livreExist) new NotFoundException(``)
    if (!livreExist) throw new NotFoundException(`Livre not found.`);
    return await this.livreRepository.remove(livreExist);
  }

  async updateStock(id:number, stock:number, status:string){
    let livre = await this.findOne(id);
    if (status===OrderStatus.DELIVERED) {
      livre.stock-=stock;
    }else{
      livre.stock+=stock;
    }
    livre = await this.livreRepository.save(livre);
    return livre;
  }
}
