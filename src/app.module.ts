import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SalesModule } from './sales/sales.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { SalesmanModule } from './salesman/salesman.module';
import { CarModule } from './car/car.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    SalesModule,
    PrismaModule,
    SalesmanModule,
    CarModule,
  ],
})
export class AppModule {}
