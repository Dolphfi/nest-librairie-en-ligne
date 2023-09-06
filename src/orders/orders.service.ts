import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrdersLivres } from './entities/orders-livre.entity';
import { Shipping } from './entities/shipping.entity';
import { Livre } from 'src/livres/entities/livre.entity';
import { LivresService } from 'src/livres/livres.service';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderStatus } from './enums/order-status.enum';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) 
  private readonly orderRepository: Repository<Order>,
  @InjectRepository(OrdersLivres)
  private readonly olRepository: Repository<OrdersLivres>,
  private readonly livreServices: LivresService
  ){}

  async create(createOrderDto: CreateOrderDto, currentUser: User):Promise<Order>  {
    const shipping = new Shipping();
    Object.assign(shipping, createOrderDto.shippingAddress);
    const orderEntity = new Order();
    orderEntity.shippingAddress = shipping;
    orderEntity.user = currentUser;
    const orderTable = await this.orderRepository.save(orderEntity);
    let olEntity:{
      order:Order,
      livre:Livre,
      livre_quantity:number,
      livre_price_unit:number,
    }[] = [];
    for(let i = 0; i < createOrderDto.orderedLivres.length; i++){
      const order = orderTable;
      const livre = await this.livreServices.findOne(createOrderDto.orderedLivres[i].id);
      const livre_quantity = createOrderDto.orderedLivres[i].livre_quantity;
      const livre_price_unit = createOrderDto.orderedLivres[i].livre_price_unit;
      olEntity.push({
        order,
        livre,
        livre_quantity,
        livre_price_unit
        });
    }

    const ol = await this.olRepository.createQueryBuilder()
    .insert()
    .into(OrdersLivres)
    .values(olEntity)
    .execute();
    return await this.findOne(orderTable.id) ; 
  }

  async findAll():Promise<Order[]>  {
    return await this.orderRepository.find({
      relations:{
        shippingAddress: true,
        user: true,
        livres:{livre:true},
      },
    });
  }

  async findOne(id: number):Promise<Order>  {
    return await this.orderRepository.findOne({
      where: { id },
      relations:{
        shippingAddress: true,
        user: true,
        livres:{livre:true},
      },
    });
  }

  async update(id: number, updateOrderStatusDto: UpdateOrderStatusDto, currentUser:User) {
    let order = await this.findOne(id);
    if (!order) throw new NotFoundException('Order not found');
    if ((order.status===OrderStatus.DELIVERED) || (order.status===OrderStatus.CANCELLED)) {
      throw new BadRequestException(`Order already ${order.status}`);
    }
    if ((order.status===OrderStatus.PENDING) && (updateOrderStatusDto.status!=OrderStatus.SHIPPED)) {
      throw new BadRequestException(`Delivery before shipped!!!`);
    }
    if ((updateOrderStatusDto.status===OrderStatus.SHIPPED) && (order.status===OrderStatus.SHIPPED)) {
      return order
    }
    if (updateOrderStatusDto.status===OrderStatus.SHIPPED) {
      order.ShippedAt = new Date();
    }
    if (updateOrderStatusDto.status===OrderStatus.DELIVERED) {
      order.deliveredAt = new Date();
    }
    order.status = updateOrderStatusDto.status;
    order.updatedBy = currentUser;
    order = await this.orderRepository.save(order);
    if (updateOrderStatusDto.status===OrderStatus.DELIVERED) {
      await this.stockUpdate(order,OrderStatus.DELIVERED)
    }
    return order;
  }

  async cancelled(id: number, currentUser:User) {
    let order = await this.findOne(id);
    if (!order) throw new NotFoundException('Order not found');
    if(order.status===OrderStatus.CANCELLED) return order;
    order.status=OrderStatus.CANCELLED;
    order.updatedBy=currentUser;
    order = await this.orderRepository.save(order);
    await this.stockUpdate(order, OrderStatus.CANCELLED)
    return order;
  }

  async stockUpdate(order:Order,status:string){
    for (const ol of order.livres) {
      await this.livreServices.updateStock(ol.livre.id,ol.livre_quantity,status);
    }
  }
}
