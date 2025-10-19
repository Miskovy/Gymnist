import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';

@Injectable()
export class AdminSeederService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AdminSeederService.name);

  constructor(
    private readonly usersService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    await this.seedAdminUser();
  }

  async seedAdminUser(): Promise<void> {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL');
    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD');
    const adminRoles = this.configService.get<string>('ADMIN_ROLES')?.split(',') || ['admin'];

    if (!adminEmail || !adminPassword) {
      this.logger.warn('Admin credentials not found in environment variables');
      return;
    }

    try {
      await this.usersService.createAdminUser(adminEmail, adminPassword, adminRoles);
    } catch (error) {
      this.logger.error(`Failed to seed admin user: ${error.message}`);
    }
  }
}