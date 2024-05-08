import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from '../../config/env/env.config';
import { JobModule } from '../job/job.module';
import { ScholarshipModule } from '../scholarship/scholarship.module';
import { CourseModule } from '../course/course.module';
import { RetailModule } from '../retail/retail.module';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    CommonModule,
    CourseModule,
    JobModule,
    ScholarshipModule,
    RetailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
