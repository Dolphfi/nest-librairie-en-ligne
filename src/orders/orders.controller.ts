import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthentificationGuard } from 'src/utility/guards/authentification.guard';
import { CurrentUser } from 'src/utility/decorators/current-users.decorator';
import { User } from 'src/users/entities/user.entity';
import { Order } from './entities/order.entity';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';
import { UserRole } from 'src/utility/common/user-roles.enum';
import { AuthorizeRoles } from 'src/utility/decorators/authorize-roles.decorator';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Controller('orders')
@ApiTags('Commandes')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthentificationGuard)
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto,@CurrentUser() currentUser:User):Promise<Order> {
    return await this.ordersService.create(createOrderDto,currentUser);
  }

  @Get()
  async findAll():Promise<Order[]>  {
    return await this.ordersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id',ParseIntPipe) id: string):Promise<Order> {
    return await this.ordersService.findOne(+id);
  }

  @AuthorizeRoles(UserRole.Admin)
  @UseGuards(AuthentificationGuard,AuthorizeGuard)
  @Put(':id')
  async update(@Param('id',ParseIntPipe) id: string, @Body() updateOrderStatusDto: UpdateOrderStatusDto, @CurrentUser() currentUser:User) {
    return await this.ordersService.update(+id, updateOrderStatusDto, currentUser);
  }

  @AuthorizeRoles(UserRole.Admin)
  @UseGuards(AuthentificationGuard,AuthorizeGuard)
  @Put('cancel/:id')
  async cancelled(@Param('id',ParseIntPipe) id: string, @CurrentUser() currentUser:User){
    return await this.ordersService.cancelled(+id, currentUser);
  }
}
