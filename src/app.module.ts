import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TrainerModule } from './trainer/trainer.module';
import { TraineeModule } from './trainee/trainee.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { PackageModule } from './package/package.module';
import { LocationModule } from './location/location.module';
import { MajorModule } from './major/major.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { PaymentModule } from './payment/payment.module';
import { BookingModule } from './booking/booking.module';
import { DiscountModule } from './discount/discount.module';
import { RoomModule } from './room/room.module';
import { RentModule } from './rent/rent.module';
import { CurrencyModule } from './currency/currency.module';
import { GallaryModule } from './gallary/gallary.module';
import { AttendanceModule } from './attendance/attendance.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: parseInt(config.get('DB_PORT'), 10),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    UserModule,
    AuthModule,
    TrainerModule,
    TraineeModule,
    PaymentMethodModule,
    PackageModule,
    LocationModule,
    MajorModule,
    SubscriptionModule,
    PaymentModule,
    BookingModule,
    DiscountModule,
    RoomModule,
    RentModule,
    CurrencyModule,
    GallaryModule,
    AttendanceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
