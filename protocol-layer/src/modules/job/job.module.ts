import { Module } from '@nestjs/common';
import { JobService } from './job.serviceV1';
import { JobController } from './job.controllerV1';

@Module({
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
