import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { AdminSeederService } from './admin-seeder.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [UserService, AdminSeederService],
  exports: [UserService]
})
export class UserModule {}