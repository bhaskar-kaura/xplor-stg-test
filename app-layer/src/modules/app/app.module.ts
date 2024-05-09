import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from '../../config/env/env.config';
import { CommonModule } from 'src/common/common.module';
import { JobSearchService } from './request/job/services/searchv1.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService, JobSearchService],
})
export class AppModule {}
