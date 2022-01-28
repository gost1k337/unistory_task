import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddSubscriptionDto } from './dto/add-subscription.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async get(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['books'],
    });

    if (user && !user.isDeleted) {
      return user;
    }

    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async createUser(dto: CreateUserDto): Promise<User | null> {
    const candidate = await this.findByEmail(dto.email);

    if (candidate) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const password = await bcrypt.hash(dto.password, 5);
    const user = await this.userRepository.create({ ...dto, password });

    return await this.userRepository.save(user);
  }

  async deleteUser(id: number) {
    const user = await this.findById(id);

    if (user) {
      user.isDeleted = true;
      await this.userRepository.save(user);
      return;
    }

    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.find({ isDeleted: false });
  }

  async updateUser(dto: UpdateUserDto): Promise<User | null> {
    const toUpdate = await this.findById(dto.id);
    delete dto.id;

    if (dto.email) {
      const user = await this.findByEmail(dto.email);

      if (user) {
        throw new HttpException(
          'User with this email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (toUpdate) {
      const updated = Object.assign(toUpdate, dto);
      return await this.userRepository.save(updated);
    }

    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async addSubscription(dto: AddSubscriptionDto): Promise<User> {
    const user = await this.findById(dto.userId);

    if (user) {
      user.hasSubscription = true;
      await this.userRepository.save(user);
      return;
    }

    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ email });
  }

  async findById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ id });
  }
}
