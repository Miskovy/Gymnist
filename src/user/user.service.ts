import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  findOneById(id): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

async createAdminUser(email: string, password: string, roles: string[] = ['admin']): Promise<User> {
  try {
    const existingAdmin = await this.usersRepository.findOne({ where: { email } });

    if (existingAdmin) {
      this.logger.log(`Admin user ${email} already exists`);
      return existingAdmin;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const adminUser = this.usersRepository.create({
      email,
      password: hashedPassword,
      roles,
      isActive: true
    });

    const savedUser = await this.usersRepository.save(adminUser);

    this.logger.log(`Admin user ${email} created successfully`);
    return savedUser;
  } catch (error) {
    this.logger.error(`Failed to create admin user: ${error.message}`);
    throw error;
  }
}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

}
