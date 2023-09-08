import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, ParseIntPipe, Patch } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthentificationGuard } from 'src/utility/guards/authentification.guard';
import { CurrentUser } from 'src/utility/decorators/current-users.decorator';
import { User } from 'src/users/entities/user.entity';
import { Order } from './entities/order.entity';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';
import { UserRole } from 'src/utility/common/user-roles.enum';
import { AuthorizeRoles } from 'src/utility/decorators/authorize-roles.decorator';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('orders')
@ApiTags('Commandes')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthentificationGuard)
  @Post()
  @ApiOperation({
    description: 'this is the endpoint for Creating  an order',
    })
  async create(@Body() createOrderDto: CreateOrderDto,@CurrentUser() currentUser:User):Promise<Order> {
    return await this.ordersService.create(createOrderDto,currentUser);
  }

  @Get()
  @ApiOperation({
    description: 'this is the endpoint for retrieving all  orders',
    })
  @ApiResponse({type:Order, isArray:true})
  async findAll():Promise<Order[]>  {
    return await this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    description: 'this is the endpoint for retrieving  one order',
    })
  @ApiParam({name:'id',type:'number',description:'id de la commande'})
  @ApiResponse({type:Order, isArray:false})
  async findOne(@Param('id',ParseIntPipe) id: string):Promise<Order> {
    return await this.ordersService.findOne(+id);
  }

  @AuthorizeRoles(UserRole.Admin)
  @UseGuards(AuthentificationGuard,AuthorizeGuard)
  @Put(':id')
  @ApiOperation({
    description: 'this is the endpoint for updating  status order',
    })
  @ApiParam({name:'id',type:'number',description:'id de la commande'})
  async update(@Param('id',ParseIntPipe) id: string, @Body() updateOrderStatusDto: UpdateOrderStatusDto, @CurrentUser() currentUser:User) {
    return await this.ordersService.update(+id, updateOrderStatusDto, currentUser);
  }

  @Patch('cart/:id')
  async updateCartItem(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto,@CurrentUser() currentUser:User) {
    return await this.ordersService.updateCartItem(+id, updateCartDto,currentUser);
  }

  @AuthorizeRoles(UserRole.Admin)
  @UseGuards(AuthentificationGuard,AuthorizeGuard)
  @Put('cancel/:id')
  @ApiOperation({
    description: 'this is the endpoint for cancelling an order',
    })
  @ApiParam({name:'id',type:'number',description:'id de la commande'})
  async cancelled(@Param('id',ParseIntPipe) id: string, @CurrentUser() currentUser:User){
    return await this.ordersService.cancelled(+id, currentUser);
  }
}
