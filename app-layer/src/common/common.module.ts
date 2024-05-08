import { Global, Module } from '@nestjs/common';
import { AxiosService } from './axios/axios.service';
import { HttpModule } from '@nestjs/axios';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GrafanaLoggerService } from 'src/services/grafana/service/grafana.service';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/env/env.config';
import { LoggingInterceptor } from 'src/util/logger-interceptor';
// Decorate the class with @Global() to make it a global module.
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    { module: HttpModule, global: true },
  ],
  providers: [
    AxiosService,
    GrafanaLoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  exports: [AxiosService, GrafanaLoggerService],
})
// Define the CommonModule class.
export class CommonModule {}
