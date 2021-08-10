import { Module } from '@nestjs/common';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { manager } from './manager.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([manager])
  ],
  controllers: [ManagerController],
  providers: [ManagerService]
})
export class ManagerModule {}
