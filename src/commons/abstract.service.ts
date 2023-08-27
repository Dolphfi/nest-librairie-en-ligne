import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { PaginateResult } from "./paginate-result.interface";

@Injectable()
export abstract class AbstracService {
    protected constructor(private readonly repository: Repository<any>) { }
    
    async create(data:any):Promise<any> {
        return await this.repository.save(data);
    }

    async find( relations = []): Promise<any[]>{
        return await this.repository.find({relations,order:{createdAt:'desc'}});
    }

    async findAll(page: number , relations = []): Promise<PaginateResult> {
        const take = 15;
        if (page === 0 || !page) {
          page = 1;
        }
        const [data, total] = await this.repository.findAndCount({
          take,
          skip: (page - 1) * take,
          relations,order:{createdAt:'desc'}
        });
    
        return {
          data,
          meta: {
            total,
            CurrentPage: page,
            nextPage: page + 1,
            previousPage: Math.ceil(page - 1),
            firstPaginate: 1,
            lastPaginate: Math.ceil(total / take),
          },
        };
    }
    
  async findOne(
     
        condition:any,
        relations: any[] = [],
  ): Promise<any> {
    
        const data = await this.repository.findOne({
          where: condition,
          relations,
        });
    
        if (!data) {
            throw new NotFoundException(`data not found`)
        }
    
        return data;
    }
    
    async update(id: number, data:any): Promise<any> {
        const findData = await this.findOne({ id });
        if (!findData) {
            throw new NotFoundException(`data not found`)
        }
    
        const convertData = Object.assign(findData, data);
    
        await this.repository.update(id, data);
        return convertData;
    }
    
    async remove(id: number): Promise<any> {
        const data = await this.findOne({ id });
        if (!data) {
            throw new NotFoundException(`data not found`)
        }
    
        await this.repository.delete(id);
        return data;
      }
}