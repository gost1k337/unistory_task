import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddSubscriptionDto } from './dto/add-subscription.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({ status: 200, type: User })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async get(@Param('id') id: number) {
    return await this.userService.get(id);
  }

  @ApiOperation({ summary: 'Creating user' })
  @ApiResponse({ status: 201, type: User })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return await this.userService.createUser(dto);
  }

  @ApiOperation({ summary: 'Deleting user' })
  @ApiResponse({ status: 204, type: User })
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.userService.deleteUser(id);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: User, isArray: true })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAll() {
    return await this.userService.getAll();
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: User })
  @UseInterceptors(ClassSerializerInterceptor)
  @Put()
  async update(@Body() dto: UpdateUserDto) {
    return await this.userService.updateUser(dto);
  }

  @ApiOperation({ summary: 'Add subscription to user' })
  @ApiResponse({ status: 200, type: User })
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(204)
  @Post('/subscription')
  async subscription(@Body() dto: AddSubscriptionDto) {
    return await this.userService.addSubscription(dto);
  }
}
