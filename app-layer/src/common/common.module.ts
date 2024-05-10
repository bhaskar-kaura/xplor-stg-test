import { Global, Module } from '@nestjs/common';
import { AxiosService } from './axios/axios.service';
import { HttpModule } from '@nestjs/axios';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GrafanaLoggerService } from 'src/services/grafana/service/grafana.service';
import { LoggingInterceptor } from 'src/util/logger-interceptor';
import { GlobalActionService } from './action/global-action';
import { JobSearchService } from 'src/modules/app/request/job/services/searchv1.service';
import { CourseSearchService } from 'src/modules/app/request/course/services/searchv1.service';
import { ScholarshipSearchService } from 'src/modules/app/request/scholarship/services/searchv1.service';
// Decorate the class with @Global() to make it a global module.
@Global()
@Module({
  imports: [{ module: HttpModule, global: true }],
  providers: [
    AxiosService,
    GrafanaLoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    GlobalActionService,
    JobSearchService,
    CourseSearchService,
    ScholarshipSearchService,
  ],
  exports: [
    AxiosService,
    GrafanaLoggerService,
    GlobalActionService,
    JobSearchService,
    CourseSearchService,
    ScholarshipSearchService,
  ],
})
// Define the CommonModule class.
export class CommonModule {}
