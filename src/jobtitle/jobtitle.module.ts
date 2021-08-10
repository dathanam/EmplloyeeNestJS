import { Module } from '@nestjs/common';
import { JobtitleController } from './jobtitle.controller';
import { JobtitleService } from './jobtitle.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jobtitle } from './jobtitle.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([jobtitle])
  ],
  controllers: [JobtitleController],
  providers: [JobtitleService]
})
export class JobtitleModule {}
