import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto) {
    const { email, password } = user;
    const userExist = await this.repo.findOne({ where: { email } });

    if (userExist) return new BadRequestException('User Already Exist');
    const userCreated = await this.repo.create({ email, password });
    return this.repo.save(userCreated);
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  find(email: string) {
    return this.repo.find({ where: { email: email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User Not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return await this.repo.remove(user);
  }
}
